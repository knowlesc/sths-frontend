import { ColumnDef } from '../../components/grid/models/columnDef';

export function coachRatingsGridColumns(showDetail?: boolean): ColumnDef[] {
  return [
    { fieldName: 'Name', sortable: 'asc', width: 120, maxWidth: 180 },
    { fieldName: 'Team', sortable: 'asc' },
    { fieldName: 'Country', sortable: 'asc' },
    { fieldName: 'PH', sortable: 'desc', centered: true,  title: 'Physical Style' },
    { fieldName: 'DF', sortable: 'desc', centered: true, title: 'Defense Style' },
    { fieldName: 'OF', sortable: 'desc', centered: true, title: 'Offense Style' },
    { fieldName: 'PD', sortable: 'desc', centered: true, title: 'Player Discipline' },
    { fieldName: 'EX', sortable: 'desc', centered: true, title: 'Experience' },
    { fieldName: 'LD', sortable: 'desc', centered: true, title: 'Leadership' },
    { fieldName: 'PO', sortable: 'desc', centered: true, title: 'Potential' },
    { fieldName: 'Age', sortable: 'desc', centered: true },
    { fieldName: 'Contract', sortable: 'desc', title: 'Contract Length',
      template: `
      <span ng-if="row.Contract" ng-bind="row.Contract === 1 ? row.Contract + ' year' : row.Contract + ' years'"></span>
      ` },
    { fieldName: 'Salary', sortable: 'desc',
      template: '<span>{{ row.Salary ? \'$\' + (row.Salary | number) : \'\' }}</span>' }
  ];
}
