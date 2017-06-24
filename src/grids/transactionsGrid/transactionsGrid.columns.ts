import { ColumnDef } from '../../components/grid/models/columnDef';

export function transactionsGridColumns(): ColumnDef[] {
  return [
    { fieldName: 'DateTime', width: 130, headerTitle: 'Date' },
    { fieldName: 'Text', headerTitle: 'Details', wrap: true }
  ];
}
