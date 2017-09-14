import { SkaterStatsGridService } from '../../grids/skaterStatsGrid/skaterStatsGrid.service';
import { skaterStatsGridColumns } from '../../grids/skaterStatsGrid/skaterStatsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class SkaterStatsController {
  gridOptions: GridOptions;
  filter: { position: string } = { position: null };
  page: number;
  sort: string;
  league: string;

  static $inject = ['$location', 'skaterStatsGridService'];
  constructor(private $location: ng.ILocationService,
    private skaterStatsGridService: SkaterStatsGridService) {
    const search = this.$location.search();
    this.page = search.page || 1;
    this.sort = search.sort || '-P';
    this.league = search.league || 'pro';
    this.filter.position = search.position || null;

    this.skaterStatsGridService.selectedTeam = null;
    this.skaterStatsGridService.selectedPosition = this.filter.position;
    this.skaterStatsGridService.selectedLeague = this.league;

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.skaterStatsGridService;
    this.gridOptions.columns = skaterStatsGridColumns();
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

  leagueUpdated(league: 'farm' | 'pro') {
    this.league = league;
    this.skaterStatsGridService.selectedLeague = league;
    this.gridOptions.api.reloadData();
    this.updateUrl();
  }

  filterUpdated() {
    this.skaterStatsGridService.selectedPosition = this.filter.position;
    this.gridOptions.api.reloadData();
    this.updateUrl();
  }
}
