export class BoxscoreController {

  boxscoreUrl: string;
  fail = true;

  static $inject = ['$routeParams'];
  constructor($routeParams: ng.route.IRouteParamsService) {
    if ($routeParams['id'] && /^\w+-\d+\.html$/.test($routeParams['id'])) {
      this.boxscoreUrl = `/boxscores/${$routeParams['id']}`;
      this.fail = false;
    }
  }
}
