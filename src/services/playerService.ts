import { Routes } from '../models/routes';
import { Config } from '../models/config';
import { SkaterStats } from '../models/players/skaterStats';
import { GoalieStats } from '../models/players/goalieStats';
import { GoalieInfoParams } from '../models/players/goalieInfoParams';
import { SkaterInfo } from '../models/players/skaterInfo';
import { GoalieInfo } from '../models/players/goalieInfo';
import { PlayerInjury } from '../models/players/playerInjury';
import { PlayerSuspension } from '../models/players/playerSuspension';
import { SkaterInfoParams } from '../models/players/skaterInfoParams';
import { SkaterStatsParams } from '../models/players/skaterStatsParams';
import { GoalieStatsParams } from '../models/players/goalieStatsParams';
import { PlayerSearchParams } from '../models/players/playerSearchParams';
import { CoachParams } from '../models/players/coachParams';

export class PlayerService {
  static serviceName = 'playerService';

  static $inject = ['$http', 'config'];
  constructor(private $http: ng.IHttpService, private config: Config) {

  }

  getSingleSkaterInfo(params?: SkaterInfoParams): Promise<SkaterInfo> {
    return new Promise((resolve, reject) => {
      this.$http.get<SkaterInfo>(`${this.config.apiUrl + Routes.skaterInfo}/${params.id}`,
        { params: params })
        .then((response) => {
          resolve(response.data);
        }, (error) => {
          reject(error);
        });
    });
  }

  getInjuredPlayers(): Promise<PlayerInjury[]> {
    return new Promise((resolve, reject) => {
      this.$http.get<PlayerInjury[]>(this.config.apiUrl + Routes.injuredPlayers)
        .then((response) => {
          resolve(response.data);
        }, (error) => {
          reject(error);
        });
    });
  }

  getSuspendedPlayers(): Promise<PlayerSuspension[]> {
    return new Promise((resolve, reject) => {
      this.$http.get<PlayerSuspension[]>(this.config.apiUrl + Routes.suspendedPlayers)
        .then((response) => {
          resolve(response.data);
        }, (error) => {
          reject(error);
        });
    });
  }

  getPlayersByName(params: PlayerSearchParams): Promise<{ totalCount: number, rows: {}[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get<{}[]>(this.config.apiUrl + Routes.searchPlayers,
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

  getSkaterInfo(params?: SkaterInfoParams): Promise<{ totalCount: number, rows: SkaterInfo[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get<SkaterInfo[]>(this.config.apiUrl + Routes.skaterInfo,
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

  getSkaterStats(params?: SkaterStatsParams): Promise<{ totalCount: number, rows: SkaterStats[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get<SkaterStats[]>(this.config.apiUrl + Routes.skaterStats,
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

  getSingleGoalieInfo(params?: GoalieInfoParams): Promise<GoalieInfo> {
    return new Promise((resolve, reject) => {
      this.$http.get(`${this.config.apiUrl + Routes.goalieInfo}/${params.id}`,
        { params: params })
        .then((response) => {
          resolve(response.data);
        }, (error) => {
          reject(error);
        });
    });
  }

  getGoalieInfo(params?: GoalieInfoParams): Promise<{ totalCount: number, rows: SkaterInfo[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get<SkaterInfo[]>(this.config.apiUrl + Routes.goalieInfo,
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

  getGoalieStats(params?: GoalieStatsParams): Promise<{ totalCount: number, rows: GoalieStats[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get<GoalieStats[]>(this.config.apiUrl + Routes.goalieStats,
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

  getCoaches(params?: CoachParams): Promise<{ totalCount: number, rows: {}[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get<{}[]>(this.config.apiUrl + Routes.coaches,
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
}
