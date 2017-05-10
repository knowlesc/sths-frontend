import { GridDataSource } from '../../components/grid/models/gridDataSource';
import { PlayerService } from '../../services/playerService';
import { GoalieStatsParams } from '../../models/players/goalieStatsParams';

export class GoalieStatsGridService implements GridDataSource {
  static serviceName = 'goalieStatsGridService';

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
    const params: GoalieStatsParams = {
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

    return this.playerService.getGoalieStats(params)
      .then((response) => {
        this.rows = response.rows;
        this.totalResults = response.totalCount;
      });
  }
}
