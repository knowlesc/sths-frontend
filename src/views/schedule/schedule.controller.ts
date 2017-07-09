import { scheduleGridColumns } from '../../grids/scheduleGrid/scheduleGrid.columns';
import { ScheduleGridService } from '../../grids/scheduleGrid/scheduleGrid.service';
import { GridOptions } from '../../components/grid/models/gridOptions';
import { LeagueInfo } from '../../models/league/leagueInfo';
import { LeagueService } from '../../services/leagueService';

export class ScheduleController {
  loading = true;
  loadingFailed = false;
  leagueInfo: LeagueInfo;
  gridOptions: GridOptions;
  showTodaysGames = true;
  startDay = 1;
  endDay = 2;

  static $inject = ['$timeout', '$location', '$routeParams', 'scheduleGridService', 'leagueService'];
  constructor(private $timeout: ng.ITimeoutService,
    private $location: ng.ILocationService,
    private $routeParams: ng.route.IRouteParamsService,
    private scheduleGridService: ScheduleGridService,
    private leagueService: LeagueService) {
    this.scheduleGridService.selectedTeam = null;
    this.scheduleGridService.selectedLeague = 'pro';
    this.scheduleGridService.nextSimOnly = false;

    leagueService.getLeagueInfo()
      .then((results) => {
        $timeout(() => {
          this.leagueInfo = results;
          this.loading = false;

          if (!isNaN($routeParams['day']) && parseInt($routeParams['day']) > 0) {
            this.scheduleGridService.startDay = this.startDay = parseInt($routeParams['day']);
          } else {
            this.scheduleGridService.startDay = this.startDay = this.leagueInfo.ScheduleNextDay;
          }
          this.scheduleGridService.endDay = this.endDay = this.startDay + this.leagueInfo.DefaultSimulationPerDay;
        });
      })
      .catch(() => {
        $timeout(() => {
          this.loading = false;
          this.loadingFailed = true;
        });
      });

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.scheduleGridService;
    this.gridOptions.columns = scheduleGridColumns();
  }

  get currentSelection() {
    return this.leagueInfo.DefaultSimulationPerDay > 1
      ? `Day ${this.startDay} - Day ${this.endDay - 1}`
      : `Day ${this.startDay}`;
  }

  daysPlus() {
    this.startDay += this.leagueInfo.DefaultSimulationPerDay;
    this.endDay += this.leagueInfo.DefaultSimulationPerDay;
    this.daysUpdated();
  }

  daysMinus() {
    this.startDay -= this.leagueInfo.DefaultSimulationPerDay;
    this.endDay -= this.leagueInfo.DefaultSimulationPerDay;
    this.daysUpdated();
  }

  daysUpdated() {
    this.$location.url(`/schedule/${this.startDay}`);
  }

  leagueUpdated(league: 'farm' | 'pro') {
    this.scheduleGridService.selectedLeague = league;
    this.gridOptions.api.reloadData();
  }
}
