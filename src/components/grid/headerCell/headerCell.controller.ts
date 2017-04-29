import { GridOptions } from '../../grid/gridOptions';

export class HeaderCellController {
  fieldIndex: number;
  gridOptions: GridOptions;

  get sortAsc(): boolean {
    return this.gridOptions
      && this.gridOptions.currentSort
      && this.gridOptions.currentSort.field === this.gridOptions.fieldNames[this.fieldIndex]
      && this.gridOptions.currentSort.order === 'asc';
  }

  get sortDesc(): boolean {
    return this.gridOptions
      && this.gridOptions.currentSort
      && this.gridOptions.currentSort.field === this.gridOptions.fieldNames[this.fieldIndex]
      && this.gridOptions.currentSort.order === 'desc';
  }

  sort(): void {
    this.gridOptions.updateSort(this.fieldIndex);
  }
}
