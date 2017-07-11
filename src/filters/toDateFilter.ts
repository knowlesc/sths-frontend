import * as angular from 'angular';

export class ToDateFilter {
  static moduleName = 'ToDateFilter';
  static filterName = 'toDate';

  static filter = () => {
    return (input: string): Date => {
      return new Date(input);
    };
  }
}

angular.module(ToDateFilter.moduleName, [])
  .filter(ToDateFilter.filterName, ToDateFilter.filter);
