import * as angular from 'angular';
import { LeagueSelectorController } from './leagueSelector.controller';

export class LeagueSelector {
  static moduleName = 'LeagueSelector';
  static componentName = 'leagueSelector';
  static componentOptions: ng.IComponentOptions = {
    bindings: {
      initialLeague: '<',
      disabled: '<',
      showUnassigned: '<',
      onChange: '&'
    },
    controller: LeagueSelectorController,
    template: `
      <div class="btn-group pull-right button-group-margin">
        <button type="button"
          class="btn btn-default"
          ng-class="{ 'active': $ctrl.selectedLeague === 'pro' }"
          ng-click="$ctrl.updateLeague('pro')">NHL</button>
        <button type="button"
          class="btn btn-default"
          ng-class="{ 'active': $ctrl.selectedLeague === 'farm' }"
          ng-click="$ctrl.updateLeague('farm')">AHL</button>
        <button type="button"
          class="btn btn-default"
          ng-if="$ctrl.showUnassigned"
          ng-class="{ 'active': $ctrl.selectedLeague === 'none' }"
          ng-click="$ctrl.updateLeague('none')">Free Agents</button>
      </div>
    `
  };
}

angular.module(LeagueSelector.moduleName, [])
  .component(LeagueSelector.componentName, LeagueSelector.componentOptions);
