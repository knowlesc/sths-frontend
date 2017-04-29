export class GridOptions {
  private sortListeners: Function[] = [];

  fieldNames: string[];
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

  updateSort(fieldIndex: number): void {
    if (!this.fieldNames) {
      throw new Error('GridOptions: Field names not set.');
    }

    const field = this.fieldNames[fieldIndex];

    if (!this.currentSort || !this.currentSort.field) {
      this.currentSort = { field: field, order: 'asc' };
    } else if (this.currentSort.field === field) {
      this.currentSort.order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort = { field: field, order: 'asc' };
    }

    this.sortListeners.forEach((cb) => { cb(); });
  }
}
