import { LeagueLogParams } from '../models/league/leagueLogParams';
import { Config } from '../models/config';
import { Routes } from '../models/routes';
import { LeagueInfo } from '../models/league/leagueInfo';

export class LeagueService {
  static serviceName = 'leagueService';

  static $inject = ['$http', 'config'];
  constructor(private $http: ng.IHttpService, private config: Config) {

  }

  getNews(): Promise<{}> {
    return new Promise((resolve, reject) => {
      this.$http.get(this.config.apiUrl + Routes.news)
        .then((response) => {
          resolve(response.data);
        }, (error) => {
          reject(error);
        });
    });
  }

  getPicOfTheDay(): Promise<{ imgUrl: string; caption: string }> {
    return new Promise((resolve, reject) => {
      this.$http.get<{ imgUrl: string; caption: string }>('/picoftheday.json')
        .then((response) => {
          resolve(response.data);
        }, (error) => {
          reject(error);
        });
    });
  }

  getLeagueLog(params?: LeagueLogParams): Promise<{ totalCount: number, rows: {}[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get<{}[]>(this.config.apiUrl + Routes.leagueLog,
        { params: params })
        .then((response) => {
          resolve({
            totalCount: parseInt(response.headers('X-Total-Count')) || 0,
            rows: response.data
          });
        }, (error) => {
          reject(error);
        });
    });
  }

  getLeagueInfo(): Promise<LeagueInfo> {
    return new Promise((resolve, reject) => {
      this.$http.get<LeagueInfo>(this.config.apiUrl + Routes.leagueInfo)
        .then((response) => {
          resolve(response.data);
        }, (error) => {
          reject(error);
        });
    });
  }
}
