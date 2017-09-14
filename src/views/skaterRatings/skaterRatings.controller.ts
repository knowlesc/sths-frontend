import { SkaterRatingsGridService } from '../../grids/skaterRatingsGrid/skaterRatingsGrid.service';
import { skaterRatingsGridColumns } from '../../grids/skaterRatingsGrid/skaterRatingsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class SkaterRatingsController {
  gridOptions: GridOptions;
  filter: { position: string } = { position: null };
  page: number;
  sort: string;
  league: string;

  static $inject = ['$location', 'skaterRatingsGridService'];
  constructor(private $location: ng.ILocationService,
    private skaterRatingsGridService: SkaterRatingsGridService) {
    const search = this.$location.search();
    this.page = search.page || 1;
    this.sort = search.sort || '-Overall';
    this.league = search.league || 'pro';
    this.filter.position = search.position || null;

    if (this.league === 'none') {
      this.skaterRatingsGridService.selectedTeam = 0;
      this.skaterRatingsGridService.selectedLeague = null;
    } else {
      this.skaterRatingsGridService.selectedTeam = null;
      this.skaterRatingsGridService.selectedLeague = this.league;
    }

    this.skaterRatingsGridService.selectedPosition = this.filter.position;

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.skaterRatingsGridService;
    this.gridOptions.columns = skaterRatingsGridColumns();
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
      league: this.league,
      position: this.filter.position
    });
  }

  leagueUpdated(league: string) {
    if (league === 'none') {
      this.skaterRatingsGridService.selectedTeam = 0;
      this.skaterRatingsGridService.selectedLeague = null;
    } else {
      this.skaterRatingsGridService.selectedTeam = null;
      this.skaterRatingsGridService.selectedLeague = league;
    }
    this.league = league;
    this.gridOptions.api.reloadData();
    this.updateUrl();
  }

  filterUpdated() {
    this.skaterRatingsGridService.selectedPosition = this.filter.position;
    this.gridOptions.api.reloadData();
  }
}
