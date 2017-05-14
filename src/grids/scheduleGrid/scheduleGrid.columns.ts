import { ColumnDef } from '../../components/grid/models/columnDef';

export const scheduleGridColumns: ColumnDef[] = [
  { fieldName: 'Day', sortable: 'asc', width: 30 },
  { fieldName: 'HomeTeamName', headerTitle: 'Home', width: 200,
    template: '<span>{{ row.HomeTeamName }} ({{row.HTotalWins}}-{{row.HTotalLosses}}-{{row.HTotalOther}})</span>' },
  { fieldName: 'VisitorTeamName', headerTitle: 'Away', width: 200,
    template: '<span>{{ row.VisitorTeamName }} ({{row.VTotalWins}}-{{row.VTotalLosses}}-{{row.VTotalOther}})</span>' },
  { fieldName: 'Play', headerTitle: 'Score',
    template: `
    <span ng-if="row.Play === 'True'">
      <span ng-if="row.HomeScore > row.VisitorScore">
        <strong>{{ row.HAbbre }} {{ row.HomeScore }}</strong> - {{ row.VisitorScore }} {{ row.VAbbre }}
      </span>
      <span ng-if="row.HomeScore < row.VisitorScore">
        {{ row.HAbbre }} {{ row.HomeScore }} - <strong>{{ row.VisitorScore }} {{ row.VAbbre }}</strong>
      </span>
      <span ng-if="row.Overtime === 'True' && row.Shootout === 'False'">
        (OT)
      </span>
      <span ng-if="row.Shootout === 'True'">
        (SO)
      </span>
    </span>`}
];
