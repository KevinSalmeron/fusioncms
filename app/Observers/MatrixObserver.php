<?php

/*
 * This file is part of the FusionCMS application.
 *
 * (c) efelle creative <appdev@efelle.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Observers;

use App\Models\Matrix;
use App\Database\Migration;
use App\Database\Schema\Blueprint;

class MatrixObserver
{
    /**
     * @var \App\Database\Migration
     */
    protected $migration;

    /**
     * Create a new MatrixObserver instance.
     *
     * @param  \App\Database\Migration  $migration
     */
    public function __construct(Migration $migration)
    {
        $this->migration = $migration;
    }

    /**
     * Handle the matrix "created" event.
     *
     * @param  \App\Models\Matrix  $matrix
     * @return void
     */
    public function created(Matrix $matrix)
    {
        $this->migration->schema->create($matrix->table, function (Blueprint $table) use ($matrix) {
            if ($matrix->type === 'collection') {
                $table->increments('id');
            }

            $table->integer('matrix_id')->unsigned();
            $table->boolean('status')->default(true);
            $table->unsignedInteger('parent_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Handle the matrix "updating" event.
     *
     * @param  \App\Models\Matrix  $matrix
     * @return void
     */
    public function updating(Matrix $matrix)
    {
        // Fetch our "old" matrix instance
        $old = Matrix::find($matrix->id);

        // Rename the tables if changed
        if ($old->table !== $matrix->table) {
            $this->migration->schema->rename($old->table, $matrix->table);
        }

        // Create the ID column if converting from a page to a collection type
        if ($old->type === 'page' and $matrix->type === 'collection') {
            $this->migration->schema->table($matrix->table, function (Blueprint $table) {
                $table->increments('id')->first();
            });
        }

        // Drop the ID column if converting from a collection to a page type
        if ($old->type === 'collection' and $matrix->type === 'page') {
            $this->migration->schema->table($matrix->table, function (Blueprint $table) {
                $table->dropColumn('id');
            });
        }
    }

    /**
     * Handle the matrix "deleted" event.
     *
     * @param  \App\Models\Matrix  $matrix
     * @return void
     */
    public function deleted(Matrix $matrix)
    {
        $this->dropTable($matrix);
    }

    /**
     * Drop the matrix database table.
     *
     * @param  \App\Models\Matrix  $matrix
     * @return void
     */
    protected function dropTable($matrix)
    {
        $this->migration->schema->dropIfExists($matrix->table);
    }
}