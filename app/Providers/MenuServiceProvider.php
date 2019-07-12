<?php

/*
 * This file is part of the FusionCMS application.
 *
 * (c) efelle creative <appdev@efelle.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Providers;

use Menu;
use App\Models\Matrix;
use Illuminate\Support\ServiceProvider;

class MenuServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        if (app_installed() && config('app.env') !== 'testing') {
            $this->createAdminNavigation();
        }
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Register the base admin navigation.
     *
     * @return void
     */
    protected function createAdminNavigation()
    {
        $matrices = Matrix::where('sidebar', true)->orderBy('name')->get();

        Menu::make('admin', function ($menu) use ($matrices) {
            $menu->add('Dashboard')->data([
                'to'    => '/',
                'icon'  => 'grip-horizontal',
            ]);

            if ($matrices->count()) {
                $menu->add('Content')->divide();

                foreach ($matrices as $matrix) {
                    $menu->add($matrix->name)->data([
                        'to'   => $matrix->adminPath,
                        'icon' => $matrix->icon ?: 'pencil',
                    ]);
                }
            }

            $menu->add('Organize')->divide();

            $menu->add('Categories')->data([
                'icon' => 'sitemap',
                'to'   => '/category-groups',
            ]);

            $menu->add('Tools')->divide();

            $menu->add('File Manager')->data([
                'to'   => '/files',
                'icon' => 'images',
            ]);

            $menu->add('Forms', '#')->data([
                'icon' => 'paper-plane',
            ]);

            $menu->forms->add('Inbox')->data([
                'to' => '/',
            ]);

            $menu->forms->add('Manage')->data([
                'to' => '/',
            ]);

            $menu->add('SEO', '#')->data([
                'icon'  => 'chart-bar',
            ]);

            $menu->seo->add('Experiments')->data([
                'to'    => '/insight',
            ]);

            $menu->seo->add('Insight')->data([
                'to'    => '/insight',
            ]);

            $menu->add('System')->divide();

            $menu->add('Users', '#')->data([
                'icon'  => 'users',
            ]);

            $menu->users->add('Manage Users')->data([
                'to' => '/users',
            ]);

            $menu->users->add('Roles')->data([
                'to' => '/roles',
            ]);

            $menu->users->add('Permissions')->data([
                'to' => '/permissions',
            ]);

            $menu->add('Matrix')->data([
                'to'   => '/matrices',
                'icon' => 'chart-network',
            ]);

            $menu->add('Fieldsets')->data([
                'to'   => '/fieldsets',
                'icon' => 'ballot',
            ]);

            $menu->add('Themes')->data([
                'to'   => '/themes',
                'icon' => 'paint-roller',
            ]);

            $menu->add('Settings')->data([
                'to'   => '/settings',
                'icon' => 'cog',
            ]);
        });
    }
}