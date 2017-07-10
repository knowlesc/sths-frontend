import * as angular from 'angular';
import { Grid } from './grid/grid.component';
import { AppMenu } from './appMenu/appMenu.component';
import { LeagueSelector } from './leagueSelector/leagueSelector.component';
import { ScoreCard } from './scoreCard/scoreCard.component';
import { TwitterTimeline } from './TwitterTimeline/twitterTimeline.component';

export class Components {
  static moduleName = 'Components';
}

angular.module(Components.moduleName, [
  Grid.moduleName,
  AppMenu.moduleName,
  LeagueSelector.moduleName,
  ScoreCard.moduleName,
  TwitterTimeline.moduleName
]);
