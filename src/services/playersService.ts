import * as angular from 'angular';
import { Routes } from '../models/routes';
import { Config } from '../models/config';
import { SkaterStats } from '../models/players/skaterStats';
import { SkaterParams } from '../models/players/skaterParams';

export class PlayersService {
  static moduleName = 'PlayersService';
  static serviceName = 'playersService';

  constructor(private $http: ng.IHttpService, private config: Config) {

  }

  getSkaterStats(params?: SkaterParams): Promise<{ totalCount: number, rows: SkaterStats[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get(this.config.apiUrl + Routes.skaterStats,
        { params: params })
        .then((response) => {
          resolve({
            totalCount: response.headers('X-Total-Count') || 0,
            rows: response.data
          });
        }, (error) => reject);
    });
  }
}

angular.module(PlayersService.moduleName, [])
  .service(PlayersService.serviceName, PlayersService);
