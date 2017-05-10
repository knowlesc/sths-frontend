import { LeagueLogParams } from '../models/league/leagueLogParams';
import { Config } from '../models/config';
import { Routes } from '../models/routes';

export class LeagueService {
  static serviceName = 'leagueService';

  constructor(private $http: ng.IHttpService, private config: Config) {

  }

  getLeagueLog(params?: LeagueLogParams): Promise<{ totalCount: number, rows: {}[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get(this.config.apiUrl + Routes.leagueLog,
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
