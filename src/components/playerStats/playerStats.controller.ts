import { PlayersService } from '../../services/playersService';
import { PlayerStats } from '../../models/players/skaterStats';
import { SkaterParams } from '../../models/players/skaterParams';
import { GridOptions } from '../grid/gridOptions';

export class PlayerStatsController {
  playerStats: PlayerStats[];
  gridOptions: GridOptions;
  selectedLeague: 'farm' | 'pro' = 'pro';

  constructor(private $timeout: ng.ITimeoutService, private playersService: PlayersService) {
    this.gridOptions = new GridOptions();
    this.gridOptions.fieldNames = ['Number', 'Name', 'TeamName', 'Position',
      'GP', 'G', 'A', 'P', 'PlusMinus', 'PIM', 'Hits', 'Shots', 'ShotsPCT',
      'ShotsBlock', 'AMG', 'PPG', 'PPA', 'PPP', 'P60'];

    this.loadStats();
  }

  loadStats() {
    const params: SkaterParams = {
      limit: 50,
      hasTeam: 'true',
      hasPlayedMinimumGames: 'true',
      league: this.selectedLeague
    };

    this.playersService.getSkaterStats(params)
      .then((playerStats) => {
        this.$timeout(() => { this.playerStats = playerStats; });
      });
  }

  setLeague(league: 'farm' | 'pro') {
    this.selectedLeague = league;
    this.loadStats();
  }
}
