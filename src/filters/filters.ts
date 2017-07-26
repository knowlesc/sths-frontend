import * as angular from 'angular';
import { TimeFilter } from './timeFilter';
import { HeightFilter } from './heightfilter';
import { ToDateFilter } from './toDateFilter';
import { InjuryFitler } from './injuryFilter';
import { InjuryLengthFilter } from './injuryLengthFilter';
import { HighlightFilter } from './highlightFilter';

export class Filters {
  static moduleName = 'Filters';
}

angular.module(Filters.moduleName, [
  TimeFilter.moduleName,
  HeightFilter.moduleName,
  InjuryFitler.moduleName,
  InjuryLengthFilter.moduleName,
  ToDateFilter.moduleName,
  HighlightFilter.moduleName
]);
