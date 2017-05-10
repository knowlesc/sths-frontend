import * as angular from 'angular';
import { SkaterRatingsGridService } from './skaterRatingsGrid/skaterRatingsGrid.service';
import { SkaterStatsGridService } from './skaterStatsGrid/skaterStatsGrid.service';
import { GoalieStatsGridService } from './goalieStatsGrid/goalieStatsGrid.service';
import { GoalieRatingsGridService } from './goalieRatingsGrid/goalieRatingsGrid.service';
import { TransactionsGridService } from './transactionsGrid/transactionsGrid.service';

export class GridServices {
  static moduleName = 'GridServices';
}

angular.module(GridServices.moduleName, [])
  .service(SkaterRatingsGridService.serviceName, SkaterRatingsGridService)
  .service(SkaterStatsGridService.serviceName, SkaterStatsGridService)
  .service(GoalieRatingsGridService.serviceName, GoalieRatingsGridService)
  .service(TransactionsGridService.serviceName, TransactionsGridService)
  .service(GoalieStatsGridService.serviceName, GoalieStatsGridService);
