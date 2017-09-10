import { PlayoffBracketController } from './playoffBracket.controller';
import * as angular from 'angular';

export class PlayoffBracket {
  static moduleName = 'PlayoffBracket';
  static componentName = 'playoffBracket';
  static componentOptions: ng.IComponentOptions = {
    bindings: {
      standings: '<'
    },
    controller: PlayoffBracketController,
    templateUrl: 'templates/playoffBracket.template.html'
  };
}

angular.module(PlayoffBracket.moduleName, [])
  .component(PlayoffBracket.componentName, PlayoffBracket.componentOptions);
