import { GridDataSource } from '../grid/models/gridDataSource';
import { PlayersService } from '../../services/playersService';
import { SkaterParams } from '../../models/players/skaterParams';

export class PlayerStatsService implements GridDataSource {
  static serviceName = 'playerStatsService';

  rowsPerPage: number;
  totalResults: number;
  currentPage: number;
  currentSort: string;

  rows: {}[] = null;

  selectedLeague: 'farm' | 'pro' = 'pro';

  constructor(private playersService: PlayersService) {

  }

  loadData(): Promise<void> {
    const params: SkaterParams = {
      limit: this.rowsPerPage,
      hasTeam: 'true',
      hasPlayedMinimumGames: 'true',
      league: this.selectedLeague,
      sort: this.currentSort,
      skip: (this.currentPage - 1) * this.rowsPerPage
    };

    return this.playersService.getSkaterStats(params)
      .then((response) => {
        this.rows = response.rows;
        this.totalResults = response.totalCount;
      });
  }
}
