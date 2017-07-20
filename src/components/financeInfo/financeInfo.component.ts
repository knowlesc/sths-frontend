import * as angular from 'angular';
import { FinanceInfoController } from './financeInfo.controller';

export class FinanceInfo {
  static moduleName = 'FinanceInfo';
  static componentName = 'financeInfo';
  static componentOptions: ng.IComponentOptions = {
    bindings: {
      team: '<',
      league: '<'
    },
    controller: FinanceInfoController,
    templateUrl: 'templates/financeInfo.template.html'
  };
}

angular.module(FinanceInfo.moduleName, [])
  .component(FinanceInfo.componentName, FinanceInfo.componentOptions);
