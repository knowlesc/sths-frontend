import { TeamInfo } from '../../models/teams/teamInfo';
import { TeamService } from '../../services/teamService';
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
import { skaterInfoGridColumns } from '../../grids/skaterInfoGrid/skaterInfoGrid.columns';

import { SkaterRatingsGridService } from '../../grids/skaterRatingsGrid/skaterRatingsGrid.service';
import { skaterRatingsGridColumns } from '../../grids/skaterRatingsGrid/skaterRatingsGrid.columns';

import { ScheduleGridService } from '../../grids/scheduleGrid/scheduleGrid.service';
import { scheduleGridColumns } from '../../grids/scheduleGrid/scheduleGrid.columns';

interface TeamInfoPages {
  Roster: boolean;
  PlayerStats: boolean;
  PlayerInfo: boolean;
  TeamStats: boolean;
  Schedule: boolean;
}

export class TeamInfoController {
  teamInfo: TeamInfo;
  loadingTeamInfo = true;
  loadingTeamInfoFailed = false;
  skaterRatingsGridOptions: GridOptions;
  skaterStatsGridOptions: GridOptions;
  skaterInfoGridOptions: GridOptions;
  goalieInfoGridOptions: GridOptions;
  goalieRatingsGridOptions: GridOptions;
  goalieStatsGridOptions: GridOptions;
  teamStatsGridOptions: GridOptions;
  scheduleGridOptions: GridOptions;

  page = 'Roster';
  openedPages: TeamInfoPages = {
    Roster: true,
    PlayerStats: false,
    PlayerInfo: false,
    TeamStats: false,
    Schedule: false
  };

  static $inject = ['$routeParams', '$timeout', 'league', 'teamService', 'skaterInfoGridService',
    'goalieInfoGridService', 'goalieRatingsGridService', 'skaterRatingsGridService',
    'skaterStatsGridService', 'goalieStatsGridService', 'scheduleGridService', 'teamStatsGridService'];
  constructor($routeParams: ng.route.IRouteParamsService,
    private $timeout: ng.ITimeoutService,
    private league: 'farm' | 'pro',
    private teamService: TeamService,
    private skaterInfoGridService: SkaterInfoGridService,
    private goalieInfoGridService: GoalieInfoGridService,
    private goalieRatingsGridService: GoalieRatingsGridService,
    private skaterRatingsGridService: SkaterRatingsGridService,
    private skaterStatsGridService: SkaterStatsGridService,
    private goalieStatsGridService: GoalieStatsGridService,
    private scheduleGridService: ScheduleGridService,
    private teamStatsGridService: TeamStatsGridService) {
    teamService.getTeamInfo({ league: league, id: $routeParams.id })
      .then((results) => {
        $timeout(() => {
          this.teamInfo = results;
          this.loadingTeamInfo = false;
          this.setUpGrids();
        });
      })
      .catch(() => {
        $timeout(() => {
          this.loadingTeamInfo = false;
          this.loadingTeamInfoFailed = true;
        });
      });
  }

  open(pageName: 'Roster' | 'PlayerInfo' | 'PlayerStats' | 'TeamStats' | 'Schedule') {
    this.page = pageName;
    this.openedPages[pageName] = true;
  }

  private setUpGrids() {
        [this.skaterInfoGridService, this.skaterStatsGridService, this.skaterRatingsGridService,
      this.goalieInfoGridService, this.goalieStatsGridService, this.goalieRatingsGridService,
      this.teamStatsGridService, this.scheduleGridService].forEach((gridService) => {
      gridService.selectedTeam = this.teamInfo.UniqueID;
      gridService.selectedLeague = this.league;
    });

    this.scheduleGridService.endDay = null;
    this.scheduleGridService.startDay = null;

    this.skaterRatingsGridOptions = new GridOptions();
    this.skaterRatingsGridOptions.dataSource = this.skaterRatingsGridService;
    this.skaterRatingsGridOptions.columns = skaterRatingsGridColumns();
    this.skaterRatingsGridOptions.columns.splice(1, 1); // Remove team column
    this.skaterRatingsGridOptions.defaultSortField = 'Overall';

    this.goalieRatingsGridOptions = new GridOptions();
    this.goalieRatingsGridOptions.dataSource = this.goalieRatingsGridService;
    this.goalieRatingsGridOptions.columns = goalieRatingsGridColumns();
    this.goalieRatingsGridOptions.columns.splice(1, 1);
    this.goalieRatingsGridOptions.defaultSortField = 'Overall';

    this.goalieInfoGridOptions = new GridOptions();
    this.goalieInfoGridOptions.dataSource = this.goalieInfoGridService;
    this.goalieInfoGridOptions.columns = goalieInfoGridColumns();
    this.goalieInfoGridOptions.columns.splice(1, 1);
    this.goalieInfoGridOptions.defaultSortField = 'Salary1';

    this.skaterInfoGridOptions = new GridOptions();
    this.skaterInfoGridOptions.dataSource = this.skaterInfoGridService;
    this.skaterInfoGridOptions.columns = skaterInfoGridColumns();
    this.skaterInfoGridOptions.columns.splice(1, 1);
    this.skaterInfoGridOptions.defaultSortField = 'Salary1';

    this.skaterStatsGridOptions = new GridOptions();
    this.skaterStatsGridOptions.dataSource = this.skaterStatsGridService;
    this.skaterStatsGridOptions.columns = skaterStatsGridColumns();
    this.skaterStatsGridOptions.columns.splice(1, 1);
    this.skaterStatsGridOptions.defaultSortField = 'P';

    this.goalieStatsGridOptions = new GridOptions();
    this.goalieStatsGridOptions.dataSource = this.goalieStatsGridService;
    this.goalieStatsGridOptions.columns = goalieStatsGridColumns();
    this.goalieStatsGridOptions.columns.splice(1, 1);
    this.goalieStatsGridOptions.defaultSortField = 'GP';

    this.teamStatsGridOptions = new GridOptions();
    this.teamStatsGridOptions.dataSource = this.teamStatsGridService;
    this.teamStatsGridOptions.columns = teamStatsGridColumns();
    this.teamStatsGridOptions.columns.splice(0, 1);
    this.teamStatsGridOptions.columns.forEach((column) => column.sortable = null);

    this.scheduleGridOptions = new GridOptions();
    this.scheduleGridOptions.dataSource = this.scheduleGridService;
    this.scheduleGridOptions.paginationOptions = [20, 50, 100];
    this.scheduleGridOptions.defaultRowsPerPage = 20;
    this.scheduleGridOptions.showIndexColumn = true;
    this.scheduleGridOptions.columns = scheduleGridColumns();
    this.scheduleGridService.nextSimOnly = false;
  }
}
