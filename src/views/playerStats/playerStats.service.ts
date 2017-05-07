import { GridDataSource } from '../../components/grid/models/gridDataSource';
import { PlayerService } from '../../services/playerService';
import { SkaterStatsParams } from '../../models/players/skaterStatsParams';

export class PlayerStatsService implements GridDataSource {
  static serviceName = 'playerStatsService';

  rowsPerPage: number;
  totalResults: number;
  currentPage: number;
  currentSort: string;

  rows: {}[] = null;

  selectedLeague: 'farm' | 'pro' = 'pro';
  selectedTeam: number;

  constructor(private playerService: PlayerService) {

  }

  loadData(): Promise<void> {
    const params: SkaterStatsParams = {
      limit: this.rowsPerPage,
      hasTeam: 'true',
      hasPlayedMinimumGames: 'true',
      league: this.selectedLeague,
      team: this.selectedTeam,
      sort: this.currentSort,
      skip: (this.currentPage - 1) * this.rowsPerPage
    };

    return this.playerService.getSkaterStats(params)
      .then((response) => {
        this.rows = response.rows;
        this.totalResults = response.totalCount;
      });
  }
}
