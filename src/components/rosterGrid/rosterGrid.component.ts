import * as angular from 'angular';
import { RosterGridController } from './rosterGrid.controller';
import { RosterGridService } from './rosterGrid.service';

export class RosterGrid {
  static moduleName = 'RosterGrid';
  static componentName = 'rosterGrid';
  static componentOptions: ng.IComponentOptions = {
    bindings: {
      team: '<'
    },
    controller: RosterGridController,
    template: `
      <grid grid-options="$ctrl.gridOptions"></grid>
    `
  };
}

angular.module(RosterGrid.moduleName, [])
  .component(RosterGrid.componentName, RosterGrid.componentOptions)
  .service(RosterGridService.serviceName, RosterGridService);
