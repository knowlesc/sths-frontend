import { ScheduleService } from '../../services/scheduleService';
import { TransactionsGridService } from '../../grids/transactionsGrid/transactionsGrid.service';
import { transactionsGridColumns } from '../../grids/transactionsGrid/transactionsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class AppMainController {
  loadingUpcomingGames = true;
  upcomingGames: {}[];
  gridOptions: GridOptions;

  static $inject = ['$timeout', 'scheduleService', 'transactionsGridService'];
  constructor(private $timeout: ng.ITimeoutService,
    private scheduleService: ScheduleService,
    private transactionsGridService: TransactionsGridService) {
    scheduleService.getSchedule({ nextSimOnly: 'true' })
      .then((results) => {
        $timeout(() => {
          this.upcomingGames = results.rows;
          this.loadingUpcomingGames = false;
        });
      })
      .catch(() => {
        $timeout(() => {
          this.loadingUpcomingGames = false;
        });
      });

    this.transactionsGridService.types = null;

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.transactionsGridService;
    this.gridOptions.columns = transactionsGridColumns();
  }
}
