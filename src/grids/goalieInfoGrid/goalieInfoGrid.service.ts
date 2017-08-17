import { GridDataSource } from '../../components/grid/models/gridDataSource';
import { PlayerService } from '../../services/playerService';
import { GoalieInfoParams } from '../../models/players/goalieInfoParams';

export class GoalieInfoGridService implements GridDataSource {
  static serviceName = 'goalieInfoGridService';

  rowsPerPage: number;
  totalResults: number;
  currentPage: number;
  currentSort: string;
  fields: string;

  rows: {}[] = null;

  selectedLeague: 'farm' | 'pro' = 'pro';
  selectedTeam: number;

  static $inject = ['playerService'];
  constructor(private playerService: PlayerService) {

  }

  loadData(): Promise<void> {
    const params: GoalieInfoParams = {
      limit: this.rowsPerPage,
      league: this.selectedLeague,
      sort: this.currentSort,
      hasTeam: 'true',
      skip: ((this.currentPage || 1) - 1) * (this.rowsPerPage || 0),
      fields: 'UniqueID,' + this.fields
    };

    // If a team is selected, we want a list of all players for that specific team
    if (this.selectedTeam !== null && !isNaN(this.selectedTeam)) {
      params.team = this.selectedTeam;
    }

    return this.playerService.getGoalieInfo(params)
      .then((response) => {
        this.rows = response.rows;
        this.totalResults = response.totalCount;
      });
  }
}
