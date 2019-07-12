<?php

/*
 * This file is part of the FusionCMS application.
 *
 * (c) efelle creative <appdev@efelle.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

// Route::get('/pages/slug/{slug}', function($slug) {
//     dd($slug);
// });

Route::apiResource('/matrices/{matrix}/fields', 'MatrixFieldController');
Route::apiResource('/matrices', 'MatrixController');
Route::get('/matrices/slug/{slug}', 'MatrixController@slug');

Route::apiResource('/pages', 'MatrixPageController');
Route::get('/pages/handle/{handle}', 'MatrixPageController@handle');

Route::apiResource('/collections', 'CollectionController');