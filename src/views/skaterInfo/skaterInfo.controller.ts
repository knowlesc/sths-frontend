import { SkaterInfo } from '../../models/players/skaterInfo';

export class SkaterInfoController {
  page = 'PlayerInfo';

  static $inject = ['$location', 'skaterInfo'];
  constructor(private $location: ng.ILocationService, private skaterInfo: SkaterInfo) {
    const search = this.$location.search();
    if (search.page) {
      this.page = search.page;
    }
  }

  changePage(page: string) {
    this.page = page;
    this.$location.search({
      page: page
    });
  }
}
