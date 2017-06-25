export class LeagueSelectorController {
  onChange: Function;
  initialLeague: 'pro' | 'farm';
  selectedLeague: 'pro' | 'farm';
  disabled: boolean;

  $onInit() {
    this.selectedLeague = this.initialLeague || 'pro';
  }

  updateLeague(league: 'pro' | 'farm') {
    if (this.disabled) {
      return;
    }

    this.selectedLeague = league;
    this.onChange({ league: league });
  }
}
