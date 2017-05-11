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
          <span ng-bind="$ctrl.gameInfo.HomeTeamName"></span>
          <span ng-bind="$ctrl.homeRecord"></span>
        </div>
        <div class="score-card-team">
          <span ng-bind="$ctrl.gameInfo.VisitorTeamName"></span>
          <span ng-bind="$ctrl.visitorRecord"></span>
        </div>
      </div>
    `
  };
}

angular.module(ScoreCard.moduleName, [])
  .component(ScoreCard.componentName, ScoreCard.componentOptions);
