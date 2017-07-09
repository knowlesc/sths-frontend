import { GridOptions } from '../../components/grid/models/gridOptions';
import { TransactionsGridService } from '../../grids/transactionsGrid/transactionsGrid.service';
import { transactionsGridColumns } from '../../grids/transactionsGrid/transactionsGrid.columns';
import { TransactionTypes } from '../../models/league/transactionTypes';

export class TradesController {
  gridOptions: GridOptions;

  static $inject = ['transactionsGridService'];
  constructor(private transactionsGridService: TransactionsGridService) {
    this.transactionsGridService.types = [TransactionTypes.Trade];
    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.transactionsGridService;
    this.gridOptions.columns = transactionsGridColumns();
    this.gridOptions.defaultRowsPerPage = 20;
    this.gridOptions.paginationOptions = [20, 50, 100];
  }
}
