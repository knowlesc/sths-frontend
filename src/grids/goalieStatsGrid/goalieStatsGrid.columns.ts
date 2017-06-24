import { ColumnDef } from '../../components/grid/models/columnDef';

export function goalieStatsGridColumns(): ColumnDef[] {
  return [
    { fieldName: 'Name', sortable: 'asc', width: 180 },
    { fieldName: 'TeamAbbre', sortable: 'asc', centered: true, headerTitle: 'Team' },
    { fieldName: 'GP', sortable: 'desc', centered: true, title: 'Games Played' },
    { fieldName: 'W', sortable: 'desc', centered: true, title: 'Wins' },
    { fieldName: 'L', sortable: 'desc', centered: true, title: 'Losses' },
    { fieldName: 'OTL', sortable: 'desc', centered: true, title: 'Overtime Losses' },
    { fieldName: 'PCT', sortable: 'desc', centered: true, headerTitle: 'SV%', title: 'Save Percentage',
      template: '<span ng-bind="row.PCT | number: 3"></span>' },
    { fieldName: 'GAA', sortable: 'desc', centered: true, title: 'Goals-Against Average',
      template: '<span ng-bind="row.GAA | number: 3"></span>' },
    { fieldName: 'SecondPlay', sortable: 'desc', centered: true, headerTitle: 'MIN', title: 'Minutes Played',
      template: `<span ng-bind="row.SecondPlay | time"></span>` },
    { fieldName: 'Pim', sortable: 'desc', centered: true, title: 'Penalty Minutes' },
    // For some reason Shootout = Shutout in the DB
    { fieldName: 'Shootout', sortable: 'desc', centered: true, headerTitle: 'SO', title: 'Shutouts' },
    { fieldName: 'GA', sortable: 'desc', centered: true, title: 'Goals Against' },
    { fieldName: 'SA', sortable: 'desc', centered: true, title: 'Shots Against' },
    { fieldName: 'A', sortable: 'desc', centered: true, title: 'Assists' },
    { fieldName: 'EmptyNetGoal', sortable: 'desc', centered: true, headerTitle: 'EN',
      title: 'Empty-Net Goals Against' },
    { fieldName: 'PenaltyShotsPCT', sortable: 'desc', centered: true, headerTitle: 'PS%',
      title: 'Penalty Shot Save Percentage',
      template: '<span ng-bind="row.PenaltyShotsPCT | number: 3"></span>' },
    { fieldName: 'PenalityShotsShots', sortable: 'desc', centered: true, headerTitle: 'PSA',
      title: 'Penalty Shots Against' }
  ];
}
