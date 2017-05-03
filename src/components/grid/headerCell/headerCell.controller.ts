import { GridOptions } from '../../grid/gridOptions';

export class HeaderCellController {
  hcFieldName: string;
  hcSortable: boolean;
  hcCentered: boolean;
  gridOptions: GridOptions;

  get sortAsc(): boolean {
    return this.hcSortable && this.gridOptions
      && this.gridOptions.currentSort
      && this.gridOptions.currentSort.field === this.hcFieldName
      && this.gridOptions.currentSort.order === 'asc';
  }

  get sortDesc(): boolean {
    return this.hcSortable && this.gridOptions
      && this.gridOptions.currentSort
      && this.gridOptions.currentSort.field === this.hcFieldName
      && this.gridOptions.currentSort.order === 'desc';
  }

  sort(): void {
    if (this.hcSortable) {
      this.gridOptions.updateSort(this.hcFieldName);
    }
  }
}
