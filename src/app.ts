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
import { TeamListController } from './views/teamList/teamList.controller';
import { TeamInfoController } from './views/teamInfo/teamInfo.controller';
import { ScheduleController } from './views/schedule/schedule.controller';
import { TeamService } from './services/teamService';
import { ScheduleService } from './services/scheduleService';
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

app.config(($routeProvider: ng.route.IRouteProvider) => {
  $routeProvider.when('/', {
    resolve: {
      upcomingGames: (scheduleService: ScheduleService) =>
        scheduleService.getSchedule({ nextSimOnly: 'true' })
    },
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
  .when('/teams/pro/:id', {
    resolve: {
      league: () => 'pro',
      teamInfo: ($route: ng.route.IRouteService, teamService: TeamService) =>
        teamService.getTeamInfo({ league: 'pro', id: $route.current.params.id })
    },
    templateUrl: 'templates/teamInfo.template.html',
    controller: TeamInfoController,
    controllerAs: '$ctrl'
  })
  .when('/teams/farm/:id', {
    resolve: {
      league: () => 'farm',
      teamInfo: ($route: ng.route.IRouteService, teamService: TeamService) =>
        teamService.getTeamInfo({ league: 'farm', id: $route.current.params.id })
    },
    templateUrl: 'templates/teamInfo.template.html',
    controller: TeamInfoController,
    controllerAs: '$ctrl'
  })
  .when('/teams', {
    resolve: {
      proTeamList: (teamService: TeamService) => teamService.getTeamList({ league: 'pro' }),
      farmTeamList: (teamService: TeamService) => teamService.getTeamList({ league: 'farm' })
    },
    templateUrl: 'templates/teamList.template.html',
    controller: TeamListController,
    controllerAs: '$ctrl'
  })
  .when('/schedule', {
    templateUrl: 'templates/schedule.template.html',
    controller: ScheduleController,
    controllerAs: '$ctrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});
