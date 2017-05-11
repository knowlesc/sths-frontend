import { Routes } from '../models/routes';
import { Config } from '../models/config';
import { ScheduleParams } from '../models/schedule/scheduleParams';

export class ScheduleService {
  static serviceName = 'scheduleService';

  constructor(private $http: ng.IHttpService, private config: Config) {

  }

  getSchedule(params?: ScheduleParams): Promise<{ totalCount: number, rows: ScheduleParams[] }> {
    return new Promise((resolve, reject) => {
      this.$http.get(this.config.apiUrl + Routes.schedule,
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
