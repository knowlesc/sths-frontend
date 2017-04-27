import * as angular from 'angular';

export class AppMain {
  static moduleName = 'AppMain';
  static componentName = 'appMain';
  static componentOptions: ng.IComponentOptions = {
    template: `
      <div class="container-fluid">
        <div class="col-md-2"><!-- spacer --></div>
        <div class="col-md-2">
          <div class="panel panel-default">
            <div class="panel-heading">Latest Scores</div>
            <div class="panel-body">
              Example
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="panel panel-default">
            <div class="panel-heading">Latest Transactions</div>
            <div class="panel-body">
              Example
            </div>
          </div>
        </div>
        <div class="col-md-2"><!-- spacer --></div>
      </div>
    `
  };
}

angular.module(AppMain.moduleName, [])
  .component(AppMain.componentName, AppMain.componentOptions);
