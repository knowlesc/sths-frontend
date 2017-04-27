import { PlayersService } from '../../services/playersService';

export class PlayerStatsController {
  playerStats: {}[];

  constructor(private playersService: PlayersService) {
    playersService.getSkaterStats()
      .then((playerStats) => {
        this.playerStats = playerStats;
      });
  }
}
