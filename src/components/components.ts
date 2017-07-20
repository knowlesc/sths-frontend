import * as angular from 'angular';
import { Grid } from './grid/grid.component';
import { AppMenu } from './appMenu/appMenu.component';
import { LeagueSelector } from './leagueSelector/leagueSelector.component';
import { ScoreCard } from './scoreCard/scoreCard.component';
import { TwitterTimeline } from './twitterTimeline/twitterTimeline.component';
import { PlayerCompare } from './playerCompare/playerCompare.component';
import { Loader } from './loader/loader.component';
import { NewsArticle } from './newsArticle/newsArticle.component';
import { DepthChart } from './depthChart/depthChart.component';
import { FinanceInfo } from './financeInfo/financeInfo.component';

export class Components {
  static moduleName = 'Components';
}

angular.module(Components.moduleName, [
  Grid.moduleName,
  AppMenu.moduleName,
  LeagueSelector.moduleName,
  ScoreCard.moduleName,
  TwitterTimeline.moduleName,
  PlayerCompare.moduleName,
  Loader.moduleName,
  NewsArticle.moduleName,
  DepthChart.moduleName,
  FinanceInfo.moduleName
]);
