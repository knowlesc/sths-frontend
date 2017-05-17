import { SkaterRatingsGridService } from '../../grids/skaterRatingsGrid/skaterRatingsGrid.service';
import { skaterRatingsGridColumns } from '../../grids/skaterRatingsGrid/skaterRatingsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class SkaterRatingsController {
  gridOptions: GridOptions;

  static $inject = ['skaterRatingsGridService'];
  constructor(private skaterRatingsGridService: SkaterRatingsGridService) {
    this.skaterRatingsGridService.selectedTeam = null;
    this.skaterRatingsGridService.selectedLeague = 'pro';

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.skaterRatingsGridService;
    this.gridOptions.columns = skaterRatingsGridColumns;
    this.gridOptions.showIndexColumn = true;
    this.gridOptions.defaultRowsPerPage = 20;
    this.gridOptions.paginationOptions = [20, 50, 100];
    this.gridOptions.defaultSortField = 'Name';
  }

  leagueUpdated(league: 'farm' | 'pro') {
    this.skaterRatingsGridService.selectedLeague = league;
    this.gridOptions.api.reloadData();
  }
}
