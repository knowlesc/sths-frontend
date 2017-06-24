import { GridDataSource } from '../../components/grid/models/gridDataSource';
import { ScheduleService } from '../../services/scheduleService';
import { ScheduleParams } from '../../models/schedule/scheduleParams';

export class ScheduleGridService implements GridDataSource {
  static serviceName = 'scheduleGridService';

  rowsPerPage: number;
  totalResults: number;
  currentPage: number;
  currentSort: string;
  fields: string;

  rows: {}[] = null;

  selectedLeague: 'farm' | 'pro' = 'pro';
  selectedTeam: number;
  nextSimOnly: boolean;

  static $inject = ['scheduleService'];
  constructor(private scheduleService: ScheduleService) {

  }

  loadData(): Promise<void> {
    const params: ScheduleParams = {
      limit: this.rowsPerPage || 20,
      skip: ((this.currentPage || 1) - 1) * (this.rowsPerPage || 0),
      team: this.selectedTeam,
      league: this.selectedLeague,
      nextSimOnly: this.nextSimOnly ? 'true' : 'false'
    };

    return this.scheduleService.getSchedule(params)
      .then((response) => {
        this.rows = response.rows;
        this.totalResults = response.totalCount;
      });
  }
}
