<?php

/*
 * This file is part of the FusionCMS application.
 *
 * (c) efelle creative <appdev@efelle.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Support\Str;
use App\Services\Parsers\ParsedownExtra;

function render_markdown($content)
{
    $parsedown = new ParsedownExtra();

    return $parsedown->text($content);
}

function str_handle($string)
{
    return Str::slug($string, '_');
}
