import * as angular from 'angular';

export class HighlightFilter {
  static moduleName = 'HighlightFilter';
  static filterName = 'highlight';

  static filter = ($sce: ng.ISCEService) => {
    return (input: string, highlight: string): string => {
      if (highlight)  {
        const regex = new RegExp(`(${highlight})`, 'gi');
        input = input.replace(regex, '<span class="highlight">$1</span>');
      }

      return $sce.trustAsHtml(input);
    };
  }
}

angular.module(HighlightFilter.moduleName, [])
  .filter(HighlightFilter.filterName, ['$sce', HighlightFilter.filter]);
