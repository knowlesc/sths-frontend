import { LeagueService } from './../../services/leagueService';
import { GoalieStats } from './../../models/players/goalieStats';
import { SkaterStats } from './../../models/players/skaterStats';
import { PlayerService } from './../../services/playerService';

export class StatLeadersController {
  loading = true;
  loadingFailed = false;
  selectedLeague: 'farm' | 'pro' = 'pro';
  minimumGoalieGamesPlaced = 1;

  pointsLeaders: SkaterStats[];
  goalsLeaders: SkaterStats[];
  assistsLeaders: SkaterStats[];
  plusMinusLeaders: SkaterStats[];
  savePercentageLeaders: GoalieStats[];
  winsLeaders: GoalieStats[];
  gaaLeaders: GoalieStats[];
  shutoutLeaders: GoalieStats[];

  static $inject = ['$timeout', 'leagueService', 'playerService'];
  constructor(private $timeout: ng.ITimeoutService,
    private leagueService: LeagueService,
    private playerService: PlayerService) {
    this.leagueService.getLeagueInfo()
      .then((leagueInfo) => {
        if (leagueInfo.ScheduleNextDay < 20) {
          this.minimumGoalieGamesPlaced = 1;
        } else if (leagueInfo.ScheduleNextDay < 50) {
          this.minimumGoalieGamesPlaced = 5;
        } else if (leagueInfo.ScheduleNextDay < 80) {
          this.minimumGoalieGamesPlaced = 10;
        } else {
          this.minimumGoalieGamesPlaced = 25;
        }

        this.loadLeaders();
      });
  }

  loadLeaders() {
    this.loading = true;
    Promise.all([
      this.playerService.getSkaterStats({
        fields: 'UniqueID,Name,P',
        sort: '-P',
        limit: 10,
        league: this.selectedLeague
      }),
      this.playerService.getSkaterStats({
        fields: 'UniqueID,Name,G',
        sort: '-G',
        limit: 10,
        league: this.selectedLeague
      }),
      this.playerService.getSkaterStats({
        fields: 'UniqueID,Name,A',
        sort: '-A',
        limit: 10,
        league: this.selectedLeague
      }),
      this.playerService.getSkaterStats({
        fields: 'UniqueID,Name,PlusMinus',
        sort: '-PlusMinus',
        limit: 10,
        league: this.selectedLeague
      }),
      this.playerService.getGoalieStats({
        fields: 'UniqueID,Name,PCT',
        sort: '-PCT',
        limit: 10,
        league: this.selectedLeague,
        hasPlayedMinimumGames: this.minimumGoalieGamesPlaced
      }),
      this.playerService.getGoalieStats({
        fields: 'UniqueID,Name,W',
        sort: '-W',
        limit: 10,
        league: this.selectedLeague,
        hasPlayedMinimumGames: this.minimumGoalieGamesPlaced
      }),
      this.playerService.getGoalieStats({
        fields: 'UniqueID,Name,GAA',
        sort: 'GAA',
        limit: 10,
        league: this.selectedLeague,
        hasPlayedMinimumGames: this.minimumGoalieGamesPlaced
      }),
      this.playerService.getGoalieStats({
        fields: 'UniqueID,Name,Shootout',
        sort: '-Shootout',
        limit: 10,
        league: this.selectedLeague,
        hasPlayedMinimumGames: this.minimumGoalieGamesPlaced
      })
    ]).then((results) => {
        this.$timeout(() => {
          this.pointsLeaders = results[0].rows;
          this.goalsLeaders = results[1].rows;
          this.assistsLeaders = results[2].rows;
          this.plusMinusLeaders = results[3].rows;
          this.savePercentageLeaders = results[4].rows;
          this.winsLeaders = results[5].rows;
          this.gaaLeaders = results[6].rows;
          this.shutoutLeaders = results[7].rows;
          this.loading = false;
        });
      })
      .catch(() => {
        this.loading = false;
        this.loadingFailed = true;
      });
  }

  getWidth(player: SkaterStats, topPlayers: SkaterStats[], fieldName: 'A') {
    const max = Math.max(...(topPlayers.map((p) => p[fieldName])));
    const min = Math.min(...(topPlayers.map((p) => p[fieldName])));
    const formula = (0.7 * ((player[fieldName] - min) / (max - min)) + 0.3) * 100;

    return `${formula}%`;
  }

  leagueUpdated(league: 'farm' | 'pro') {
    this.selectedLeague = league;
    this.loadLeaders();
  }
}
