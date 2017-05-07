import * as angular from 'angular';
import { HeaderCellController } from './headerCell.controller';

export class HeaderCell {
  static moduleName = 'HeaderCell';
  static directiveName = 'headerCell';
  static directiveOptions: ng.IDirectiveFactory = () => {
    return {
      bindToController: {
        gridOptions: '=',
        hcFieldName: '=',
        hcCenter: '=',
        hcSortable: '=',
        hcTitle: '@'
      },
      controller: HeaderCellController,
      controllerAs: '$ctrl',
      transclude: true,
      scope: {},
      template: `
        <div ng-class="{ 'text-center': $ctrl.hcCenter }"
          class="text-nowrap header-cell"
          ng-click="$ctrl.sort()"
          title="{{ $ctrl.hcTitle }}">
          <span class="sort-icon" ng-if="$ctrl.sortAsc">&darr;</span>
          <span class="sort-icon" ng-if="$ctrl.sortDesc">&uarr;</span>
          <ng-transclude></ng-transclude>
        </div>
      `
    } as ng.IDirective;
  }
}

angular.module(HeaderCell.moduleName, [])
  .directive(HeaderCell.directiveName, HeaderCell.directiveOptions);
