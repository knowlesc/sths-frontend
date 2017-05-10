import { GridDataSource } from '../../components/grid/models/gridDataSource';
import { PlayerService } from '../../services/playerService';
import { SkaterInfoParams } from '../../models/players/skaterInfoParams';

export class SkaterRatingsGridService implements GridDataSource {
  static serviceName = 'skaterRatingsGridService';

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
    const params: SkaterInfoParams = {
      limit: this.rowsPerPage,
      hasTeam: 'true',
      hasPlayedMinimumGames: 'true',
      league: this.selectedLeague,
      team: this.selectedTeam,
      sort: this.currentSort,
      skip: ((this.currentPage || 1) - 1) * (this.rowsPerPage || 0)
    };

    return this.playerService.getSkaterInfo(params)
      .then((response) => {
        this.rows = response.rows;
        this.totalResults = response.totalCount;
      });
  }
}
