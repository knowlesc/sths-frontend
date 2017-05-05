export class LeagueSelectorController {
  onChange: Function;
  initialLeague: 'pro' | 'farm';
  selectedLeague: 'pro' | 'farm';

  $onInit() {
    this.selectedLeague = this.initialLeague || 'pro';
  }

  updateLeague(league: 'pro' | 'farm') {
    this.selectedLeague = league;
    this.onChange({ league: league });
  }
}
