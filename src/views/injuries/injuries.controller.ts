import { GridOptions } from '../../components/grid/models/gridOptions';
import { TransactionsGridService } from '../../grids/transactionsGrid/transactionsGrid.service';
import { transactionsGridColumns } from '../../grids/transactionsGrid/transactionsGrid.columns';
import { TransactionTypes } from '../../models/league/transactionTypes';
import { PlayerService } from '../../services/playerService';
import { PlayerInjury } from '../../models/players/playerInjury';

export class InjuriesController {
  gridOptions: GridOptions;
  loadingInjuredPlayers = true;
  injuredPlayers: PlayerInjury[];

  static $inject = ['$timeout', 'playerService', 'transactionsGridService'];
  constructor(private $timeout: ng.ITimeoutService,
    private playerService: PlayerService,
    private transactionsGridService: TransactionsGridService) {
    playerService.getInjuredPlayers()
      .then((results) => {
        $timeout(() => {
          this.injuredPlayers = results;
          this.loadingInjuredPlayers = false;
        });
      })
      .catch(() => {
        $timeout(() => {
          this.loadingInjuredPlayers = false;
        });
      });

    this.transactionsGridService.types = [TransactionTypes.Injury];
    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.transactionsGridService;
    this.gridOptions.columns = transactionsGridColumns();
    this.gridOptions.defaultRowsPerPage = 20;
    this.gridOptions.paginationOptions = [20, 50, 100];
  }

  get teamsWithInjuredPlayers() {
    if (!this.injuredPlayers) {
      return [];
    }

    return this.injuredPlayers.map((player) => player.Team)
      .filter((item, i, array) => array.indexOf(item) === i);
  }
}
