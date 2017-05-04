import { GridOptions } from '../models/gridOptions';

export class HeaderCellController {
  hcFieldName: string;
  hcSortable: boolean;
  hcCentered: boolean;
  gridOptions: GridOptions;

  get sortAsc(): boolean {
    return this.hcSortable && this.gridOptions
      && this.gridOptions.api.currentSort
      && this.gridOptions.api.currentSort.field === this.hcFieldName
      && this.gridOptions.api.currentSort.order === 'asc';
  }

  get sortDesc(): boolean {
    return this.hcSortable && this.gridOptions
      && this.gridOptions.api.currentSort
      && this.gridOptions.api.currentSort.field === this.hcFieldName
      && this.gridOptions.api.currentSort.order === 'desc';
  }

  sort(): void {
    if (this.hcSortable) {
      this.gridOptions.api.updateSort(this.hcFieldName);
    }
  }
}
