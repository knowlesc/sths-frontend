import * as angular from 'angular';
import { PlayerStatsController } from './playerStats.controller';
import { HeaderCell } from '../grid/headerCell/headerCell.directive';

export class PlayerStats {
  static moduleName = 'PlayerStats';
  static componentName = 'playerStats';
  static componentOptions: ng.IComponentOptions = {
    controller: PlayerStatsController,
    templateUrl: '/templates/playerStats.template.html'
  };
}

angular.module(PlayerStats.moduleName, [HeaderCell.moduleName])
  .component(PlayerStats.componentName, PlayerStats.componentOptions);
