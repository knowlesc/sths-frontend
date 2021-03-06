import { ColumnDef } from '../../components/grid/models/columnDef';

export function goalieInfoGridColumns(): ColumnDef[] {
  return [
    { fieldName: 'Name', sortable: 'asc', width: 120, maxWidth: 180,
      template: `<a ng-href="/#!/goalies/{{ row.UniqueID }}">
        <div class="player-name-cell" ng-bind="row.Name"></div></a>` },
    { fieldName: 'TeamAbbre', sortable: 'asc', centered: true, headerTitle: 'Team' },
    { fieldName: 'Age', sortable: 'asc', centered: true },
    { fieldName: 'AgeDate', headerTitle: 'Birthday',
      template: `<span ng-bind="row.AgeDate"></span>` },
    { fieldName: 'Rookie', sortable: 'desc', centered: true,
      template: `<span>{{ row.Rookie === 'True' ? '&#10004' : '' }}</span>` },
    { fieldName: 'Weight', sortable: 'desc',
      template: `<span ng-bind="row.Weight"></span> lbs` },
    { fieldName: 'Height', sortable: 'desc',
      template: `<span ng-bind="row.Height | height"></span>` },
    { fieldName: 'NoTrade', sortable: 'desc', centered: true, headerTitle: 'NTC', title: 'No Trade Clause',
      template: `<span>{{ row.NoTrade === 'True' ? '&#10004' : '' }}</span>` },
    { fieldName: 'ForceWaiver', sortable: 'desc', centered: true, headerTitle: 'Force Waivers',
      template: `<span>{{ row.ForceWaiver === 'True' ? '&#10004' : '' }}</span>` },
    { fieldName: 'Contract', sortable: 'desc', title: 'Contract Length',
      template: `<span ng-bind="row.Contract === 1 ? row.Contract + ' year' : row.Contract + ' years'"></span>` },
    { fieldName: 'FreeAgentStatus', sortable: 'asc', headerTitle: 'Status', title: 'Free Agent Status' },
    { fieldName: 'Salary1', sortable: 'desc', title: 'Current Salary',
      template: '<span>{{ row.Salary1 ? \'$\' + (row.Salary1 | number) : \'\' }}</span>' },
    { fieldName: 'Salary2', sortable: 'desc', title: 'Year 2 Salary',
      template: '<span>{{ row.Salary2 ? \'$\' + (row.Salary2 | number) : \'\' }}</span>' },
    { fieldName: 'Salary3', sortable: 'desc', title: 'Year 3 Salary',
      template: '<span>{{ row.Salary3 ? \'$\' + (row.Salary3 | number) : \'\' }}</span>' }
  ];
}
