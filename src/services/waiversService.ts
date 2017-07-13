import { Config } from '../models/config';
import { Routes } from '../models/routes';
import { WaiversParams } from '../models/waivers/waiversParams';
import { WaiverInfo } from '../models/waivers/waiverInfo';
import { WaiversOrderTeam } from '../models/waivers/waiversOrderTeam';

export class WaiversService {
  static serviceName = 'waiversService';

  static $inject = ['$http', 'config'];
  constructor(private $http: ng.IHttpService, private config: Config) {

  }

  getWaiversList(params: WaiversParams): Promise<{ totalCount: number, rows: WaiverInfo[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get<WaiverInfo[]>(this.config.apiUrl + Routes.waiversList,
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

  getWaiversOrder(): Promise<WaiversOrderTeam[]> {
    return new Promise((resolve, reject) => {
      this.$http.get<WaiversOrderTeam[]>(this.config.apiUrl + Routes.waiversOrder)
        .then((response) => {
          resolve(response.data);
        }, (error) => {
          reject(error);
        });
    });
  }
}
