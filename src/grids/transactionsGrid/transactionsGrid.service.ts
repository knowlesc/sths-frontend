import { GridDataSource } from '../../components/grid/models/gridDataSource';
import { LeagueService } from '../../services/leagueService';
import { LeagueLogParams } from '../../models/league/leagueLogParams';

export class TransactionsGridService implements GridDataSource {
  static serviceName = 'transactionsGridService';

  rowsPerPage: number;
  totalResults: number;
  currentPage: number;
  currentSort: string;
  fields: string;

  rows: {}[] = null;

  types: number[];

  static $inject = ['leagueService'];
  constructor(private leagueService: LeagueService) {

  }

  loadData(): Promise<void> {
    const params: LeagueLogParams = {
      limit: this.rowsPerPage || 20,
      skip: ((this.currentPage || 1) - 1) * (this.rowsPerPage || 0),
      type: this.types && this.types.length > 0 ? this.types.join(',') : undefined
    };

    return this.leagueService.getLeagueLog(params)
      .then((response) => {
        this.rows = response.rows;
        this.totalResults = response.totalCount;
      });
  }
}
