import { Config } from '../../models/config';

export class BoxscoreController {

  boxscoreUrl: string;
  fail = true;

  static $inject = ['$routeParams', 'config'];
  constructor($routeParams: ng.route.IRouteParamsService, config: Config) {
    if ($routeParams['id'] && /^\w+((-Farm-)|(-Exh)|(-))\d+\.html$/.test($routeParams['id'])) {
      this.boxscoreUrl = `${config.boxscorePath}${$routeParams['id']}`;
      this.fail = false;
    }
  }
}
