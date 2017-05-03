import * as angular from 'angular';
import { ColumnDef } from '../columnDef';

export class GridCell {
  static moduleName = 'GridCell';
  static directiveName = 'gridCell';
  static directiveOptions: ng.IDirectiveFactory = ($compile: ng.ICompileService) => {
    return {
      scope: {
        columnDef: '=',
        row: '=gridCell',
        fieldName: '='
      },
      compile: (element, attributes) => {
        return {
          pre: (scope, iElement, iAttrs, controller) => {
            const columnDef = scope.columnDef as ColumnDef;
            if (columnDef.centered) {
              iElement.addClass('text-center');
            } else {
              iElement.removeClass('text-center');
            }
            iElement.addClass('text-nowrap');

            const template = columnDef.template || '<span ng-bind="row[fieldName]"></span>';
            const compiledTemplate = $compile(`${template}`)(scope);

            iElement.append(compiledTemplate);
          }
        };
      }
    } as ng.IDirective;
  }
}

angular.module(GridCell.moduleName, [])
  .directive(GridCell.directiveName, GridCell.directiveOptions);
