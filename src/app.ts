import * as angular from 'angular';
import * as jQuery from 'jquery';

// tslint:disable-next-line:no-any
(global as any).jQuery = jQuery;

import 'angular-aria';
import 'angular-material';
import 'angular-animate';
import 'angular-route';
import 'bootstrap';

import { AppMain } from './components/appMain/appMain.component';
import { AppHeader } from './components/appHeader/appHeader.component';
import { PlayerStats } from './components/PlayerStats/playerStats.component';

const app = angular.module('sths.frontend', [
  'ngMaterial',
  'ngRoute',
  AppMain.moduleName,
  AppHeader.moduleName,
  PlayerStats.moduleName
]);

app.config(($routeProvider: ng.route.IRouteProvider) => {
  $routeProvider.when('/', {
    template: '<app-main></app-main>'
  })
  .when('/playerStats', {
    template: '<player-stats></player-stats>'
  })
  .otherwise({
    redirectTo: '/'
  });
});
