import * as angular from 'angular';
import * as jQuery from 'jquery';

// tslint:disable-next-line:no-any
(global as any).jQuery = jQuery;

import 'angular-aria';
import 'angular-animate';
import 'angular-route';
import 'bootstrap';

import { AppMainController } from './views/appMain/appMain.controller';
import { SkaterStatsController } from './views/skaterStats/skaterStats.controller';
import { GoalieStatsController } from './views/goalieStats/goalieStats.controller';
import { GoalieRatingsController } from './views/goalieRatings/goalieRatings.controller';
import { SkaterRatingsController } from './views/skaterRatings/skaterRatings.controller';
import { SkaterInfoController } from './views/skaterInfo/skaterInfo.controller';
import { GoalieInfoController } from './views/goalieInfo/goalieInfo.controller';
import { TeamStatsController } from './views/teamStats/teamStats.controller';
import { TeamListController } from './views/teamList/teamList.controller';
import { TeamInfoController } from './views/teamInfo/teamInfo.controller';
import { ScheduleController } from './views/schedule/schedule.controller';
import { BoxscoreController } from './views/boxscore/boxscore.controller';
import { StandingsController } from './views/standings/standings.controller';
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
  GridServices.moduleName,
  Services.moduleName,
  Filters.moduleName,
  Components.moduleName
]);

app.constant('config', config);

app.config(['$routeProvider', ($routeProvider: ng.route.IRouteProvider) => {
  $routeProvider.when('/', {
    templateUrl: 'templates/appMain.template.html',
    controller: AppMainController,
    controllerAs: '$ctrl'
  })
  .when('/skaterStats', {
    templateUrl: 'templates/skaterStats.template.html',
    controller: SkaterStatsController,
    controllerAs: '$ctrl'
  })
  .when('/goalieStats', {
    templateUrl: 'templates/goalieStats.template.html',
    controller: GoalieStatsController,
    controllerAs: '$ctrl'
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
    controllerAs: '$ctrl'
  })
  .when('/teams/farm/:id', {
    resolve: {
      league: () => 'farm'
    },
    templateUrl: 'templates/teamInfo.template.html',
    controller: TeamInfoController,
    controllerAs: '$ctrl'
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
    controllerAs: '$ctrl'
  })
  .when('/skaters', {
    templateUrl: 'templates/skaterRatings.template.html',
    controller: SkaterRatingsController,
    controllerAs: '$ctrl'
  })
  .when('/skaters/:id', {
    resolve: {
      skaterInfo: ['$route', 'playerService', ($route: ng.route.IRouteService, playerService: PlayerService) =>
        playerService.getSingleSkaterInfo({ id: $route.current.params.id })]
    },
    templateUrl: 'templates/skaterInfo.template.html',
    controller: SkaterInfoController,
    controllerAs: '$ctrl'
  })
  .when('/goalies', {
    templateUrl: 'templates/goalieRatings.template.html',
    controller: GoalieRatingsController,
    controllerAs: '$ctrl'
  })
  .when('/goalies/:id', {
    resolve: {
      goalieInfo: ['$route', 'playerService', ($route: ng.route.IRouteService, playerService: PlayerService) =>
        playerService.getSingleGoalieInfo({ id: $route.current.params.id })]
    },
    templateUrl: 'templates/goalieInfo.template.html',
    controller: GoalieInfoController,
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
