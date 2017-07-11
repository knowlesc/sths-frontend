import { ColumnDef } from '../../components/grid/models/columnDef';

export function transactionsGridColumns(): ColumnDef[] {
  return [
    { fieldName: 'DateTime', headerTitle: 'Date',
      template: `<span ng-bind="row.DateTime | toDate | date : 'MMM d, y'"></span>` },
    { fieldName: 'Text', headerTitle: 'Details', wrap: true }
  ];
}
