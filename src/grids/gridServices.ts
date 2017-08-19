import * as angular from 'angular';
import { SkaterInfoGridService } from './skaterInfoGrid/skaterInfoGrid.service';
import { SkaterStatsGridService } from './skaterStatsGrid/skaterStatsGrid.service';
import { SkaterRatingsGridService } from './skaterRatingsGrid/skaterRatingsGrid.service';
import { GoalieStatsGridService } from './goalieStatsGrid/goalieStatsGrid.service';
import { GoalieRatingsGridService } from './goalieRatingsGrid/goalieRatingsGrid.service';
import { GoalieInfoGridService } from './goalieInfoGrid/goalieInfoGrid.service';
import { TransactionsGridService } from './transactionsGrid/transactionsGrid.service';
import { ScheduleGridService } from './scheduleGrid/scheduleGrid.service';
import { TeamStatsGridService } from './teamStatsGrid/teamStatsGrid.service';
import { WaiversGridService } from './waiversGrid/waiversGrid.service';
import { CoachRatingsGridService } from './coachRatingsGrid/coachRatingsGrid.service';

export class GridServices {
  static moduleName = 'GridServices';
}

angular.module(GridServices.moduleName, [])
  .service(SkaterInfoGridService.serviceName, SkaterInfoGridService)
  .service(SkaterStatsGridService.serviceName, SkaterStatsGridService)
  .service(SkaterRatingsGridService.serviceName, SkaterRatingsGridService)
  .service(GoalieInfoGridService.serviceName, GoalieInfoGridService)
  .service(GoalieRatingsGridService.serviceName, GoalieRatingsGridService)
  .service(TransactionsGridService.serviceName, TransactionsGridService)
  .service(ScheduleGridService.serviceName, ScheduleGridService)
  .service(TeamStatsGridService.serviceName, TeamStatsGridService)
  .service(WaiversGridService.serviceName, WaiversGridService)
  .service(CoachRatingsGridService.serviceName, CoachRatingsGridService)
  .service(GoalieStatsGridService.serviceName, GoalieStatsGridService);
