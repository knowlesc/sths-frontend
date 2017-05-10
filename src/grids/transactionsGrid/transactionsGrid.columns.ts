import { ColumnDef } from '../../components/grid/models/columnDef';

export const transactionsGridColumns: ColumnDef[] = [
  { fieldName: 'DateTime', width: 130, headerTitle: 'Date' },
  { fieldName: 'Text', headerTitle: 'Details' }
];
