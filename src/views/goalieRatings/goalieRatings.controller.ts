import { GoalieRatingsGridService } from '../../grids/goalieRatingsGrid/goalieRatingsGrid.service';
import { goalieRatingsGridColumns } from '../../grids/goalieRatingsGrid/goalieRatingsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class GoalieRatingsController {
  gridOptions: GridOptions;
  page: number;
  sort: string;
  league: string;

  static $inject = ['$location', 'goalieRatingsGridService'];
  constructor(private $location: ng.ILocationService,
    private goalieRatingsGridService: GoalieRatingsGridService) {
    const search = this.$location.search();
    this.page = search.page || 1;
    this.sort = search.sort || '-Overall';
    this.league = search.league || 'pro';

    if (this.league === 'none') {
      this.goalieRatingsGridService.selectedTeam = 0;
      this.goalieRatingsGridService.selectedLeague = null;
    } else {
      this.goalieRatingsGridService.selectedTeam = null;
      this.goalieRatingsGridService.selectedLeague = this.league;
    }

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.goalieRatingsGridService;
    this.gridOptions.columns = goalieRatingsGridColumns();
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

  leagueUpdated(league: string) {
    if (league === 'none') {
      this.goalieRatingsGridService.selectedTeam = 0;
      this.goalieRatingsGridService.selectedLeague = null;
    } else {
      this.goalieRatingsGridService.selectedTeam = null;
      this.goalieRatingsGridService.selectedLeague = league;
    }
    this.league = league;
    this.gridOptions.api.reloadData();
    this.updateUrl();
  }
}
