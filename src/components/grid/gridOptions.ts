export class GridOptions {
  fieldNames: string[];
  currentSort: { field: string, order: 'asc' | 'desc' };

  updateSort = (fieldIndex: number) => {
    const field = this.fieldNames[fieldIndex];

    if (!this.currentSort || !this.currentSort.field) {
      this.currentSort = { field: field, order: 'asc' };
    } else if (this.currentSort.field === field) {
      this.currentSort.order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort = { field: field, order: 'asc' };
    }

    return this.currentSort;
  }
}
