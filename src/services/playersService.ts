import * as angular from 'angular';
import { Routes } from '../models/routes';
import { Config } from '../models/config';

export class PlayersService {
  static moduleName = 'PlayersService';
  static serviceName = 'playersService';

  constructor(private $http: ng.IHttpService, private config: Config) {

  }

  getSkaterStats(): Promise<{}[]> {
    return new Promise((resolve, reject) => {
      this.$http.get(this.config.apiUrl + Routes.skaterStats)
        .then((response) => {
          resolve(response.data);
        }, (error) => reject);
    });
  }
}

angular.module(PlayersService.moduleName, [])
  .service(PlayersService.serviceName, PlayersService);
