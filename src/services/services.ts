import * as angular from 'angular';
import { PlayerService } from './playerService';
import { TeamService } from './teamService';
import { LeagueService } from './leagueService';
import { ScheduleService } from './scheduleService';
import { WaiversService } from './waiversService';
import { DraftService } from './draftService';

export class Services {
  static moduleName = 'Services';
}

angular.module(Services.moduleName, [])
  .service(ScheduleService.serviceName, ScheduleService)
  .service(LeagueService.serviceName, LeagueService)
  .service(PlayerService.serviceName, PlayerService)
  .service(WaiversService.serviceName, WaiversService)
  .service(TeamService.serviceName, TeamService)
  .service(DraftService.serviceName, DraftService);
