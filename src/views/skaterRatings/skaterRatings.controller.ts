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
    this.gridOptions.columns = skaterRatingsGridColumns();
    this.gridOptions.showIndexColumn = true;
    this.gridOptions.defaultRowsPerPage = 20;
    this.gridOptions.paginationOptions = [20, 50, 100];
    this.gridOptions.defaultSortField = 'Overall';
  }

  leagueUpdated(league: 'farm' | 'pro') {
    if (league === null) {
      this.skaterRatingsGridService.selectedTeam = 0;
      this.skaterRatingsGridService.selectedLeague = null;
    } else {
      this.skaterRatingsGridService.selectedTeam = null;
      this.skaterRatingsGridService.selectedLeague = league;
    }
    this.gridOptions.api.reloadData();
  }
}
