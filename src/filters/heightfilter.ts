import * as angular from 'angular';

export class HeightFilter {
  static moduleName = 'HeightFilter';
  static filterName = 'height';

  static filter = () => {
    return (input: number): string => {
      if (input === null || isNaN(input)) {
        return '';
      }

      const feet = Math.floor(input / 12);
      const inches = input - (feet * 12);
      const output = `${feet}' ${inches}"`;

      return output;
    };
  }
}

angular.module(HeightFilter.moduleName, [])
  .filter(HeightFilter.filterName, HeightFilter.filter);
