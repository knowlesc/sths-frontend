import { PlayerStatsGridService } from '../../grids/playerStatsGrid/playerStatsGrid.service';
import { playerStatsGridColumns } from '../../grids/playerStatsGrid/playerStatsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class PlayerStatsController {
  gridOptions: GridOptions;

  constructor(private playerStatsGridService: PlayerStatsGridService) {
    this.playerStatsGridService.selectedTeam = null;
    this.playerStatsGridService.selectedLeague = 'pro';

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.playerStatsGridService;
    this.gridOptions.columns = playerStatsGridColumns;
    this.gridOptions.showIndexColumn = true;
    this.gridOptions.defaultRowsPerPage = 50;
    this.gridOptions.paginationOptions = [20, 50, 100];
  }

  leagueUpdated(league: 'farm' | 'pro') {
    this.playerStatsGridService.selectedLeague = league;
    this.gridOptions.api.reloadData();
  }
}
