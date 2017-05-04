import * as angular from 'angular';
import { GridController } from './grid.controller';
import { HeaderCell } from './headerCell/headerCell.directive';
import { GridCell } from './gridCell/gridCell.directive';

export class Grid {
  static moduleName = 'Grid';
  static componentName = 'grid';
  static componentOptions: ng.IComponentOptions = {
    bindings: {
      gridOptions: '='
    },
    controller: GridController,
    templateUrl: '/templates/grid.template.html'
  };
}

angular.module(Grid.moduleName, [HeaderCell.moduleName, GridCell.moduleName])
  .component(Grid.componentName, Grid.componentOptions);
