import { GridDataSource } from '../../components/grid/models/gridDataSource';
import { PlayerService } from '../../services/playerService';
import { CoachParams } from '../../models/players/coachParams';

export class CoachRatingsGridService implements GridDataSource {
  static serviceName = 'coachRatingsGridService';

  rowsPerPage: number;
  totalResults: number;
  currentPage: number;
  currentSort: string;
  fields: string;

  rows: {}[] = null;

  static $inject = ['playerService'];
  constructor(private playerService: PlayerService) {

  }

  loadData(): Promise<void> {
    const params: CoachParams = {
      limit: this.rowsPerPage,
      skip: ((this.currentPage || 1) - 1) * (this.rowsPerPage || 0),
      sort: this.currentSort
    };

    return this.playerService.getCoaches(params)
      .then((response) => {
        this.rows = response.rows;
        this.totalResults = response.totalCount;
      });
  }
}
