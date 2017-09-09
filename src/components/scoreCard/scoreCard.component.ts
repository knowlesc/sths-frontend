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
        <div class="score-card-date">
          Day {{ $ctrl.gameInfo.Day }}
          <span class="pull-right" ng-if="$ctrl.gameInfo.Play === 'True'">
            Final
            <span ng-if="$ctrl.gameInfo.Shootout === 'True'">(SO)</span>
            <span ng-if="$ctrl.gameInfo.Shootout === 'False' && $ctrl.gameInfo.Overtime === 'True'">(OT)</span>
          </span>
        </div>

        <div class="score-card-team">
          <span class="score-card-team-info">
            <a ng-href="{{ '#!/teams/pro/' + $ctrl.gameInfo.HomeTeam }}">
              <span ng-bind="$ctrl.gameInfo.HomeTeamName"></span>
            </a>
            <span title="{{ $ctrl.homeRecord }}" ng-bind="$ctrl.homeRecord"></span>
          </span>
          <span class="score-card-score"
            ng-if="$ctrl.gameInfo.Play === 'True'"
            ng-bind="$ctrl.gameInfo.HomeScore"></span>
        </div>
        <div class="score-card-team">
          <span class="score-card-team-info">
            <a ng-href="{{ '#!/teams/pro/' + $ctrl.gameInfo.VisitorTeam }}">
              <span ng-bind="$ctrl.gameInfo.VisitorTeamName"></span>
            </a>
            <span title="{{ $ctrl.visitorRecord }}" ng-bind="$ctrl.visitorRecord"></span>
          </span>
          <span class="score-card-score"
            ng-if="$ctrl.gameInfo.Play === 'True'"
            ng-bind="$ctrl.gameInfo.VisitorScore"></span>
        </div>
      </div>
    `
  };
}

angular.module(ScoreCard.moduleName, [])
  .component(ScoreCard.componentName, ScoreCard.componentOptions);
