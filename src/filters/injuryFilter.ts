import * as angular from 'angular';

export class InjuryFitler {
  static moduleName = 'InjuryFitler';
  static filterName = 'injury';

  static filter = () => {
    return (input: string) => {
      if (input === null) {
        return '';
      }

      let output = input;
      if (input.endsWith('Injury')) {
        output = input.substring(0, input.lastIndexOf('Injury'));
      }

      return output;
    };
  }
}

angular.module(InjuryFitler.moduleName, [])
  .filter(InjuryFitler.filterName, InjuryFitler.filter);
