import { GridDataSource } from '../../components/grid/models/gridDataSource';
import { TeamService } from '../../services/teamService';
import { TeamStatsParams } from '../../models/teams/teamStatsParams';

export class TeamStatsGridService implements GridDataSource {
  static serviceName = 'teamStatsGridService';

  rowsPerPage: number;
  totalResults: number;
  currentPage: number;
  currentSort: string;
  fields: string;

  rows: {}[] = null;

  selectedLeague: 'farm' | 'pro' = 'pro';
  selectedTeam: number;

  constructor(private teamService: TeamService) {

  }

  loadData(): Promise<void> {
    const params: TeamStatsParams = {
      limit: this.rowsPerPage,
      league: this.selectedLeague,
      team: this.selectedTeam,
      sort: this.currentSort,
      skip: ((this.currentPage || 1) - 1) * (this.rowsPerPage || 0)
    };

    return this.teamService.getTeamStats(params)
      .then((response) => {
        this.rows = response.rows;
        this.totalResults = response.totalCount;
      });
  }
}
