import { DraftPickParams } from '../models/draft/draftPickParams';
import { DraftPick } from '../models/draft/draftPick';
import { Config } from '../models/config';
import { Routes } from '../models/routes';

export class DraftService {
  static serviceName = 'draftService';

  static $inject = ['$http', 'config'];
  constructor(private $http: ng.IHttpService, private config: Config) {

  }

  getDraftPicks(params?: DraftPickParams): Promise<DraftPick[]> {
    return new Promise((resolve, reject) => {
      this.$http.get<DraftPick[]>(this.config.apiUrl + Routes.draftPicks,
        { params: params })
        .then((response) => {
          resolve(response.data);
        }, (error) => {
          reject(error);
        });
    });
  }
}
