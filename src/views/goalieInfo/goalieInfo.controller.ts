import { GoalieInfo } from '../../models/players/goalieInfo';

export class GoalieInfoController {
  page = 'GoalieInfo';

  static $inject = ['$location', 'goalieInfo'];
  constructor(private $location: ng.ILocationService, private goalieInfo: GoalieInfo) {
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
