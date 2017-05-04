import { GridOptions } from './gridOptions';

export class GridApi {
  gridOptions: GridOptions;
  currentSort: { field: string, order: 'asc' | 'desc' };

  loadData: Function;
  reloadData: Function;

  getCurrentSortAsString(): string {
    if (!this.currentSort || !this.currentSort.field) {
      return null;
    }

    return (this.currentSort.order === 'asc' ? '' : '-') + this.currentSort.field;
  }

  updateSort(fieldName: string) {
    if (!this.gridOptions.columns) {
      throw new Error('GridOptions: Column defs not set.');
    }

    if (!this.currentSort || !this.currentSort.field) {
      this.currentSort = { field: fieldName, order: 'asc' };
    } else if (this.currentSort.field === fieldName) {
      this.currentSort.order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort = { field: fieldName, order: 'asc' };
    }

    this.gridOptions.dataSource.currentSort = this.getCurrentSortAsString();
    this.loadData();
  }
}
