import { ColumnDef } from '../../components/grid/models/columnDef';

export function skaterStatsGridColumns(): ColumnDef[] {
  return [
    { fieldName: 'Name', sortable: 'asc', width: 180,
      template: `<a ng-href="/#!/skaters/{{ row.UniqueID }}"><span ng-bind="row.Name"></span></a>` },
    { fieldName: 'TeamAbbre', sortable: 'asc', centered: true, headerTitle: 'Team' },
    { fieldName: 'Position', sortable: 'asc', centered: true, headerTitle: 'Pos', title: 'Position' },
    { fieldName: 'GP', sortable: 'desc', centered: true, title: 'Games Played' },
    { fieldName: 'G', sortable: 'desc', centered: true, title: 'Goals' },
    { fieldName: 'A', sortable: 'desc', centered: true, title: 'Assists' },
    { fieldName: 'P', sortable: 'desc', centered: true, title: 'Points'},
    { fieldName: 'PlusMinus', sortable: 'desc', centered: true, headerTitle: '+/-' },
    { fieldName: 'Pim', sortable: 'desc', centered: true, title: 'Penalty Minutes' },
    { fieldName: 'Hits', sortable: 'desc', centered: true },
    { fieldName: 'Shots', sortable: 'desc', centered: true, headerTitle: 'SH', title: 'Shots' },
    { fieldName: 'ShotsPCT', sortable: 'desc', centered: true, headerTitle: 'SH%', title: 'Shooting Percentage',
      template: `<span ng-bind="row.ShotsPCT | number : 1"></span>` },
    { fieldName: 'ShotsBlock', sortable: 'desc', centered: true, headerTitle: 'BkS', title: 'Blocked Shots' },
    { fieldName: 'AvgTOI', sortable: 'desc', centered: true, headerTitle: 'TOI/G', title: 'Time-On-Ice per Game',
      template: '<span ng-bind="row.AvgTOI | time"></span>' },
    { fieldName: 'PPG', sortable: 'desc', centered: true, title: 'Powerplay Goals' },
    { fieldName: 'PPA', sortable: 'desc', centered: true, title: 'Powerplay Assists' },
    { fieldName: 'PPP', sortable: 'desc', centered: true, title: 'Powerplay Points' },
    { fieldName: 'PKG', sortable: 'desc', centered: true, headerTitle: 'SHG', title: 'Short-Handed Goals' },
    { fieldName: 'P60', sortable: 'desc', centered: true, headerTitle: 'P/60', title: 'Points per 60 Minutes',
      template: `<span ng-bind="row.P60 || 0 | number : 1"></span>` }
  ];
}
