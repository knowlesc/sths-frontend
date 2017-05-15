import { GoalieRatingsGridService } from '../../grids/goalieRatingsGrid/goalieRatingsGrid.service';
import { goalieRatingsGridColumns } from '../../grids/goalieRatingsGrid/goalieRatingsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class GoalieRatingsController {
  gridOptions: GridOptions;

  constructor(private goalieRatingsGridService: GoalieRatingsGridService) {
    this.goalieRatingsGridService.selectedTeam = null;
    this.goalieRatingsGridService.selectedLeague = 'pro';

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.goalieRatingsGridService;
    this.gridOptions.columns = goalieRatingsGridColumns;
    this.gridOptions.showIndexColumn = true;
    this.gridOptions.defaultRowsPerPage = 20;
    this.gridOptions.paginationOptions = [20, 50, 100];
    this.gridOptions.defaultSortField = 'Name';
  }

  leagueUpdated(league: 'farm' | 'pro') {
    this.goalieRatingsGridService.selectedLeague = league;
    this.gridOptions.api.reloadData();
  }
}
