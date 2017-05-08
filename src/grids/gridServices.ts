import * as angular from 'angular';
import { RosterGridService } from './rosterGrid/rosterGrid.service';
import { PlayerStatsGridService } from './playerStatsGrid/playerStatsGrid.service';

export class GridServices {
  static moduleName = 'GridServices';
}

angular.module(GridServices.moduleName, [])
  .service(RosterGridService.serviceName, RosterGridService)
  .service(PlayerStatsGridService.serviceName, PlayerStatsGridService);
