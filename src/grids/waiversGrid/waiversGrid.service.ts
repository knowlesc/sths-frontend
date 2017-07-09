import { GridDataSource } from '../../components/grid/models/gridDataSource';
import { WaiversService } from '../../services/waiversService';
import { WaiversParams } from '../../models/waivers/waiversParams';

export class WaiversGridService implements GridDataSource {
  static serviceName = 'waiversGridService';

  rowsPerPage: number;
  totalResults: number;
  currentPage: number;
  currentSort: string;
  fields: string;

  rows: {}[] = null;

  static $inject = ['waiversService'];
  constructor(private waiversService: WaiversService) {

  }

  loadData(): Promise<void> {
    const params: WaiversParams = {
      limit: this.rowsPerPage || 20,
      skip: ((this.currentPage || 1) - 1) * (this.rowsPerPage || 0)
    };

    return this.waiversService.getWaiversList(params)
      .then((response) => {
        this.rows = response.rows;
        this.totalResults = response.totalCount;
      });
  }
}
