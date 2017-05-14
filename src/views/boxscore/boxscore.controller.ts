export class BoxscoreController {

  boxscoreUrl: string;
  fail = true;

  constructor($routeParams: ng.route.IRouteParamsService) {
    if ($routeParams['id'] && /^\w+-\d+\.html$/.test($routeParams['id'])) {
      this.boxscoreUrl = `/boxscores/${$routeParams['id']}`;
      this.fail = false;
    }
  }
}
