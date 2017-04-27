import * as angular from 'angular';
import { PlayersService } from './playersService';

export class Services {
  static moduleName = 'Services';
}

angular.module(Services.moduleName, [PlayersService.moduleName]);
