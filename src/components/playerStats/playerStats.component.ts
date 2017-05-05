import * as angular from 'angular';
import { PlayerStatsController } from './playerStats.controller';
import { Grid } from '../grid/grid.component';
import { LeagueSelector } from '../leagueSelector/leagueSelector.component';
import { PlayerStatsService } from './playerStats.service';

export class PlayerStats {
  static moduleName = 'PlayerStats';
  static componentName = 'playerStats';
  static componentOptions: ng.IComponentOptions = {
    controller: PlayerStatsController,
    templateUrl: '/templates/playerStats.template.html'
  };
}

angular.module(PlayerStats.moduleName, [
  Grid.moduleName,
  LeagueSelector.moduleName
])
  .component(PlayerStats.componentName, PlayerStats.componentOptions)
  .service(PlayerStatsService.serviceName, PlayerStatsService);
