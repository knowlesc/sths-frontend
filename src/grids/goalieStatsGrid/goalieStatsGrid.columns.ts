export const goalieStatsGridColumns = [
  { fieldName: 'Name', sortable: true, width: 180 },
  { fieldName: 'TeamAbbre', sortable: true, centered: true, headerTitle: 'Team' },
  { fieldName: 'GP', sortable: true, centered: true },
  { fieldName: 'W', sortable: true, centered: true },
  { fieldName: 'L', sortable: true, centered: true },
  { fieldName: 'OTL', sortable: true, centered: true },
  { fieldName: 'PCT', sortable: true, centered: true, headerTitle: 'SV%',
    template: '<span ng-bind="row.PCT | number: 3"></span>' },
  { fieldName: 'GAA', sortable: true, centered: true,
    template: '<span ng-bind="row.GAA | number: 3"></span>' },
  { fieldName: 'SecondPlay', sortable: true, centered: true, headerTitle: 'MIN',
    template: `<span ng-bind="row.SecondPlay | time"></span>` },
  { fieldName: 'Pim', sortable: true, centered: true },
  // For some reason Shootout = Shutout in the DB
  { fieldName: 'Shootout', sortable: true, centered: true, headerTitle: 'SO' },
  { fieldName: 'GA', sortable: true, centered: true },
  { fieldName: 'SA', sortable: true, centered: true },
  { fieldName: 'A', sortable: true, centered: true },
  { fieldName: 'EmptyNetGoal', sortable: true, centered: true, headerTitle: 'EN' },
  { fieldName: 'PenaltyShotsPCT', sortable: true, centered: true, headerTitle: 'PS%',
    template: '<span ng-bind="row.PenaltyShotsPCT | number: 3"></span>' },
  { fieldName: 'PenalityShotsShots', sortable: true, centered: true, headerTitle: 'PSA' }
];
