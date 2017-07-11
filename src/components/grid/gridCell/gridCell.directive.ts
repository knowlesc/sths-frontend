import * as angular from 'angular';
import { ColumnDef } from '../models/columnDef';

export class GridCell {
  static moduleName = 'GridCell';
  static directiveName = 'gridCell';
  static directiveOptions: ng.IDirectiveFactory = ($compile: ng.ICompileService) => {
    return {
      scope: {
        row: '<gridCell',
        columnDef: '<',
        fieldName: '<'
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
            if (columnDef.wrap) {
              iElement.removeClass('text-nowrap');
              iElement.addClass('force-wrap');
            } else {
              iElement.addClass('text-nowrap');
            }
            if (columnDef.width) {
              iElement.css('width', columnDef.width);
              iElement.css('min-width', columnDef.width);
              iElement.css('max-width', columnDef.width);
            }
            if (columnDef.maxWidth) {
              iElement.css('max-width', columnDef.maxWidth);
            }

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
  .directive(GridCell.directiveName, ['$compile', GridCell.directiveOptions]);
