import { GridDataSource } from '../../components/grid/models/gridDataSource';
import { PlayerService } from '../../services/playerService';
import { SkaterStatsParams } from '../../models/players/skaterStatsParams';

export class PlayerStatsGridService implements GridDataSource {
  static serviceName = 'playerStatsGridService';

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
      league: this.selectedLeague,
      sort: this.currentSort,
      hasTeam: 'true',
      skip: ((this.currentPage || 1) - 1) * (this.rowsPerPage || 0)
    };

    // If a team is selected, we want a list of all players for that specific team
    if (this.selectedTeam !== null && !isNaN(this.selectedTeam)) {
      params.team = this.selectedTeam;
    } else {
      params.hasPlayedMinimumGames = 'true';
    }

    return this.playerService.getSkaterStats(params)
      .then((response) => {
        this.rows = response.rows;
        this.totalResults = response.totalCount;
      });
  }
}
