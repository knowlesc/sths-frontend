import * as angular from 'angular';
import { PlayerService } from './playerService';
import { TeamService } from './teamService';

export class Services {
  static moduleName = 'Services';
}

angular.module(Services.moduleName, [])
  .service(PlayerService.serviceName, PlayerService)
  .service(TeamService.serviceName, TeamService);
