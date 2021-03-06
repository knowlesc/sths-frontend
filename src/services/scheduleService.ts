import { Routes } from '../models/routes';
import { Config } from '../models/config';
import { ScheduleParams } from '../models/schedule/scheduleParams';
import { GameInfo } from '../models/schedule/gameInfo';

export class ScheduleService {
  static serviceName = 'scheduleService';

  static $inject = ['$http', 'config'];
  constructor(private $http: ng.IHttpService, private config: Config) {

  }

  getSchedule(params?: ScheduleParams): Promise<{ totalCount: number, rows: GameInfo[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get<GameInfo[]>(this.config.apiUrl + Routes.schedule,
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
