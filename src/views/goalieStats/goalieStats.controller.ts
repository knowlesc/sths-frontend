import { GoalieStatsGridService } from '../../grids/goalieStatsGrid/goalieStatsGrid.service';
import { goalieStatsGridColumns } from '../../grids/goalieStatsGrid/goalieStatsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class GoalieStatsController {
  gridOptions: GridOptions;

  static $inject = ['goalieStatsGridService'];
  constructor(private goalieStatsGridService: GoalieStatsGridService) {
    this.goalieStatsGridService.selectedTeam = null;
    this.goalieStatsGridService.selectedLeague = 'pro';

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.goalieStatsGridService;
    this.gridOptions.columns = goalieStatsGridColumns;
    this.gridOptions.showIndexColumn = true;
    this.gridOptions.defaultRowsPerPage = 20;
    this.gridOptions.paginationOptions = [20, 50, 100];
    this.gridOptions.defaultSortField = 'W';
  }

  leagueUpdated(league: 'farm' | 'pro') {
    this.goalieStatsGridService.selectedLeague = league;
    this.gridOptions.api.reloadData();
  }
}
