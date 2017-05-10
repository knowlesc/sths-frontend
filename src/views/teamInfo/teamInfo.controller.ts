import { TeamInfo } from '../../models/teams/teamInfo';
import { GridOptions } from '../../components/grid/models/gridOptions';
import { GoalieInfoGridService } from '../../grids/goalieInfoGrid/goalieInfoGrid.service';
import { goalieInfoGridColumns } from '../../grids/goalieInfoGrid/goalieInfoGrid.columns';
import { GoalieStatsGridService } from '../../grids/goalieStatsGrid/goalieStatsGrid.service';
import { goalieStatsGridColumns } from '../../grids/goalieStatsGrid/goalieStatsGrid.columns';
import { PlayerStatsGridService } from '../../grids/playerStatsGrid/playerStatsGrid.service';
import { playerStatsGridColumns } from '../../grids/playerStatsGrid/playerStatsGrid.columns';
import { RosterGridService } from '../../grids/rosterGrid/rosterGrid.service';
import { rosterGridColumns } from '../../grids/rosterGrid/rosterGrid.columns';

export class TeamInfoController {
  skaterRosterGridOptions: GridOptions;
  playerStatsGridOptions: GridOptions;
  goalieRosterGridOptions: GridOptions;
  goalieStatsGridOptions: GridOptions;
  page = 'Roster';

  constructor(private teamInfo: TeamInfo,
    private league: 'farm' | 'pro',
    private rosterGridService: RosterGridService,
    private goalieInfoGridService: GoalieInfoGridService,
    private goalieStatsGridService: GoalieStatsGridService,
    private playerStatsGridService: PlayerStatsGridService) {
    this.rosterGridService.selectedTeam = this.teamInfo.UniqueID;
    this.rosterGridService.selectedLeague = league;
    this.skaterRosterGridOptions = new GridOptions();
    this.skaterRosterGridOptions.dataSource = this.rosterGridService;
    this.skaterRosterGridOptions.columns = rosterGridColumns;
    this.skaterRosterGridOptions.columns.splice(1, 1); // Remove team column

    this.goalieInfoGridService.selectedTeam = this.teamInfo.UniqueID;
    this.goalieInfoGridService.selectedLeague = league;
    this.goalieRosterGridOptions = new GridOptions();
    this.goalieRosterGridOptions.dataSource = this.goalieInfoGridService;
    this.goalieRosterGridOptions.columns = goalieInfoGridColumns;
    this.goalieRosterGridOptions.columns.splice(1, 1); // Remove team column

    this.playerStatsGridService.selectedTeam = this.teamInfo.UniqueID;
    this.playerStatsGridService.selectedLeague = league;
    this.playerStatsGridOptions = new GridOptions();
    this.playerStatsGridOptions.dataSource = this.playerStatsGridService;
    this.playerStatsGridOptions.columns = playerStatsGridColumns;
    this.playerStatsGridOptions.columns.splice(1, 1);

    this.goalieStatsGridService.selectedTeam = this.teamInfo.UniqueID;
    this.goalieStatsGridService.selectedLeague = league;
    this.goalieStatsGridOptions = new GridOptions();
    this.goalieStatsGridOptions.dataSource = this.goalieStatsGridService;
    this.goalieStatsGridOptions.columns = goalieStatsGridColumns;
    this.goalieStatsGridOptions.columns.splice(1, 1);
  }
}
