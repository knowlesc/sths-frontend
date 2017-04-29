import { GridOptions } from '../../grid/gridOptions';

export class HeaderCellController {
  sortFieldIndex: number;
  gridOptions: GridOptions;

  private get isSortable(): boolean {
    return this.sortFieldIndex !== undefined
      && this.sortFieldIndex !== null
      && this.sortFieldIndex >= 0;
  }

  get sortAsc(): boolean {
    return this.isSortable && this.gridOptions
      && this.gridOptions.currentSort
      && this.gridOptions.currentSort.field === this.gridOptions.fieldNames[this.sortFieldIndex]
      && this.gridOptions.currentSort.order === 'asc';
  }

  get sortDesc(): boolean {
    return this.isSortable && this.gridOptions
      && this.gridOptions.currentSort
      && this.gridOptions.currentSort.field === this.gridOptions.fieldNames[this.sortFieldIndex]
      && this.gridOptions.currentSort.order === 'desc';
  }

  sort(): void {
    if (this.isSortable) {
      this.gridOptions.updateSort(this.sortFieldIndex);
    }
  }
}
