import { TeamService } from '../../services/teamService';
import { PlayerService } from '../../services/playerService';
import { TeamInfo } from '../../models/teams/teamInfo';
import { SkaterInfo } from '../../models/players/skaterInfo';
import { PlayerCompareController } from './playerCompare.controller';

export class SkaterCompareController implements PlayerCompareController {
  player: SkaterInfo;
  comparePlayer: SkaterInfo;
  comparePlayerId: string;
  teams: TeamInfo[] = [{ Abbre: 'FA', Name: 'Free Agents', UniqueID: 0 }];
  selectedTeamId: number = -1;
  playersOnSelectedTeam: SkaterInfo[];
  loadingTeams = true;
  loadingPlayers = false;
  loadingComparePlayer = false;

  compareFields = [
    { name: 'Scoring', fieldName: 'SC' },
    { name: 'Puck Handling', fieldName: 'PH' },
    { name: 'Faceoffs', fieldName: 'FO' },
    { name: 'Passing', fieldName: 'PA' },
    { name: 'Penalty Shot', fieldName: 'PS' },
    { name: 'Skating', fieldName: 'SK' },
    { name: 'Endurance', fieldName: 'EN' },
    { name: 'Durability', fieldName: 'DU' },
    { name: 'Defense', fieldName: 'DF' },
    { name: 'Leadership', fieldName: 'LD' },
    { name: 'Checking', fieldName: 'CK' },
    { name: 'Fighting', fieldName: 'FG' },
    { name: 'Discipline', fieldName: 'DI' },
    { name: 'Strength', fieldName: 'ST' },
    { name: 'Experience', fieldName: 'EX' },
    { name: 'Overall', fieldName: 'Overall' },
    { name: 'Potential', fieldName: 'PO' },
    { name: 'Condition', fieldName: 'Condition' },
    { name: 'Morale', fieldName: 'MO' }
  ];

  static $inject = ['$timeout', 'teamService', 'playerService'];
  constructor(private $timeout: ng.ITimeoutService,
    private teamService: TeamService,
    private playerService: PlayerService) {
    this.teamService.getTeamList({ league: 'pro' })
      .then((teams) => {
        this.$timeout(() => {
          this.teams = this.teams.concat(teams);
          this.loadingTeams = false;
        });
      });
  }

  teamSelected() {
    this.comparePlayer = null;

    if (this.selectedTeamId >= 0) {
      this.loadingPlayers = true;
      this.playerService.getSkaterInfo({ fields: 'Name,UniqueID', team: this.selectedTeamId })
        .then((results) => {
          this.$timeout(() => {
            this.playersOnSelectedTeam = results.rows;
            this.loadingPlayers = false;
          });
        });
    }
  }

  playerSelected() {
    this.comparePlayer = null;

    if (this.comparePlayerId) {
      this.loadingComparePlayer = true;
      this.playerService.getSingleSkaterInfo({ id: parseInt(this.comparePlayerId) })
        .then((skaterInfo) => {
          this.$timeout(() => {
            this.comparePlayer = skaterInfo;
            this.loadingComparePlayer = false;
          });
        });
    }
  }
}
