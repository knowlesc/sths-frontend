import { CoachRatingsGridService } from '../../grids/coachRatingsGrid/coachRatingsGrid.service';
import { coachRatingsGridColumns } from '../../grids/coachRatingsGrid/coachRatingsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class CoachRatingsController {
  gridOptions: GridOptions;

  static $inject = ['coachRatingsGridService'];
  constructor(private coachRatingsGridService: CoachRatingsGridService) {
    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.coachRatingsGridService;
    this.gridOptions.columns = coachRatingsGridColumns();
    this.gridOptions.showIndexColumn = true;
    this.gridOptions.defaultRowsPerPage = 20;
    this.gridOptions.paginationOptions = [20, 50, 100];
  }
}
