import * as angular from 'angular';
import { PlayerService } from './playerService';
import { TeamService } from './teamService';
import { LeagueService } from './leagueService';
import { ScheduleService } from './scheduleService';

export class Services {
  static moduleName = 'Services';
}

angular.module(Services.moduleName, [])
  .service(ScheduleService.serviceName, ScheduleService)
  .service(LeagueService.serviceName, LeagueService)
  .service(PlayerService.serviceName, PlayerService)
  .service(TeamService.serviceName, TeamService);
