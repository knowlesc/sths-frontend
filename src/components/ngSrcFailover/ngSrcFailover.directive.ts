import * as angular from 'angular';

export class NgSrcFailover {
  static moduleName = 'NgSrcFailover';
  static directiveName = 'ngSrcFailover';
  static directiveOptions: ng.IDirectiveFactory = () => {
    return {
      restrict: 'A',
      link: (scope, element) => {
        element.find('img').on('error', () => {
          element.addClass('fail');
        });
      }
    };
  }
}

angular.module(NgSrcFailover.moduleName, [])
  .directive(NgSrcFailover.directiveName, NgSrcFailover.directiveOptions);
