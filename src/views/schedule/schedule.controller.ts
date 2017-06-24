import { scheduleGridColumns } from '../../grids/scheduleGrid/scheduleGrid.columns';
import { ScheduleGridService } from '../../grids/scheduleGrid/scheduleGrid.service';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class ScheduleController {
  gridOptions: GridOptions;
  showTodaysGames = true;

  static $inject = ['scheduleGridService'];
  constructor(private scheduleGridService: ScheduleGridService) {
    this.scheduleGridService.selectedTeam = null;
    this.scheduleGridService.selectedLeague = 'pro';
    this.scheduleGridService.nextSimOnly = this.showTodaysGames;

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.scheduleGridService;
    this.gridOptions.columns = scheduleGridColumns();
    this.gridOptions.paginationOptions = [20, 50, 100];
    this.gridOptions.defaultRowsPerPage = 20;
    this.gridOptions.showIndexColumn = true;
  }

  showTodaysGamesChanged() {
    this.scheduleGridService.nextSimOnly = this.showTodaysGames;
    this.gridOptions.api.reloadData();
  }

  leagueUpdated(league: 'farm' | 'pro') {
    this.scheduleGridService.selectedLeague = league;
    this.gridOptions.api.reloadData();
  }
}
