import { ColumnDef } from '../../components/grid/models/columnDef';

export const goalieRatingsGridColumns: ColumnDef[] = [
  { fieldName: 'Name', sortable: 'asc', width: 180 },
  { fieldName: 'TeamAbbre', sortable: 'asc', centered: true, headerTitle: 'Team' },
  { fieldName: 'Condition', sortable: 'desc', centered: true, headerTitle: 'Con', title: 'Conditioning' },
  { fieldName: 'SK', sortable: 'desc', centered: true, title: 'Skating' },
  { fieldName: 'DU', sortable: 'desc', centered: true, title: 'Durability' },
  { fieldName: 'EN', sortable: 'desc', centered: true, title: 'Endurance' },
  { fieldName: 'SZ', sortable: 'desc', centered: true, title: 'Size' },
  { fieldName: 'AG', sortable: 'desc', centered: true, title: 'Agility' },
  { fieldName: 'RB', sortable: 'desc', centered: true, title: 'Rebound Control' },
  { fieldName: 'SC', sortable: 'desc', centered: true, title: 'Style Control' },
  { fieldName: 'HS', sortable: 'desc', centered: true, title: 'Hand Speed' },
  { fieldName: 'RT', sortable: 'desc', centered: true, title: 'Reaction Time' },
  { fieldName: 'PH', sortable: 'desc', centered: true, title: 'Puck Handling' },
  { fieldName: 'PS', sortable: 'desc', centered: true, title: 'Penalty Shot' },
  { fieldName: 'EX', sortable: 'desc', centered: true, title: 'Experience' },
  { fieldName: 'LD', sortable: 'desc', centered: true, title: 'Leadership' },
  { fieldName: 'PO', sortable: 'desc', centered: true, title: 'Potential' },
  { fieldName: 'MO', sortable: 'desc', centered: true, title: 'Morale' },
  { fieldName: 'Overall', sortable: 'desc', centered: true, headerTitle: 'OV', title: 'Overall' },
  { fieldName: 'AvailableforTrade', sortable: 'desc', centered: true, headerTitle: 'TA', title: 'Trade Available',
    template: `<span>{{ row.AvailableForTrade === 'True' ? '&#10004' : '' }}</span>` },
  { fieldName: 'StarPower', sortable: 'desc', centered: true, headerTitle: 'SP', title: 'Star Power' }
];
