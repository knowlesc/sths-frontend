import * as angular from 'angular';
import * as jQuery from 'jquery';

// tslint:disable-next-line:no-any
(global as any).jQuery = jQuery;

import 'angular-aria';
import 'angular-animate';
import 'angular-route';
import 'bootstrap';

import { PlayerStatsController } from './views/playerStats/playerStats.controller';
import { GoalieStatsController } from './views/goalieStats/goalieStats.controller';
import { TeamListController } from './views/teamList/teamList.controller';
import { TeamInfoController } from './views/teamInfo/teamInfo.controller';
import { TeamService } from './services/teamService';
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
    templateUrl: 'templates/appMain.template.html'
  })
  .when('/playerStats', {
    templateUrl: 'templates/playerStats.template.html',
    controller: PlayerStatsController,
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
  .otherwise({
    redirectTo: '/'
  });
});
