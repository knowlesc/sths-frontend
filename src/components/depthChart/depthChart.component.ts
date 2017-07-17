import * as angular from 'angular';
import { DepthChartController } from './depthChart.controller';

export class DepthChart {
  static moduleName = 'DepthChart';
  static componentName = 'depthChart';
  static componentOptions: ng.IComponentOptions = {
    bindings: {
      team: '<'
    },
    controller: DepthChartController,
    templateUrl: 'templates/depthChart.template.html'
  };
}

angular.module(DepthChart.moduleName, [])
  .component(DepthChart.componentName, DepthChart.componentOptions);
