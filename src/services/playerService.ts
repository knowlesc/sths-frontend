import { Routes } from '../models/routes';
import { Config } from '../models/config';
import { SkaterStats } from '../models/players/skaterStats';
import { GoalieStats } from '../models/players/goalieStats';
import { GoalieInfoParams } from '../models/players/goalieInfoParams';
import { SkaterInfo } from '../models/players/skaterInfo';
import { SkaterInfoParams } from '../models/players/skaterInfoParams';
import { SkaterStatsParams } from '../models/players/skaterStatsParams';
import { GoalieStatsParams } from '../models/players/goalieStatsParams';

export class PlayerService {
  static serviceName = 'playerService';

  static $inject = ['$http', 'config'];
  constructor(private $http: ng.IHttpService, private config: Config) {

  }

  getSingleSkaterInfo(params?: SkaterInfoParams): Promise<SkaterInfo[]> {
    return new Promise((resolve, reject) => {
      this.$http.get(`${this.config.apiUrl + Routes.skaterInfo}/${params.id}`,
        { params: params })
        .then((response) => {
          resolve(response.data);
        }, (error) => reject);
    });
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

  getSkaterStats(params?: SkaterStatsParams): Promise<{ totalCount: number, rows: SkaterStats[] }> {
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

  getGoalieInfo(params?: GoalieInfoParams): Promise<{ totalCount: number, rows: SkaterInfo[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get(this.config.apiUrl + Routes.goalieInfo,
        { params: params })
        .then((response) => {
          resolve({
            totalCount: response.headers('X-Total-Count') || 0,
            rows: response.data
          });
        }, (error) => reject);
    });
  }

  getGoalieStats(params?: GoalieStatsParams): Promise<{ totalCount: number, rows: GoalieStats[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get(this.config.apiUrl + Routes.goalieStats,
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
