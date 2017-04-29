import * as angular from 'angular';
import { HeaderCellController } from './headerCell.controller';

export class HeaderCell {
  static moduleName = 'HeaderCell';
  static directiveName = 'headerCell';
  static directiveOptions: ng.IDirectiveFactory = () => {
    return {
      bindToController: {
        sortFieldIndex: '=',
        gridOptions: '=',
        hcCenter: '='
      },
      controller: HeaderCellController,
      controllerAs: '$ctrl',
      transclude: true,
      scope: {},
      template: `
        <div ng-class="{ 'text-centered': $ctrl.hcCenter }" class="text-nowrap header-cell" ng-click="$ctrl.sort()">
          <span class="glyphicon glyphicon-triangle-top" ng-if="$ctrl.sortAsc"></span>
          <span class="glyphicon glyphicon-triangle-bottom" ng-if="$ctrl.sortDesc"></span>
          <ng-transclude></ng-transclude>
        </div>
      `
    } as ng.IDirective;
  }
}

angular.module(HeaderCell.moduleName, [])
  .directive(HeaderCell.directiveName, HeaderCell.directiveOptions);
