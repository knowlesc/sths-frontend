import { TeamStatsGridService } from '../../grids/teamStatsGrid/teamStatsGrid.service';
import { teamStatsGridColumns } from '../../grids/teamStatsGrid/teamStatsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class TeamStatsController {
  gridOptions: GridOptions;

  constructor(private teamStatsGridService: TeamStatsGridService) {
    this.teamStatsGridService.selectedTeam = null;
    this.teamStatsGridService.selectedLeague = 'pro';

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.teamStatsGridService;
    this.gridOptions.columns = teamStatsGridColumns;
    this.gridOptions.showIndexColumn = true;
    this.gridOptions.defaultRowsPerPage = 20;
    this.gridOptions.paginationOptions = [20, 50, 100];
    this.gridOptions.defaultSortField = 'Points';
  }

  leagueUpdated(league: 'farm' | 'pro') {
    this.teamStatsGridService.selectedLeague = league;
    this.gridOptions.api.reloadData();
  }
}
