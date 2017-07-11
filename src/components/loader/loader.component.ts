import * as angular from 'angular';

export class Loader {
  static moduleName = 'Loader';
  static componentName = 'loader';
  static componentOptions: ng.IComponentOptions = {
    template: `
      <div class="loader-overlay">
        <div class="loader-inner line-scale">
          <div></div><div></div><div></div><div></div><div></div>
        </div>
      </div>
    `
  };
}

angular.module(Loader.moduleName, [])
  .component(Loader.componentName, Loader.componentOptions);
