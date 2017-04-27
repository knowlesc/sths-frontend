import * as angular from 'angular';
import { PlayerStatsController } from './playerStats.controller';

export class PlayerStats {
  static moduleName = 'PlayerStats';
  static componentName = 'playerStats';
  static componentOptions: ng.IComponentOptions = {
    controller: PlayerStatsController,
    template: `
      <nav class="navbar navbar-default navbar-stacked">
        <div class="container-fluid">
          <div class="col-md-2"><!-- spacer --></div>
          <div class="col-md-8">
            <div class="btn-group pull-right league-select">
              <button type="button" class="btn btn-default active">NHL</button>
              <button type="button" class="btn btn-default">AHL</button>
            </div>
          </div>
          <div class="col-md-2"><!-- spacer --></div>
        </div>
      </nav>
      <div class="container-fluid">
        <div class="col-md-2"><!-- spacer --></div>
        <div class="col-md-8">
          <div class="panel panel-default">
            <div class="panel-heading">
              Player Statistics
            </div>
            <div class="panel-body">
              <table class="table table-striped table-hover table-condensed">
                <thead>
                  <th>One</th>
                  <th>Two</th>
                </thead>
                <tbody>
                  <tr>
                    <td>Example</td>
                    <td>Example</td>
                  </tr>
                  <tr>
                    <td>Example</td>
                    <td>Example</td>
                  </tr>
                  <tr>
                    <td>Example</td>
                    <td>Example</td>
                  </tr>
                  <tr>
                    <td>Example</td>
                    <td>Example</td>
                  </tr>
                </tbody>
              </table>

              <div class="text-center">
                <ul class="pagination pagination-sm">
                  <li>
                    <a>
                      <span>&laquo;</span>
                    </a>
                  </li>
                  <li><a>1</a></li>
                  <li><a>2</a></li>
                  <li><a>3</a></li>
                  <li><a>4</a></li>
                  <li><a>5</a></li>
                  <li>
                    <a>
                      <span>&raquo;</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2"><!-- spacer --></div>
      </div>
    `
  };
}

angular.module(PlayerStats.moduleName, [])
  .component(PlayerStats.componentName, PlayerStats.componentOptions);
