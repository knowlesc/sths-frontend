import { GridOptions } from './models/gridOptions';
import { GridApi } from './models/gridApi';

export class GridController {
  gridOptions: GridOptions;

  paginationOptions: number[];
  rowsPerPage: number;
  totalResults: number;
  currentPage = 1;

  rows: {}[];

  constructor(private $timeout: ng.ITimeoutService) {

  }

  $onInit() {
    if (!this.gridOptions) {
      throw new Error('GridOptions not provided for grid.');
    }

    this.paginationOptions = this.gridOptions.paginationOptions;
    this.rowsPerPage = this.gridOptions.defaultRowsPerPage || 20;

    this.gridOptions.api = new GridApi();
    this.gridOptions.api.gridOptions = this.gridOptions;
    this.gridOptions.api.loadData = () => {
      this.gridOptions.dataSource.currentPage = this.currentPage;
      this.gridOptions.dataSource.rowsPerPage = this.rowsPerPage;
      this.gridOptions.dataSource.loadData()
        .then(() => {
          this.$timeout(() => {
            this.rows = this.gridOptions.dataSource.rows;
            this.totalResults = this.gridOptions.dataSource.totalResults;
          });
        });
    };
    this.gridOptions.api.reloadData = () => {
      this.currentPage = 1;
      this.gridOptions.api.loadData();
    };

    this.gridOptions.api.loadData();
  }

  get totalPages(): number {
    return Math.ceil(this.totalResults / this.rowsPerPage);
  }

  get pagination(): number[] {
    const pages: number[] = [];

    if (this.currentPage - 2 > 0) { pages.push(this.currentPage - 2); }
    if (this.currentPage - 1 > 0) { pages.push(this.currentPage - 1); }

    pages.push(this.currentPage);

    if (this.currentPage + 1 <= this.totalPages) { pages.push(this.currentPage + 1); }
    if (this.currentPage + 2 <= this.totalPages) { pages.push(this.currentPage + 2); }

    if (this.totalPages - 2 > this.currentPage) {
      if (this.totalPages - 2 > this.currentPage + 2) { pages.push(-1); }
      if (this.totalPages - 1 > this.currentPage + 2) { pages.push(this.totalPages - 1); }
      if (this.totalPages > this.currentPage + 2) { pages.push(this.totalPages); }
    }

    return pages;
  }

  goToPage(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.gridOptions.api.loadData();
    }
  }

  onRowsPerPageUpdated() {
    this.gridOptions.api.reloadData();
  }
}