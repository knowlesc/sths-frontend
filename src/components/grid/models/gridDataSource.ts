export interface GridDataSource {
  rowsPerPage: number;
  totalResults: number;
  currentPage: number;
  currentSort: string;
  fields: string;
  rows: {}[];

  loadData(): Promise<void>;
}
