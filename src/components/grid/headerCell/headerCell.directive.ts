import * as angular from 'angular';
import { HeaderCellController } from './headerCell.controller';

export class HeaderCell {
  static moduleName = 'HeaderCell';
  static directiveName = 'headerCell';
  static directiveOptions: ng.IDirectiveFactory = () => {
    return {
      bindToController: {
        gridOptions: '=',
        column: '='
      },
      controller: HeaderCellController,
      controllerAs: '$ctrl',
      scope: {},
      template: `
        <div ng-class="{ 'text-center': $ctrl.column.centered }"
          class="text-nowrap header-cell"
          ng-click="$ctrl.sort()"
          title="{{ $ctrl.column.title }}">
          <span class="sort-icon" ng-if="$ctrl.sortAsc">&darr;</span>
          <span class="sort-icon" ng-if="$ctrl.sortDesc">&uarr;</span>
          <span ng-bind="$ctrl.column.headerTitle || $ctrl.column.fieldName"></span>
        </div>
      `
    } as ng.IDirective;
  }
}

angular.module(HeaderCell.moduleName, [])
  .directive(HeaderCell.directiveName, HeaderCell.directiveOptions);
