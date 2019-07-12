<?php

/*
 * This file is part of the FusionCMS application.
 *
 * (c) efelle creative <appdev@efelle.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Http\Controllers\API\Insights;

use Analytics;
use Spatie\Analytics\Period;
use App\Http\Controllers\Controller;
use App\Http\Resources\InsightResource;

class OverviewController extends Controller
{
    public function __invoke()
    {
        $daily = Analytics::fetchTotalVisitorsAndPageViews(Period::days(30));
        $stats = Analytics::performQuery(Period::days(30), 'ga:users,ga:pageviews,ga:avgSessionDuration,ga:bounceRate');

        $overview = collect($stats['rows'] ?? [])->map(function (array $row) use ($daily) {
            return [
                'totalVisitors'          => $row[0],
                'totalPageViews'         => $row[1],
                'averageSessionDuration' => $row[2],
                'bounceRate'             => $row[3],
                'daily'                  => $daily,
            ];
        })->first();

        return new InsightResource($overview);
    }
}