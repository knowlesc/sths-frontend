import { ColumnDef } from '../../components/grid/models/columnDef';

export function skaterRatingsGridColumns(): ColumnDef[] {
  return [
    { fieldName: 'Name', sortable: 'asc', width: 180,
      template: `<a ng-href="/#!/skaters/{{ row.UniqueID }}"><span ng-bind="row.Name"></span></a>` },
    { fieldName: 'TeamAbbre', sortable: 'asc', centered: true, headerTitle: 'Team' },
    { fieldName: 'Position', sortable: 'asc', centered: true, headerTitle: 'Pos', title: 'Position' },
    { fieldName: 'Condition', sortable: 'desc', centered: true, headerTitle: 'Con', title: 'Condition' },
    { fieldName: 'CK', sortable: 'desc', centered: true, title: 'Checking' },
    { fieldName: 'FG', sortable: 'desc', centered: true, title: 'Fighting' },
    { fieldName: 'DI', sortable: 'desc', centered: true, title: 'Discipline' },
    { fieldName: 'SK', sortable: 'desc', centered: true, title: 'Skating' },
    { fieldName: 'ST', sortable: 'desc', centered: true, title: 'Strength' },
    { fieldName: 'EN', sortable: 'desc', centered: true, title: 'Endurance' },
    { fieldName: 'DU', sortable: 'desc', centered: true, title: 'Durability' },
    { fieldName: 'PH', sortable: 'desc', centered: true, title: 'Puck Handling' },
    { fieldName: 'FO', sortable: 'desc', centered: true, title: 'Faceoffs' },
    { fieldName: 'PA', sortable: 'desc', centered: true, title: 'Passing' },
    { fieldName: 'SC', sortable: 'desc', centered: true, title: 'Scoring' },
    { fieldName: 'DF', sortable: 'desc', centered: true, title: 'Defense' },
    { fieldName: 'PS', sortable: 'desc', centered: true, title: 'Penalty Shot' },
    { fieldName: 'EX', sortable: 'desc', centered: true, title: 'Experience' },
    { fieldName: 'LD', sortable: 'desc', centered: true, title: 'Leadership' },
    { fieldName: 'PO', sortable: 'desc', centered: true, title: 'Potential' },
    { fieldName: 'MO', sortable: 'desc', centered: true, title: 'Morale' },
    { fieldName: 'Overall', sortable: 'desc', centered: true, headerTitle: 'OV', title: 'Overall' },
    { fieldName: 'AvailableforTrade', sortable: 'desc', centered: true, headerTitle: 'TA',
      title: 'Available for Trade',
      template: `<span>{{ row.AvailableForTrade === 'True' ? '&#10004' : '' }}</span>` },
    { fieldName: 'StarPower', sortable: 'desc', centered: true, headerTitle: 'SP', title: 'Star Power' }
  ];
}
