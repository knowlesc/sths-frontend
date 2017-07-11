import { TeamService } from '../../services/teamService';
import { PlayerService } from '../../services/playerService';
import { TeamInfo } from '../../models/teams/teamInfo';
import { GoalieInfo } from '../../models/players/goalieInfo';
import { PlayerCompareController } from './playerCompare.controller';

export class GoalieCompareController implements PlayerCompareController {
  player: GoalieInfo;
  comparePlayer: GoalieInfo;
  comparePlayerId: string;
  teams: TeamInfo[];
  selectedTeamId: string;
  playersOnSelectedTeam: GoalieInfo[];
  loadingTeams = true;
  loadingPlayers = false;
  loadingComparePlayer = false;

  compareFields = [
    { name: 'Skating', fieldName: 'SK' },
    { name: 'Durability', fieldName: 'DU' },
    { name: 'Endurance', fieldName: 'EN' },
    { name: 'Size', fieldName: 'SZ' },
    { name: 'Agility', fieldName: 'AG' },
    { name: 'Rebound Control', fieldName: 'RB' },
    { name: 'Style Control', fieldName: 'SC' },
    { name: 'Hand Speed', fieldName: 'HS' },
    { name: 'Reaction Time', fieldName: 'RT' },
    { name: 'Puck Handling', fieldName: 'PH' },
    { name: 'Penalty Shot', fieldName: 'PS' },
    { name: 'Experience', fieldName: 'EX' },
    { name: 'Leadership', fieldName: 'LD' },
    { name: 'Potential', fieldName: 'PO' },
    { name: 'Morale', fieldName: 'MO' },
    { name: 'Overall', fieldName: 'Overall' },
    { name: 'Condition', fieldName: 'Condition' }
  ];

  static $inject = ['$timeout', 'teamService', 'playerService'];
  constructor(private $timeout: ng.ITimeoutService,
    private teamService: TeamService,
    private playerService: PlayerService) {
    this.teamService.getTeamList({ league: 'pro' })
      .then((teams) => {
        this.$timeout(() => {
          this.teams = teams;
          this.loadingTeams = false;
        });
      });
  }

  teamSelected() {
    this.comparePlayer = null;

    if (this.selectedTeamId) {
      this.loadingPlayers = true;
      this.playerService.getGoalieInfo({ fields: 'Name,UniqueID', team: parseInt(this.selectedTeamId) })
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
      this.playerService.getSingleGoalieInfo({ id: parseInt(this.comparePlayerId) })
        .then((skaterInfo) => {
          this.$timeout(() => {
            this.comparePlayer = skaterInfo;
            this.loadingComparePlayer = false;
          });
        });
    }
  }
}
