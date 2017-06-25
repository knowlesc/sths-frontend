import { ColumnDef } from '../../components/grid/models/columnDef';

export function teamStatsGridColumns(): ColumnDef[] {
  return [
    { fieldName: 'Name', sortable: 'asc', width: 200 },
    { fieldName: 'GP', sortable: 'desc', centered: true },
    { fieldName: 'TotalWins', sortable: 'desc', centered: true, headerTitle: 'W' },
    { fieldName: 'TotalLosses', sortable: 'desc', centered: true, headerTitle: 'L' },
    { fieldName: 'TotalOther', sortable: 'desc', centered: true, headerTitle: 'OT' },
    { fieldName: 'Points', sortable: 'desc', centered: true, headerTitle: 'P' },
    { fieldName: 'GF', sortable: 'desc', centered: true },
    { fieldName: 'GA', sortable: 'desc', centered: true },
    { fieldName: 'PPGoal', sortable: 'desc', centered: true, headerTitle: 'PPGF', title: 'Powerplay Goals For' },
    { fieldName: 'PPAttemp', sortable: 'desc', centered: true, headerTitle: '#PP', title: 'Powerplay Opportunities' },
    { fieldName: 'PPPCT', sortable: 'desc', centered: true, headerTitle: 'PP%', title: 'Powerplay Percentage' },
    { fieldName: 'PKGoalGA', sortable: 'desc', centered: true, headerTitle: 'PPGA', title: 'Powerplay Goals Against' },
    { fieldName: 'PKAttemp', sortable: 'desc', centered: true, headerTitle: '#PK', title: 'Times Shorthanded' },
    { fieldName: 'PKPCT', sortable: 'desc', centered: true, headerTitle: 'PK%', title: 'Penalty Kill Percentage' },
    { fieldName: 'ShotsFor', sortable: 'desc', centered: true, headerTitle: 'SF', title: 'Shots For' },
    { fieldName: 'ShotsAga', sortable: 'desc', centered: true, headerTitle: 'SA', title: 'Shots Against' },
    { fieldName: 'ShotsBlock', sortable: 'desc', centered: true, headerTitle: 'BKS', title: 'Blocked Shots' },
    { fieldName: 'Pim', sortable: 'desc', centered: true, title: 'Penalty Minutes' },
    { fieldName: 'Hits', sortable: 'desc', centered: true }
  ];
}
