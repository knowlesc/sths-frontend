import * as angular from 'angular';
import { ScoreCardController } from './scoreCard.controller';

export class ScoreCard {
  static moduleName = 'ScoreCard';
  static componentName = 'scoreCard';
  static componentOptions: ng.IComponentOptions = {
    bindings: {
      gameInfo: '<'
    },
    controller: ScoreCardController,
    template: `
      <div class="well well-sm score-card">
        <div class="score-card-date">Day {{ $ctrl.gameInfo.Day }}</div>
        <div class="score-card-team">
          <a ng-href="{{ '#!/teams/pro/' + $ctrl.gameInfo.HomeTeam }}">
            <span ng-bind="$ctrl.gameInfo.HomeTeamName"></span>
          </a>
          <span ng-bind="$ctrl.homeRecord"></span>
        </div>
        <div class="score-card-team">
          <a ng-href="{{ '#!/teams/pro/' + $ctrl.gameInfo.VisitorTeam }}">
            <span ng-bind="$ctrl.gameInfo.VisitorTeamName"></span>
          </a>
          <span ng-bind="$ctrl.visitorRecord"></span>
        </div>
      </div>
    `
  };
}

angular.module(ScoreCard.moduleName, [])
  .component(ScoreCard.componentName, ScoreCard.componentOptions);
