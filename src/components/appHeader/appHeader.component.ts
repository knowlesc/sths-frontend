import * as angular from 'angular';
import { AppMenu } from '../appMenu/appMenu.component';

export class AppHeader {
  static moduleName = 'AppHeader';
  static componentName = 'appHeader';
  static componentOptions: ng.IComponentOptions = {
    template: `
      <app-menu></app-menu>
    `
  };
}

angular.module(AppHeader.moduleName, [AppMenu.moduleName])
  .component(AppHeader.componentName, AppHeader.componentOptions);
