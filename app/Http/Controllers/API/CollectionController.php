<?php

/*
 * This file is part of the FusionCMS application.
 *
 * (c) efelle creative <appdev@efelle.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Http\Controllers\API;

use App\Models\Matrix;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Builders\Collection;
use App\Http\Resources\CollectionResource;

class CollectionController extends Controller
{
    /**
     * Validation rules used for create and update
     * actions.
     *
     * @var array
     */
    protected $rules = [
        //
    ];

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Matrix  $matrix
     * @return \Illuminate\Http\Response
     */
    public function show($matrix, $id)
    {
        $matrix = Matrix::findOrFail($matrix);
        $model  = (new Collection($matrix->handle))->make();
        $entry  = $model->find($id);

        return new CollectionResource([
            'matrix' => $matrix,
            'entry'  => $entry,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $matrix
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $matrix)
    {
        $matrix     = Matrix::findOrFail($matrix);
        $collection = new Collection($matrix->handle);
        $rules      = ['status' => 'required|boolean'];
        $fields     = $matrix->fieldset->fields->reject(function ($field) {
            $fieldtype = fieldtypes()->get($field->type);

            return is_null($fieldtype->column);
        });

        foreach ($fields as $field) {
            $rules[$field->handle] = 'sometimes';
        }

        $attributes = $request->validate($rules);

        foreach ($attributes as $handle => $value) {
            $collection->{$handle} = $value;
        }

        $collection->update($attributes);

        return new CollectionResource([
            'matrix'     => $matrix,
            'collection' => $collection->get(),
        ]);
    }
}