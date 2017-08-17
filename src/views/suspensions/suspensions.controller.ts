import { GridOptions } from '../../components/grid/models/gridOptions';
import { TransactionsGridService } from '../../grids/transactionsGrid/transactionsGrid.service';
import { transactionsGridColumns } from '../../grids/transactionsGrid/transactionsGrid.columns';
import { TransactionTypes } from '../../models/league/transactionTypes';
import { PlayerService } from '../../services/playerService';
import { PlayerSuspension } from '../../models/players/playerSuspension';

export class SuspensionsController {
  gridOptions: GridOptions;
  loadingSuspendedPlayers = true;
  suspendedPlayers: PlayerSuspension[];

  static $inject = ['$timeout', 'playerService', 'transactionsGridService'];
  constructor(private $timeout: ng.ITimeoutService,
    private playerService: PlayerService,
    private transactionsGridService: TransactionsGridService) {
    playerService.getSuspendedPlayers()
      .then((results) => {
        $timeout(() => {
          this.suspendedPlayers = results;
          this.loadingSuspendedPlayers = false;
        });
      })
      .catch(() => {
        $timeout(() => {
          this.loadingSuspendedPlayers = false;
        });
      });

    this.transactionsGridService.types = [TransactionTypes.Suspension];
    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.transactionsGridService;
    this.gridOptions.columns = transactionsGridColumns();
    this.gridOptions.defaultRowsPerPage = 20;
    this.gridOptions.paginationOptions = [20, 50, 100];
  }

  get proTeamsWithSuspendedPlayers() {
    if (!this.suspendedPlayers) {
      return [];
    }

    return this.suspendedPlayers.filter((player) => player.League === 'pro')
      .map((player) => player.Team)
      .filter((item, i, array) => array.indexOf(item) === i);
  }

  get farmTeamsWithSuspendedPlayers() {
    if (!this.suspendedPlayers) {
      return [];
    }

    return this.suspendedPlayers.filter((player) => player.League === 'farm')
      .map((player) => player.Team)
      .filter((item, i, array) => array.indexOf(item) === i);
  }
}
