import { ColumnDef } from '../../components/grid/models/columnDef';

export function waiversGridColumns(): ColumnDef[] {
  return [
    { fieldName: 'PlayerNameOV', headerTitle: 'Player (OV)' },
    { fieldName: 'FromTeamName', headerTitle: 'From Team' },
    { fieldName: 'ToTeamName', headerTitle: 'Claimed By' },
    { fieldName: 'DayPutOnWaiver', headerTitle: 'Day Put On Waivers' },
    { fieldName: 'DayRemoveFromWaiver', headerTitle: 'Day Removed From Waivers' }
  ];
}
