import { GridOptions } from '../../components/grid/models/gridOptions';
import { waiversGridColumns } from '../../grids/waiversGrid/waiversGrid.columns';
import { WaiversGridService } from '../../grids/waiversGrid/waiversGrid.service';
import { WaiversService } from '../../services/waiversService';
import { WaiversOrderTeam } from '../../models/waivers/waiversOrderTeam';
import { TransactionsGridService } from '../../grids/transactionsGrid/transactionsGrid.service';
import { transactionsGridColumns } from '../../grids/transactionsGrid/transactionsGrid.columns';
import { TransactionTypes } from '../../models/league/transactionTypes';

export class WaiversController {
  currentWaiversGridOptions: GridOptions;
  waiversHistoryGridOptions: GridOptions;
  waiversOrder: WaiversOrderTeam[];
  loadingWaiversOrder = true;

  static $inject = ['$timeout', 'waiversService', 'waiversGridService', 'transactionsGridService'];
  constructor(private $timeout: ng.ITimeoutService,
    private waiversService: WaiversService,
    private waiversGridService: WaiversGridService,
    private transactionsGridService: TransactionsGridService) {
    waiversService.getWaiversOrder()
      .then((results) => {
        $timeout(() => {
          this.waiversOrder = results;
          this.loadingWaiversOrder = false;
        });
      })
      .catch(() => {
        $timeout(() => {
          this.loadingWaiversOrder = false;
        });
      });

    this.currentWaiversGridOptions = new GridOptions();
    this.currentWaiversGridOptions.dataSource = this.waiversGridService;
    this.currentWaiversGridOptions.columns = waiversGridColumns();

    this.transactionsGridService.types = [TransactionTypes.Waiver];
    this.waiversHistoryGridOptions = new GridOptions();
    this.waiversHistoryGridOptions.dataSource = this.transactionsGridService;
    this.waiversHistoryGridOptions.columns = transactionsGridColumns();
    this.waiversHistoryGridOptions.defaultRowsPerPage = 20;
    this.waiversHistoryGridOptions.paginationOptions = [20, 50, 100];
  }
}
