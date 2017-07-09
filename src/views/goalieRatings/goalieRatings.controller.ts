import { GoalieRatingsGridService } from '../../grids/goalieRatingsGrid/goalieRatingsGrid.service';
import { goalieRatingsGridColumns } from '../../grids/goalieRatingsGrid/goalieRatingsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class GoalieRatingsController {
  gridOptions: GridOptions;

  static $inject = ['goalieRatingsGridService'];
  constructor(private goalieRatingsGridService: GoalieRatingsGridService) {
    this.goalieRatingsGridService.selectedTeam = null;
    this.goalieRatingsGridService.selectedLeague = 'pro';

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.goalieRatingsGridService;
    this.gridOptions.columns = goalieRatingsGridColumns();
    this.gridOptions.showIndexColumn = true;
    this.gridOptions.defaultRowsPerPage = 20;
    this.gridOptions.paginationOptions = [20, 50, 100];
    this.gridOptions.defaultSortField = 'Overall';
  }

  leagueUpdated(league: 'farm' | 'pro') {
    if (league === null) {
      this.goalieRatingsGridService.selectedTeam = 0;
      this.goalieRatingsGridService.selectedLeague = null;
    } else {
      this.goalieRatingsGridService.selectedTeam = null;
      this.goalieRatingsGridService.selectedLeague = league;
    }
    this.gridOptions.api.reloadData();
  }
}
