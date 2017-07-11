import * as angular from 'angular';
import { TimeFilter } from './timeFilter';
import { HeightFilter } from './heightfilter';
import { ToDateFilter } from './toDateFilter';

export class Filters {
  static moduleName = 'Filters';
}

angular.module(Filters.moduleName, [
  TimeFilter.moduleName,
  HeightFilter.moduleName,
  ToDateFilter.moduleName
]);
