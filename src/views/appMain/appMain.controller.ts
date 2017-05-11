import { TransactionsGridService } from '../../grids/transactionsGrid/transactionsGrid.service';
import { transactionsGridColumns } from '../../grids/transactionsGrid/transactionsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class AppMainController {

  gridOptions: GridOptions;

  constructor(private upcomingGames: {}[],
    private transactionsGridService: TransactionsGridService,
    private $timeout: ng.ITimeoutService) {
    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.transactionsGridService;
    this.gridOptions.columns = transactionsGridColumns;
  }
}
