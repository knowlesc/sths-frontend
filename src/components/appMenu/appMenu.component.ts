import * as angular from 'angular';
import { AppMenuController } from './appMenu.controller';

export class AppMenu {
  static moduleName = 'AppMenu';
  static componentName = 'appMenu';
  static componentOptions: ng.IComponentOptions = {
    controller: AppMenuController,
    templateUrl: 'templates/appMenu.template.html'
  };
}

angular.module(AppMenu.moduleName, [])
  .component(AppMenu.componentName, AppMenu.componentOptions);
