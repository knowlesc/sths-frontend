import { TeamInfo } from '../../models/teams/teamInfo';
import { GridOptions } from '../../components/grid/models/gridOptions';
import { GoalieRatingsGridService } from '../../grids/goalieRatingsGrid/goalieRatingsGrid.service';
import { goalieRatingsGridColumns } from '../../grids/goalieRatingsGrid/goalieRatingsGrid.columns';
import { GoalieStatsGridService } from '../../grids/goalieStatsGrid/goalieStatsGrid.service';
import { goalieStatsGridColumns } from '../../grids/goalieStatsGrid/goalieStatsGrid.columns';
import { SkaterStatsGridService } from '../../grids/skaterStatsGrid/skaterStatsGrid.service';
import { skaterStatsGridColumns } from '../../grids/skaterStatsGrid/skaterStatsGrid.columns';
import { SkaterRatingsGridService } from '../../grids/skaterRatingsGrid/skaterRatingsGrid.service';
import { skaterRatingsGridColumns } from '../../grids/skaterRatingsGrid/skaterRatingsGrid.columns';

export class TeamInfoController {
  skaterRatingsGridOptions: GridOptions;
  skaterStatsGridOptions: GridOptions;
  goalieRatingsGridOptions: GridOptions;
  goalieStatsGridOptions: GridOptions;
  page = 'Roster';

  constructor(private teamInfo: TeamInfo,
    private league: 'farm' | 'pro',
    private skaterRatingsGridService: SkaterRatingsGridService,
    private goalieRatingsGridService: GoalieRatingsGridService,
    private skaterStatsGridService: SkaterStatsGridService,
    private goalieStatsGridService: GoalieStatsGridService) {
    this.skaterRatingsGridService.selectedTeam = this.teamInfo.UniqueID;
    this.skaterRatingsGridService.selectedLeague = league;
    this.skaterRatingsGridOptions = new GridOptions();
    this.skaterRatingsGridOptions.dataSource = this.skaterRatingsGridService;
    this.skaterRatingsGridOptions.columns = skaterRatingsGridColumns;
    this.skaterRatingsGridOptions.columns.splice(1, 1); // Remove team column

    this.goalieRatingsGridService.selectedTeam = this.teamInfo.UniqueID;
    this.goalieRatingsGridService.selectedLeague = league;
    this.goalieRatingsGridOptions = new GridOptions();
    this.goalieRatingsGridOptions.dataSource = this.goalieRatingsGridService;
    this.goalieRatingsGridOptions.columns = goalieRatingsGridColumns;
    this.goalieRatingsGridOptions.columns.splice(1, 1); // Remove team column

    this.skaterStatsGridService.selectedTeam = this.teamInfo.UniqueID;
    this.skaterStatsGridService.selectedLeague = league;
    this.skaterStatsGridOptions = new GridOptions();
    this.skaterStatsGridOptions.dataSource = this.skaterStatsGridService;
    this.skaterStatsGridOptions.columns = skaterStatsGridColumns;
    this.skaterStatsGridOptions.columns.splice(1, 1);

    this.goalieStatsGridService.selectedTeam = this.teamInfo.UniqueID;
    this.goalieStatsGridService.selectedLeague = league;
    this.goalieStatsGridOptions = new GridOptions();
    this.goalieStatsGridOptions.dataSource = this.goalieStatsGridService;
    this.goalieStatsGridOptions.columns = goalieStatsGridColumns;
    this.goalieStatsGridOptions.columns.splice(1, 1);
  }
}
