import { SkaterStatsGridService } from '../../grids/skaterStatsGrid/skaterStatsGrid.service';
import { skaterStatsGridColumns } from '../../grids/skaterStatsGrid/skaterStatsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class SkaterStatsController {
  gridOptions: GridOptions;

  static $inject = ['skaterStatsGridService'];
  constructor(private skaterStatsGridService: SkaterStatsGridService) {
    this.skaterStatsGridService.selectedTeam = null;
    this.skaterStatsGridService.selectedLeague = 'pro';

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.skaterStatsGridService;
    this.gridOptions.columns = skaterStatsGridColumns;
    this.gridOptions.showIndexColumn = true;
    this.gridOptions.defaultRowsPerPage = 20;
    this.gridOptions.paginationOptions = [20, 50, 100];
    this.gridOptions.defaultSortField = 'P';
  }

  leagueUpdated(league: 'farm' | 'pro') {
    this.skaterStatsGridService.selectedLeague = league;
    this.gridOptions.api.reloadData();
  }
}
