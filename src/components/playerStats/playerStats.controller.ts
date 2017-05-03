import { PlayersService } from '../../services/playersService';
import { PlayerStats } from '../../models/players/skaterStats';
import { SkaterParams } from '../../models/players/skaterParams';
import { GridOptions } from '../grid/gridOptions';
import { ColumnDef } from '../grid/columnDef';

export class PlayerStatsController {
  playerStats: PlayerStats[];
  gridOptions: GridOptions;
  selectedLeague: 'farm' | 'pro' = 'pro';
  paginationOptions = [10, 20, 50, 100];
  rowsPerPage = 20;
  totalResults = 0;
  currentPage = 1;

  constructor(private $timeout: ng.ITimeoutService, private playersService: PlayersService) {
    this.gridOptions = new GridOptions();
    this.gridOptions.columns = [
      { fieldName: 'Name', sortable: true },
      { fieldName: 'TeamName', sortable: true, headerTitle: 'Team' },
      { fieldName: 'Position', sortable: true, centered: true },
      { fieldName: 'GP', sortable: true, centered: true },
      { fieldName: 'G', sortable: true, centered: true },
      { fieldName: 'A', sortable: true, centered: true },
      { fieldName: 'P', sortable: true, centered: true},
      { fieldName: 'PlusMinus', sortable: true, centered: true, headerTitle: '+/-' },
      { fieldName: 'PIM', sortable: true, centered: true },
      { fieldName: 'Hits', sortable: true, centered: true },
      { fieldName: 'Shots', sortable: true, centered: true },
      { fieldName: 'ShotsPCT', sortable: true, centered: true, headerTitle: 'Shot%',
        template: `<span ng-bind="row.ShotsPCT | number : 1"></span>` },
      { fieldName: 'ShotsBlock', sortable: true, centered: true, headerTitle: 'BkS' },
      { fieldName: 'AvgTOI', sortable: true, centered: true, headerTitle: 'TOI/G',
        template: '<span ng-bind="row.AvgTOI | time"></span>' },
      { fieldName: 'PPG', sortable: true, centered: true },
      { fieldName: 'PPA', sortable: true, centered: true },
      { fieldName: 'PPP', sortable: true, centered: true },
      { fieldName: 'P60', sortable: true, centered: true, headerTitle: 'P/60',
        template: `<span ng-bind="row.P60 || 0"></span>` }
    ];

    this.gridOptions.onSort(() => {
      this.loadStats();
    });

    this.loadStats();
  }

  get totalPages(): number {
    return Math.ceil(this.totalResults / this.rowsPerPage);
  }

  get pagination(): number[] {
    const pages: number[] = [];

    if (this.currentPage - 2 > 0) { pages.push(this.currentPage - 2); }
    if (this.currentPage - 1 > 0) { pages.push(this.currentPage - 1); }

    pages.push(this.currentPage);

    if (this.currentPage + 1 <= this.totalPages) { pages.push(this.currentPage + 1); }
    if (this.currentPage + 2 <= this.totalPages) { pages.push(this.currentPage + 2); }

    if (this.totalPages - 2 > this.currentPage) {
      if (this.totalPages - 2 > this.currentPage + 2) { pages.push(-1); }
      if (this.totalPages - 1 > this.currentPage + 2) { pages.push(this.totalPages - 1); }
      if (this.totalPages > this.currentPage + 2) { pages.push(this.totalPages); }
    }

    return pages;
  }

  range(range: number): number[] {
    const array = [];

    for (let i = 1; i < range; i++) {
      array.push(i);
    }

    return array;
  }

  loadStats() {
    const params: SkaterParams = {
      limit: this.rowsPerPage,
      hasTeam: 'true',
      hasPlayedMinimumGames: 'true',
      league: this.selectedLeague,
      sort: this.gridOptions.getCurrentSortAsString(),
      skip: (this.currentPage - 1) * this.rowsPerPage
    };

    this.playersService.getSkaterStats(params)
      .then((response) => {
        this.$timeout(() => {
          this.playerStats = response.rows;
          this.totalResults = response.totalCount;
        });
      });
  }

  goToPage(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.loadStats();
    }
  }

  setLeague(league: 'farm' | 'pro') {
    this.currentPage = 1;
    this.selectedLeague = league;
    this.loadStats();
  }

  onRowsPerPageUpdated() {
    this.currentPage = 1;
    this.loadStats();
  }
}
