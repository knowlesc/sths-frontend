import { GridOptions } from './models/gridOptions';
import { GridApi } from './models/gridApi';

export class GridController {
  gridOptions: GridOptions;

  firstTimeLoading = true;
  loading = true;
  failed = false;
  paginationOptions: number[];
  rowsPerPage: number;
  totalResults: number;
  currentPage = 1;

  rows: {}[];

  static $inject = ['$timeout'];
  constructor(private $timeout: ng.ITimeoutService) {

  }

  $onInit() {
    if (!this.gridOptions) {
      throw new Error('GridOptions not provided for grid.');
    }

    this.paginationOptions = this.gridOptions.paginationOptions;
    this.rowsPerPage = this.gridOptions.defaultRowsPerPage;
    if (this.gridOptions.startAtPage) {
      this.currentPage = parseInt(this.gridOptions.startAtPage.toString()) || 1;
    }

    this.gridOptions.dataSource.fields = this.gridOptions.columns
      .map((column) => column.fieldName).join(',');

    this.gridOptions.api = new GridApi();
    this.gridOptions.api.gridOptions = this.gridOptions;
    this.gridOptions.api.loadData = () => {
      this.loading = true;
      this.failed = false;
      this.gridOptions.dataSource.currentPage = this.currentPage;
      this.gridOptions.dataSource.rowsPerPage = this.rowsPerPage;
      this.gridOptions.dataSource.loadData()
        .then(() => {
          this.$timeout(() => {
            this.rows = this.gridOptions.dataSource.rows;
            this.totalResults = this.gridOptions.dataSource.totalResults;
            this.firstTimeLoading = false;
            this.loading = false;
          });
        })
        .catch(() => {
          this.$timeout(() => {
            this.loading = false;
            this.failed = true;
          });
        });
    };
    this.gridOptions.api.reloadData = () => {
      this.currentPage = 1;
      if (this.gridOptions.onPageChanged) {
        this.gridOptions.onPageChanged(1);
      }

      this.gridOptions.api.loadData();
    };
    if (this.gridOptions.defaultSortField) {
      const descending = this.gridOptions.defaultSortField.indexOf('-') === 0;
      const sortField = descending ? this.gridOptions.defaultSortField.substring(1) : this.gridOptions.defaultSortField;

      const sortColumn = this.gridOptions.columns.find((field) =>
        field.fieldName === sortField);
      if (sortColumn) {
        this.gridOptions.api.updateSort(sortColumn, descending);
      } else {
        this.gridOptions.api.loadData();
      }
    } else {
      this.gridOptions.api.loadData();
    }
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

  isSortedBy(fieldName: string) {
    return this.gridOptions.api.getCurrentSortAsString() === fieldName ||
      this.gridOptions.api.getCurrentSortAsString() === `-${fieldName}`;
  }

  goToPage(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.gridOptions.api.loadData();
      if (this.gridOptions.onPageChanged) {
        this.gridOptions.onPageChanged(page);
      }
    }
  }

  onRowsPerPageUpdated() {
    this.gridOptions.api.reloadData();
  }
}
