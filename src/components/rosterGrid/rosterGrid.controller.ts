import { SkaterInfo } from '../../models/players/skaterInfo';
import { GridOptions } from '../../components/grid/models/gridOptions';
import { ColumnDef } from '../../components/grid/models/columnDef';
import { RosterGridService } from './rosterGrid.service';

export class RosterGridController {
  team: number;
  gridOptions: GridOptions;

  constructor(private rosterGridService: RosterGridService) {

  }

  $onInit() {
    this.rosterGridService.selectedTeam = this.team;

    this.gridOptions = new GridOptions();
    this.gridOptions.showIndexColumn = true;
    this.gridOptions.dataSource = this.rosterGridService;
    this.gridOptions.showIndexColumn = false;
    this.gridOptions.columns = [
      { fieldName: 'Name', sortable: true, width: 180 },
      { fieldName: 'TeamAbbre', sortable: true, centered: true, headerTitle: 'Team' },
      { fieldName: 'Condition', sortable: true, centered: true, headerTitle: 'CON', title: 'Condition' },
      { fieldName: 'CK', sortable: true, centered: true, title: 'Checking' },
      { fieldName: 'FG', sortable: true, centered: true, title: 'Fighting' },
      { fieldName: 'DI', sortable: true, centered: true, title: 'Discipline' },
      { fieldName: 'SK', sortable: true, centered: true, title: 'Skating' },
      { fieldName: 'ST', sortable: true, centered: true, title: 'Strength' },
      { fieldName: 'EN', sortable: true, centered: true, title: 'Endurance' },
      { fieldName: 'DU', sortable: true, centered: true, title: 'Durability' },
      { fieldName: 'PH', sortable: true, centered: true, title: 'Puck Handling' },
      { fieldName: 'FO', sortable: true, centered: true, title: 'Faceoffs' },
      { fieldName: 'PA', sortable: true, centered: true, title: 'Passing' },
      { fieldName: 'SC', sortable: true, centered: true, title: 'Scoring' },
      { fieldName: 'DF', sortable: true, centered: true, title: 'Defense' },
      { fieldName: 'PS', sortable: true, centered: true, title: 'Penalty Shot' },
      { fieldName: 'EX', sortable: true, centered: true, title: 'Experience' },
      { fieldName: 'LD', sortable: true, centered: true, title: 'Leadership' },
      { fieldName: 'PO', sortable: true, centered: true, title: 'Potential' },
      { fieldName: 'MO', sortable: true, centered: true, title: 'Morale' },
      { fieldName: 'Overall', sortable: true, centered: true, headerTitle: 'OV', title: 'Overall' },
      { fieldName: 'AvailableforTrade', sortable: true, centered: true, headerTitle: 'TA',
        title: 'Available for Trade',
        template: `<span>{{ row.AvailableForTrade === 'True' ? '&#10004' : '' }}</span>` },
      { fieldName: 'StarPower', sortable: true, centered: true, headerTitle: 'SP', title: 'Star Power' }
    ];

    if (this.team) {
      // Don't show team column if all players are from this team
      this.gridOptions.columns.splice(1, 1);
    }
  }
}
