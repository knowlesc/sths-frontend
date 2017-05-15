import { TeamInfo } from '../../models/teams/teamInfo';
import { GridOptions } from '../../components/grid/models/gridOptions';
import { GoalieInfoGridService } from '../../grids/goalieInfoGrid/goalieInfoGrid.service';
import { goalieRatingsGridColumns } from '../../grids/goalieRatingsGrid/goalieRatingsGrid.columns';
import { GoalieRatingsGridService } from '../../grids/goalieRatingsGrid/goalieRatingsGrid.service';
import { goalieInfoGridColumns } from '../../grids/goalieInfoGrid/goalieInfoGrid.columns';
import { GoalieStatsGridService } from '../../grids/goalieStatsGrid/goalieStatsGrid.service';
import { goalieStatsGridColumns } from '../../grids/goalieStatsGrid/goalieStatsGrid.columns';
import { TeamStatsGridService } from '../../grids/teamStatsGrid/teamStatsGrid.service';
import { teamStatsGridColumns } from '../../grids/teamStatsGrid/teamStatsGrid.columns';
import { SkaterStatsGridService } from '../../grids/skaterStatsGrid/skaterStatsGrid.service';
import { skaterStatsGridColumns } from '../../grids/skaterStatsGrid/skaterStatsGrid.columns';
import { SkaterInfoGridService } from '../../grids/skaterInfoGrid/skaterInfoGrid.service';
import { skaterRatingsGridColumns } from '../../grids/skaterRatingsGrid/skaterRatingsGrid.columns';
import { SkaterRatingsGridService } from '../../grids/skaterRatingsGrid/skaterRatingsGrid.service';
import { skaterInfoGridColumns } from '../../grids/skaterInfoGrid/skaterInfoGrid.columns';

export class TeamInfoController {
  skaterRatingsGridOptions: GridOptions;
  skaterStatsGridOptions: GridOptions;
  skaterInfoGridOptions: GridOptions;
  goalieInfoGridOptions: GridOptions;
  goalieRatingsGridOptions: GridOptions;
  goalieStatsGridOptions: GridOptions;
  teamStatsGridOptions: GridOptions;
  page = 'Roster';

  constructor(private teamInfo: TeamInfo,
    private league: 'farm' | 'pro',
    private skaterInfoGridService: SkaterInfoGridService,
    private goalieInfoGridService: GoalieInfoGridService,
    private goalieRatingsGridService: GoalieRatingsGridService,
    private skaterRatingsGridService: SkaterRatingsGridService,
    private skaterStatsGridService: SkaterStatsGridService,
    private goalieStatsGridService: GoalieStatsGridService,
    private teamStatsGridService: TeamStatsGridService) {

    this.skaterInfoGridService.selectedTeam = this.teamInfo.UniqueID;
    this.skaterStatsGridService.selectedTeam = this.teamInfo.UniqueID;
    this.skaterRatingsGridService.selectedTeam = this.teamInfo.UniqueID;
    this.goalieInfoGridService.selectedTeam = this.teamInfo.UniqueID;
    this.goalieStatsGridService.selectedTeam = this.teamInfo.UniqueID;
    this.goalieRatingsGridService.selectedTeam = this.teamInfo.UniqueID;
    this.teamStatsGridService.selectedTeam = this.teamInfo.UniqueID;

    this.skaterInfoGridService.selectedLeague = league;
    this.skaterStatsGridService.selectedLeague = league;
    this.skaterRatingsGridService.selectedLeague = league;
    this.goalieInfoGridService.selectedLeague = league;
    this.goalieStatsGridService.selectedLeague = league;
    this.goalieRatingsGridService.selectedLeague = league;

    this.skaterRatingsGridOptions = new GridOptions();
    this.skaterRatingsGridOptions.dataSource = this.skaterRatingsGridService;
    this.skaterRatingsGridOptions.columns = skaterRatingsGridColumns.slice();
    this.skaterRatingsGridOptions.columns.splice(1, 1); // Remove team column
    this.skaterRatingsGridOptions.defaultSortField = 'Overall';

    this.skaterInfoGridOptions = new GridOptions();
    this.skaterInfoGridOptions.dataSource = this.skaterInfoGridService;
    this.skaterInfoGridOptions.columns = skaterInfoGridColumns.slice();
    this.skaterInfoGridOptions.columns.splice(1, 1);
    this.skaterInfoGridOptions.defaultSortField = 'Overall';

    this.goalieRatingsGridOptions = new GridOptions();
    this.goalieRatingsGridOptions.dataSource = this.goalieRatingsGridService;
    this.goalieRatingsGridOptions.columns = goalieRatingsGridColumns.slice();
    this.goalieRatingsGridOptions.columns.splice(1, 1);
    this.goalieRatingsGridOptions.defaultSortField = 'Overall';

    this.goalieInfoGridOptions = new GridOptions();
    this.goalieInfoGridOptions.dataSource = this.goalieInfoGridService;
    this.goalieInfoGridOptions.columns = goalieInfoGridColumns.slice();
    this.goalieInfoGridOptions.columns.splice(1, 1);
    this.goalieInfoGridOptions.defaultSortField = 'Salary1';

    this.skaterInfoGridOptions = new GridOptions();
    this.skaterInfoGridOptions.dataSource = this.skaterInfoGridService;
    this.skaterInfoGridOptions.columns = skaterInfoGridColumns.slice();
    this.skaterInfoGridOptions.columns.splice(1, 1);
    this.skaterInfoGridOptions.defaultSortField = 'Salary1';

    this.skaterStatsGridOptions = new GridOptions();
    this.skaterStatsGridOptions.dataSource = this.skaterStatsGridService;
    this.skaterStatsGridOptions.columns = skaterStatsGridColumns.slice();
    this.skaterStatsGridOptions.columns.splice(1, 1);
    this.skaterStatsGridOptions.defaultSortField = 'P';

    this.goalieStatsGridOptions = new GridOptions();
    this.goalieStatsGridOptions.dataSource = this.goalieStatsGridService;
    this.goalieStatsGridOptions.columns = goalieStatsGridColumns.slice();
    this.goalieStatsGridOptions.columns.splice(1, 1);
    this.goalieStatsGridOptions.defaultSortField = 'GP';

    this.teamStatsGridOptions = new GridOptions();
    this.teamStatsGridOptions.dataSource = this.teamStatsGridService;
    this.teamStatsGridOptions.columns = teamStatsGridColumns.slice();
    this.teamStatsGridOptions.columns.splice(0, 1);
    this.teamStatsGridOptions.columns.forEach((column) => column.sortable = null);
  }
}
