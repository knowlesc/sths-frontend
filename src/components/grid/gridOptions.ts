import { ColumnDef } from './columnDef';

export class GridOptions {
  private sortListeners: Function[] = [];

  columns: ColumnDef[];
  currentSort: { field: string, order: 'asc' | 'desc' };

  getCurrentSortAsString(): string {
    if (!this.currentSort || !this.currentSort.field) {
      return null;
    }

    return (this.currentSort.order === 'asc' ? '' : '-') + this.currentSort.field;
  }

  onSort(cb: Function): void {
    if (cb) {
      this.sortListeners.push(cb);
    }
  }

  updateSort(fieldName: string): void {
    if (!this.columns) {
      throw new Error('GridOptions: Column defs not set.');
    }

    if (!this.currentSort || !this.currentSort.field) {
      this.currentSort = { field: fieldName, order: 'asc' };
    } else if (this.currentSort.field === fieldName) {
      this.currentSort.order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort = { field: fieldName, order: 'asc' };
    }

    this.sortListeners.forEach((cb) => { cb(); });
  }
}
