import { TeamLinesParams } from './../models/teams/teamLinesParams';
import { TeamLines } from './../models/teams/teamLines';
import { Config } from '../models/config';
import { Routes } from '../models/routes';
import { TeamInfo } from '../models/teams/teamInfo';
import { TeamListParams } from '../models/teams/teamListParams';
import { TeamStatsParams } from '../models/teams/teamStatsParams';
import { TeamStats } from '../models/teams/teamStats';
import { TeamFinances } from '../models/teams/teamFinances';

export class TeamService {
  static serviceName = 'teamService';

  static $inject = ['$http', 'config'];
  constructor(private $http: ng.IHttpService, private config: Config) {

  }

  getTeamList(params: TeamListParams): Promise<TeamInfo[]> {
    return new Promise((resolve, reject) => {
      this.$http.get<TeamInfo[]>(this.config.apiUrl + Routes.teamList,
        { params: params })
        .then((response) => {
          resolve(response.data);
        }, (error) => {
          reject(error);
        });
    });
  }

  getTeamInfo(params: TeamListParams): Promise<TeamInfo> {
    return new Promise((resolve, reject) => {
      this.$http.get<TeamInfo>(`${this.config.apiUrl}${Routes.teamList}/${params.league}/${params.id}`)
        .then((response) => {
          resolve(response.data);
        }, (error) => {
          reject(error);
        });
    });
  }

  getTeamFinances(params: TeamListParams): Promise<TeamFinances> {
    return new Promise((resolve, reject) => {
      this.$http.get<TeamFinances>(`${this.config.apiUrl}${Routes.teamList}/${params.league}/${params.id}/finances`)
        .then((response) => {
          resolve(response.data);
        }, (error) => {
          reject(error);
        });
    });
  }

  getTeamStats(params?: TeamStatsParams): Promise<{ totalCount: number, rows: TeamStats[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get<TeamStats[]>(this.config.apiUrl + Routes.teamStats,
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

  getTeamLines(params?: TeamLinesParams): Promise<TeamLines> {
    return new Promise((resolve, reject) => {
      this.$http.get<TeamLines>(`${this.config.apiUrl}${Routes.teamList}/${params.league}/${params.id}/lines`)
      .then((response) => {
        resolve(response.data);
      }, (error) => {
        reject(error);
      });
    });
  }
}
