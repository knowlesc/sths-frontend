import { scheduleGridColumns } from '../../grids/scheduleGrid/scheduleGrid.columns';
import { ScheduleGridService } from '../../grids/scheduleGrid/scheduleGrid.service';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class ScheduleController {
  gridOptions: GridOptions;

  constructor(private scheduleGridService: ScheduleGridService) {
    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.scheduleGridService;
    this.gridOptions.columns = scheduleGridColumns;
    this.gridOptions.paginationOptions = [20, 50, 100];
    this.gridOptions.defaultRowsPerPage = 20;
    this.gridOptions.showIndexColumn = true;
  }
}
