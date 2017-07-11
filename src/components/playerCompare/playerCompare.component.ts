import * as angular from 'angular';
import { SkaterCompareController } from './skaterCompare.controller';
import { GoalieCompareController } from './goalieCompare.controller';

export class PlayerCompare {
  static moduleName = 'PlayerCompare';
}

class SkaterCompare {
  static componentName = 'skaterCompare';
  static componentOptions: ng.IComponentOptions = {
    bindings: {
      player: '<'
    },
    controller: SkaterCompareController,
    templateUrl: 'templates/playerCompare.template.html'
  };
}

class GoalieCompare {
  static componentName = 'goalieCompare';
  static componentOptions: ng.IComponentOptions = {
    bindings: {
      player: '<'
    },
    controller: GoalieCompareController,
    templateUrl: 'templates/playerCompare.template.html'
  };
}

angular.module(PlayerCompare.moduleName, [])
  .component(SkaterCompare.componentName, SkaterCompare.componentOptions)
  .component(GoalieCompare.componentName, GoalieCompare.componentOptions);
