import { GridOptions } from './gridOptions';
import { ColumnDef } from './columnDef';
import { SortDescriptor } from './sortDescriptor';

export class GridApi {
  gridOptions: GridOptions;
  currentSort: SortDescriptor;

  loadData: Function;
  reloadData: Function;

  getCurrentSortAsString(): string {
    if (!this.currentSort || !this.currentSort.field) {
      return null;
    }

    return (this.currentSort.order === 'asc' ? '' : '-') + this.currentSort.field;
  }

  updateSort(field: ColumnDef, descending?: boolean) {
    if (!this.gridOptions.columns) {
      throw new Error('GridOptions: Column defs not set.');
    }

    if (!field || !field.sortable) {
      return;
    }

    if (descending === true) {
      this.currentSort = { field: field.fieldName, order: 'desc' };
    } else if (descending === false) {
      this.currentSort = { field: field.fieldName, order: 'asc' };
    } else if (!this.currentSort || !this.currentSort.field) {
      this.currentSort = { field: field.fieldName, order: field.sortable };
    } else if (this.currentSort.field === field.fieldName) {
      this.currentSort.order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort = { field: field.fieldName, order: field.sortable };
    }

    this.gridOptions.dataSource.currentSort = this.getCurrentSortAsString();
    this.loadData();

    if (this.gridOptions.onSortChanged) {
      this.gridOptions.onSortChanged(this.gridOptions.dataSource.currentSort);
    }
  }
}
