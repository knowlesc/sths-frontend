import { GridOptions } from '../models/gridOptions';
import { ColumnDef } from '../models/columnDef';

export class HeaderCellController {
  column: ColumnDef;
  gridOptions: GridOptions;

  get sortAsc(): boolean {
    return this.column && this.column.sortable && this.gridOptions
      && this.gridOptions.api.currentSort
      && this.gridOptions.api.currentSort.field === this.column.fieldName
      && this.gridOptions.api.currentSort.order === 'asc';
  }

  get sortDesc(): boolean {
    return this.column && this.column.sortable && this.gridOptions
      && this.gridOptions.api.currentSort
      && this.gridOptions.api.currentSort.field === this.column.fieldName
      && this.gridOptions.api.currentSort.order === 'desc';
  }

  sort(): void {
    if (this.column && this.column.sortable) {
      this.gridOptions.api.updateSort(this.column);
    }
  }
}
