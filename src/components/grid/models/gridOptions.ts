import { ColumnDef } from './columnDef';
import { SortDescriptor } from './sortDescriptor';
import { GridApi } from './gridApi';
import { GridDataSource } from './gridDataSource';

export class GridOptions {
  columns: ColumnDef[];
  dataSource: GridDataSource;
  paginationOptions: number[];
  defaultRowsPerPage: number;
  showIndexColumn: boolean;
  defaultSortField: string;
  startAtPage: number;

  api: GridApi;

  onPageChanged: (page: number) => void;
  onSortChanged: (sort: string) => void;
}
