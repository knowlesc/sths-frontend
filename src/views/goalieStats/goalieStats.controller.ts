import { GoalieStatsGridService } from '../../grids/goalieStatsGrid/goalieStatsGrid.service';
import { goalieStatsGridColumns } from '../../grids/goalieStatsGrid/goalieStatsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class GoalieStatsController {
  gridOptions: GridOptions;
  page: number;
  sort: string;
  league: string;

  static $inject = ['$location', 'goalieStatsGridService'];
  constructor(private $location: ng.ILocationService,
    private goalieStatsGridService: GoalieStatsGridService) {
    const search = this.$location.search();
    this.page = search.page || 1;
    this.sort = search.sort || '-W';
    this.league = search.league || 'pro';

    this.goalieStatsGridService.selectedTeam = null;
    this.goalieStatsGridService.selectedLeague = this.league;

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.goalieStatsGridService;
    this.gridOptions.columns = goalieStatsGridColumns();
    this.gridOptions.showIndexColumn = true;
    this.gridOptions.defaultRowsPerPage = 20;
    this.gridOptions.paginationOptions = [20, 50, 100];
    this.gridOptions.defaultSortField = this.sort;
    this.gridOptions.startAtPage = this.page;

    this.gridOptions.onPageChanged = (page: number) => {
      this.page = page;
      this.updateUrl();
    };

    this.gridOptions.onSortChanged = (sort: string) => {
      this.sort = sort;
      this.updateUrl();
    };
  }

  updateUrl() {
    this.$location.search({
      page: this.page,
      sort: this.sort,
      league: this.league
    });
  }

  leagueUpdated(league: 'farm' | 'pro') {
    this.league = league;
    this.goalieStatsGridService.selectedLeague = league;
    this.gridOptions.api.reloadData();
    this.updateUrl();
  }
}
