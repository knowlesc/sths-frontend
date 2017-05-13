import * as angular from 'angular';
import { AppMenuController } from './appMenu.controller';

export class AppMenu {
  static moduleName = 'AppMenu';
  static componentName = 'appMenu';
  static componentOptions: ng.IComponentOptions = {
    controller: AppMenuController,
    template: `
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar-items">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#!/">STHS</a>
          </div>

          <div class="collapse navbar-collapse" id="navbar-items">
            <ul class="nav navbar-nav">
              <li ng-repeat="menuItem in $ctrl.menuItems">
                <a ng-if="!menuItem.subItems" ng-href="{{ menuItem.url }}">
                  <span ng-bind="menuItem.text"></span>
                </a>

                <a ng-if="menuItem.subItems" class="dropdown-toggle" data-toggle="dropdown">
                  <span ng-bind="menuItem.text"></span>
                  <span class="caret"></span>
                </a>
                <ul ng-if="menuItem.subItems" class="dropdown-menu">
                  <li ng-repeat="subItem in menuItem.subItems">
                    <a ng-href="{{ subItem.url }}">
                      <span ng-bind="subItem.text"></span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `
  };
}

angular.module(AppMenu.moduleName, [])
  .component(AppMenu.componentName, AppMenu.componentOptions);
