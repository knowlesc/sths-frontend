export interface GridDataSource {
  rowsPerPage: number;
  totalResults: number;
  currentPage: number;
  currentSort: string;
  rows: {}[];

  loadData(): Promise<void>;
}
