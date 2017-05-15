import { Config } from '../models/config';
import { Routes } from '../models/routes';
import { TeamInfo } from '../models/teams/teamInfo';
import { TeamListParams } from '../models/teams/teamListParams';
import { TeamStatsParams } from '../models/teams/teamStatsParams';

export class TeamService {
  static serviceName = 'teamService';

  constructor(private $http: ng.IHttpService, private config: Config) {

  }

  getTeamList(params: TeamListParams): Promise<TeamInfo[]> {
    return new Promise((resolve, reject) => {
      this.$http.get(this.config.apiUrl + Routes.teamList,
        { params: params })
        .then((response) => {
          resolve(response.data);
        }, (error) => reject);
    });
  }

  getTeamInfo(params: TeamListParams): Promise<TeamInfo> {
    return new Promise((resolve, reject) => {
      this.$http.get(`${this.config.apiUrl}${Routes.teamList}/${params.league}/${params.id}`)
        .then((response) => {
          resolve(response.data);
        }, (error) => reject);
    });
  }

  getTeamStats(params?: TeamStatsParams): Promise<{ totalCount: number, rows: {}[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get(this.config.apiUrl + Routes.teamStats,
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
