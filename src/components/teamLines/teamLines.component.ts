import * as angular from 'angular';
import { TeamLinesController } from './teamLines.controller';

export class TeamLines {
  static moduleName = 'TeamLines';
  static componentName = 'teamLines';
  static componentOptions: ng.IComponentOptions = {
    bindings: {
      team: '<'
    },
    controller: TeamLinesController,
    templateUrl: 'templates/teamLines.template.html'
  };
}

angular.module(TeamLines.moduleName, [])
  .component(TeamLines.componentName, TeamLines.componentOptions);
