import { PlayerService } from '../../services/playerService';

export class SearchController {
  results: {}[] = [];
  loading = true;
  loadingFailed = false;
  currentPage = 0;
  rowsPerPage = 20;
  resultsCount = 20;
  searchTerm: string;

  static $inject = ['$timeout', '$location', 'playerService'];
  constructor(private $timeout: ng.ITimeoutService,
    private $location: ng.ILocationService,
    private playerService: PlayerService) {
    if ($location.search().q) {
      this.searchTerm = $location.search().q;
      this.searchTerm = this.searchTerm.replace(/[^a-zA-Z-]/g, '');
    }

    this.loadMore();
  }

  loadMore() {
    if (this.searchTerm) {
      this.loading = true;
      this.currentPage++;

      this.playerService.getPlayersByName({
        name: this.searchTerm,
        skip: (this.currentPage - 1) * this.rowsPerPage,
        limit: this.rowsPerPage
      })
        .then((results) => {
          this.$timeout(() => {
            this.loading = false;
            this.results = this.results.concat(results.rows);
            this.resultsCount = results.totalCount;
          });
        })
        .catch((error) => {
          this.$timeout(() => {
            this.loading = false;
            this.loadingFailed = true;
          });
        });
    } else {
      this.loading = false;
    }
  }
}
