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

  static $inject = ['$timeout', '$location', 'scheduleGridService', 'leagueService'];
  constructor(private $timeout: ng.ITimeoutService,
    private $location: ng.ILocationService,
    private scheduleGridService: ScheduleGridService,
    private leagueService: LeagueService) {
    this.scheduleGridService.selectedTeam = null;
    this.scheduleGridService.nextSimOnly = false;
    const search = $location.search();

    if (search.league === 'farm') {
      this.scheduleGridService.selectedLeague = search.league;
    } else {
      this.scheduleGridService.selectedLeague = 'pro';
    }

    leagueService.getLeagueInfo()
      .then((results) => {
        $timeout(() => {
          this.leagueInfo = results;
          this.loading = false;

          if (!isNaN(search.day) && parseInt(search.day) > 0) {
            this.scheduleGridService.startDay = parseInt(search.day);
          } else {
            this.scheduleGridService.startDay = this.leagueInfo.ScheduleNextDay;
          }
          this.scheduleGridService.endDay = this.scheduleGridService.startDay + this.leagueInfo.DefaultSimulationPerDay;
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
      ? `Day ${this.scheduleGridService.startDay} - Day ${this.scheduleGridService.endDay - 1}`
      : `Day ${this.scheduleGridService.startDay}`;
  }

  daysPlus() {
    this.scheduleGridService.startDay += this.leagueInfo.DefaultSimulationPerDay;
    this.scheduleGridService.endDay += this.leagueInfo.DefaultSimulationPerDay;
    this.searchUpdated();
  }

  daysMinus() {
    this.scheduleGridService.startDay -= this.leagueInfo.DefaultSimulationPerDay;
    this.scheduleGridService.endDay -= this.leagueInfo.DefaultSimulationPerDay;
    this.searchUpdated();
  }

  searchUpdated() {
    this.$location.search({
      league: this.scheduleGridService.selectedLeague,
      day: this.scheduleGridService.startDay
    });

    this.gridOptions.api.reloadData();
  }

  leagueUpdated(league: 'farm' | 'pro') {
    this.scheduleGridService.selectedLeague = league;
    this.searchUpdated();
  }
}
