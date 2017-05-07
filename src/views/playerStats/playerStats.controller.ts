import { SkaterStats } from '../../models/players/skaterStats';
import { GridOptions } from '../../components/grid/models/gridOptions';
import { ColumnDef } from '../../components/grid/models/columnDef';
import { PlayerStatsService } from './playerStats.service';

export class PlayerStatsController {
  gridOptions: GridOptions;

  constructor(private playerStatsService: PlayerStatsService) {
    this.gridOptions = new GridOptions();
    this.gridOptions.defaultRowsPerPage = 50;
    this.gridOptions.showIndexColumn = true;
    this.gridOptions.paginationOptions = [20, 50, 100];
    this.gridOptions.dataSource = playerStatsService;
    this.gridOptions.columns = [
      { fieldName: 'Name', sortable: true, width: 180 },
      { fieldName: 'TeamAbbre', sortable: true, centered: true, headerTitle: 'Team' },
      { fieldName: 'Position', sortable: true, centered: true },
      { fieldName: 'GP', sortable: true, centered: true },
      { fieldName: 'G', sortable: true, centered: true },
      { fieldName: 'A', sortable: true, centered: true },
      { fieldName: 'P', sortable: true, centered: true},
      { fieldName: 'PlusMinus', sortable: true, centered: true, headerTitle: '+/-' },
      { fieldName: 'Pim', sortable: true, centered: true },
      { fieldName: 'Hits', sortable: true, centered: true },
      { fieldName: 'Shots', sortable: true, centered: true },
      { fieldName: 'ShotsPCT', sortable: true, centered: true, headerTitle: 'Shot%',
        template: `<span ng-bind="row.ShotsPCT | number : 1"></span>` },
      { fieldName: 'ShotsBlock', sortable: true, centered: true, headerTitle: 'BkS' },
      { fieldName: 'AvgTOI', sortable: true, centered: true, headerTitle: 'TOI/G',
        template: '<span ng-bind="row.AvgTOI | time"></span>' },
      { fieldName: 'PPG', sortable: true, centered: true },
      { fieldName: 'PPA', sortable: true, centered: true },
      { fieldName: 'PPP', sortable: true, centered: true },
      { fieldName: 'P60', sortable: true, centered: true, headerTitle: 'P/60',
        template: `<span ng-bind="row.P60 || 0 | number : 1"></span>` }
    ];
  }

  leagueUpdated(league: 'farm' | 'pro') {
    this.playerStatsService.selectedLeague = league;
    this.gridOptions.api.reloadData();
  }
}
