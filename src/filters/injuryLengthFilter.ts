import * as angular from 'angular';

export class InjuryLengthFilter {
  static moduleName = 'InjuryLengthFilter';
  static filterName = 'injuryLength';

  static filter = () => {
    return (input: number) => {
      if (input === null || isNaN(input) || input < 0) {
        return '';
      }

      if (input < 7) {
        return input === 1 ? `1 day` : `${input} days`;
      }
      if (input < 13) {
        return '1 week';
      }
      if (input < 19) {
        return '2 weeks';
      }
      if (input < 25) {
        return '3 weeks';
      }
      if (input < 46) {
        return '1 month';
      }

      return '2 months';
    };
  }
}

angular.module(InjuryLengthFilter.moduleName, [])
  .filter(InjuryLengthFilter.filterName, InjuryLengthFilter.filter);
