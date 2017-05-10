import * as angular from 'angular';

export class TimeFilter {
  static moduleName = 'TimeFilter';
  static filterName = 'time';

  static filter = () => {
    return (input: number): string => {
      if (input === null || isNaN(input)) {
        return '';
      }

      const hours = Math.floor(input / 3600);
      const minutes = Math.floor((input % 3600) / 60);
      const seconds = Math.floor(input % 60);

      let hh = hours.toString();
      if (hours === 0) {
        hh = '';
      }

      let mm = minutes.toString();
      if (hours !== 0) {
        mm = minutes < 10 ? '0' + mm : mm;
      }

      const ss = seconds < 10 ? '0' + seconds : seconds;

      let output = mm + ':' + ss;
      if (hours > 0) {
        output = hh + ':' + output;
      }

      return output;
    };
  }
}

angular.module(TimeFilter.moduleName, [])
  .filter(TimeFilter.filterName, TimeFilter.filter);
