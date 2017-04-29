import * as angular from 'angular';
import { TimeFilter } from './timeFilter';

export class Filters {
  static moduleName = 'Filters';
}

angular.module(Filters.moduleName, [TimeFilter.moduleName]);
