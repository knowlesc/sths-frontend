import { Routes } from '../models/routes';
import { Config } from '../models/config';
import { SkaterStats } from '../models/players/skaterStats';
import { SkaterInfo } from '../models/players/skaterInfo';
import { SkaterInfoParams } from '../models/players/skaterInfoParams';

export class PlayerService {
  static moduleName = 'PlayerService';
  static serviceName = 'playerService';

  constructor(private $http: ng.IHttpService, private config: Config) {

  }

  getSkaterInfo(params?: SkaterInfoParams): Promise<{ totalCount: number, rows: SkaterInfo[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get(this.config.apiUrl + Routes.skaterInfo,
        { params: params })
        .then((response) => {
          resolve({
            totalCount: response.headers('X-Total-Count') || 0,
            rows: response.data
          });
        }, (error) => reject);
    });
  }

  getSkaterStats(params?: SkaterInfoParams): Promise<{ totalCount: number, rows: SkaterStats[] }> {
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
