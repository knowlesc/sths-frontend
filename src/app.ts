import * as angular from 'angular';
import * as jQuery from 'jquery';

// tslint:disable-next-line:no-any
(global as any).jQuery = jQuery;

import 'angular-aria';
import 'angular-animate';
import 'angular-route';
import 'angular-sanitize';
import 'bootstrap';

import { AppMainController } from './views/appMain/appMain.controller';
import { SkaterStatsController } from './views/skaterStats/skaterStats.controller';
import { GoalieStatsController } from './views/goalieStats/goalieStats.controller';
import { GoalieRatingsController } from './views/goalieRatings/goalieRatings.controller';
import { SkaterRatingsController } from './views/skaterRatings/skaterRatings.controller';
import { CoachRatingsController } from './views/coachRatings/coachRatings.controller';
import { SkaterInfoController } from './views/skaterInfo/skaterInfo.controller';
import { GoalieInfoController } from './views/goalieInfo/goalieInfo.controller';
import { TeamStatsController } from './views/teamStats/teamStats.controller';
import { TeamListController } from './views/teamList/teamList.controller';
import { TeamInfoController } from './views/teamInfo/teamInfo.controller';
import { ScheduleController } from './views/schedule/schedule.controller';
import { WaiversController } from './views/waivers/waivers.controller';
import { BoxscoreController } from './views/boxscore/boxscore.controller';
import { StandingsController } from './views/standings/standings.controller';
import { InjuriesController } from './views/injuries/injuries.controller';
import { SuspensionsController } from './views/suspensions/suspensions.controller';
import { TradesController } from './views/trades/trades.controller';
import { SearchController } from './views/search/search.controller';
import { StatLeadersController } from './views/statLeaders/statLeaders.controller';
import { PlayerService } from './services/playerService';
import { TeamService } from './services/teamService';
import { ScheduleService } from './services/scheduleService';
import { LeagueService } from './services/leagueService';
import { GridServices } from './grids/gridServices';
import { Services } from './services/services';
import { Filters } from './filters/filters';
import { Components } from './components/components';
import { Config } from './models/config';

declare const config: Config;

const app = angular.module('sths.frontend', [
  'ngRoute',
  'ngSanitize',
  GridServices.moduleName,
  Services.moduleName,
  Filters.moduleName,
  Components.moduleName
]);

app.constant('config', config);

app.config(['$provide', ($provide: ng.auto.IProvideService) => {
  return $provide.decorator('$http', ['$delegate', ($delegate: ng.IHttpService) => {
    const get = $delegate.get;
    $delegate.get = (url: string, conf?: ng.IRequestShortcutConfig) => {
      if (url.indexOf('templates/') >= 0) {
        url += (url.indexOf('?') === -1 ? '?' : '&');
        url += 'version=' + (config.cacheBustVersion || '1.0');
      }

      return get(url, conf);
    };

    return $delegate;
  }]);
}]);

app.config(['$routeProvider', ($routeProvider: ng.route.IRouteProvider) => {
  $routeProvider.when('/', {
    templateUrl: 'templates/appMain.template.html',
    controller: AppMainController,
    controllerAs: '$ctrl'
  })
  .when('/stats', {
    templateUrl: 'templates/statLeaders.template.html',
    controller: StatLeadersController,
    controllerAs: '$ctrl'
  })
  .when('/skaterStats', {
    templateUrl: 'templates/skaterStats.template.html',
    controller: SkaterStatsController,
    controllerAs: '$ctrl',
    reloadOnSearch: false
  })
  .when('/goalieStats', {
    templateUrl: 'templates/goalieStats.template.html',
    controller: GoalieStatsController,
    controllerAs: '$ctrl',
    reloadOnSearch: false
  })
  .when('/standings', {
    templateUrl: 'templates/standings.template.html',
    controller: StandingsController,
    controllerAs: '$ctrl'
  })
  .when('/teams/pro/:id', {
    resolve: {
      league: () => 'pro'
    },
    templateUrl: 'templates/teamInfo.template.html',
    controller: TeamInfoController,
    controllerAs: '$ctrl',
    reloadOnSearch: false
  })
  .when('/teams/farm/:id', {
    resolve: {
      league: () => 'farm'
    },
    templateUrl: 'templates/teamInfo.template.html',
    controller: TeamInfoController,
    controllerAs: '$ctrl',
    reloadOnSearch: false
  })
  .when('/teamStats', {
    templateUrl: 'templates/teamStats.template.html',
    controller: TeamStatsController,
    controllerAs: '$ctrl'
  })
  .when('/teams', {
    templateUrl: 'templates/teamList.template.html',
    controller: TeamListController,
    controllerAs: '$ctrl'
  })
  .when('/schedule', {
    templateUrl: 'templates/schedule.template.html',
    controller: ScheduleController,
    controllerAs: '$ctrl',
    reloadOnSearch: false
  })
  .when('/search', {
    templateUrl: 'templates/search.template.html',
    controller: SearchController,
    controllerAs: '$ctrl'
  })
  .when('/skaters', {
    templateUrl: 'templates/skaterRatings.template.html',
    controller: SkaterRatingsController,
    controllerAs: '$ctrl',
    reloadOnSearch: false
  })
  .when('/skaters/:id', {
    resolve: {
      skaterInfo: ['$route', 'playerService', ($route: ng.route.IRouteService, playerService: PlayerService) =>
        playerService.getSingleSkaterInfo({ id: $route.current.params.id })]
    },
    templateUrl: 'templates/skaterInfo.template.html',
    controller: SkaterInfoController,
    controllerAs: '$ctrl',
    reloadOnSearch: false
  })
  .when('/goalies', {
    templateUrl: 'templates/goalieRatings.template.html',
    controller: GoalieRatingsController,
    controllerAs: '$ctrl',
    reloadOnSearch: false
  })
  .when('/goalies/:id', {
    resolve: {
      goalieInfo: ['$route', 'playerService', ($route: ng.route.IRouteService, playerService: PlayerService) =>
        playerService.getSingleGoalieInfo({ id: $route.current.params.id })]
    },
    templateUrl: 'templates/goalieInfo.template.html',
    controller: GoalieInfoController,
    controllerAs: '$ctrl',
    reloadOnSearch: false
  })
  .when('/coaches', {
    templateUrl: 'templates/coachRatings.template.html',
    controller: CoachRatingsController,
    controllerAs: '$ctrl'
  })
  .when('/waivers', {
    templateUrl: 'templates/waivers.template.html',
    controller: WaiversController,
    controllerAs: '$ctrl'
  })
  .when('/trades', {
    templateUrl: 'templates/trades.template.html',
    controller: TradesController,
    controllerAs: '$ctrl'
  })
  .when('/injuries', {
    templateUrl: 'templates/injuries.template.html',
    controller: InjuriesController,
    controllerAs: '$ctrl'
  })
  .when('/suspensions', {
    templateUrl: 'templates/suspensions.template.html',
    controller: SuspensionsController,
    controllerAs: '$ctrl'
  })
  .when('/boxscore/:id', {
    templateUrl: 'templates/boxscore.template.html',
    controller: BoxscoreController,
    controllerAs: '$ctrl'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);
