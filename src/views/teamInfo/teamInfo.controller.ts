import { TeamInfo } from '../../models/teams/teamInfo';
import { GridOptions } from '../../components/grid/models/gridOptions';
import { PlayerStatsGridService } from '../../grids/playerStatsGrid/playerStatsGrid.service';
import { playerStatsGridColumns } from '../../grids/playerStatsGrid/playerStatsGrid.columns';
import { RosterGridService } from '../../grids/rosterGrid/rosterGrid.service';
import { rosterGridColumns } from '../../grids/rosterGrid/rosterGrid.columns';

export class TeamInfoController {
  rosterGridOptions: GridOptions;
  statsGridOptions: GridOptions;
  page = 'Roster';

  constructor(private teamInfo: TeamInfo,
    private league: 'farm' | 'pro',
    private rosterGridService: RosterGridService,
    private playerStatsGridService: PlayerStatsGridService) {
    this.rosterGridService.selectedTeam = this.teamInfo.UniqueID;
    this.rosterGridService.selectedLeague = league;
    this.rosterGridOptions = new GridOptions();
    this.rosterGridOptions.dataSource = this.rosterGridService;
    this.rosterGridOptions.columns = rosterGridColumns;
    this.rosterGridOptions.columns.splice(1, 1); // Remove team column

    this.playerStatsGridService.selectedTeam = this.teamInfo.UniqueID;
    this.playerStatsGridService.selectedLeague = league;
    this.statsGridOptions = new GridOptions();
    this.statsGridOptions.dataSource = this.playerStatsGridService;
    this.statsGridOptions.columns = playerStatsGridColumns;
    this.statsGridOptions.columns.splice(1, 1);
  }
}
