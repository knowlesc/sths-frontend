import { ColumnDef } from '../../components/grid/models/columnDef';

export function goalieRatingsGridColumns(showDetail?: boolean): ColumnDef[] {
  return [
    { fieldName: 'Name', sortable: 'asc', width: 120, maxWidth: 180,
      template: `<span>
          ${ showDetail ? '<span ng-if="row.Status1 % 2 === 0" title="Scratched">X</span>' : '' }
          <a ng-href="/#!/goalies/{{ row.UniqueID }}">
            <span class="player-name-cell" ng-bind="row.Name"></span>
          </a>
        </span>` },
    { fieldName: 'TeamAbbre', sortable: 'asc', centered: true, headerTitle: 'Team' },
    { fieldName: 'Condition', sortable: 'desc', centered: true, headerTitle: 'Con', title: 'Condition',
      template: showDetail ? `
        <span ng-bind="row.Condition" ng-if="row.Injury" style="color:red" title="{{ row.Injury }}"></span>
        <span ng-bind="row.Condition" ng-if="!row.Injury"></span>
      ` : undefined },
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
}
