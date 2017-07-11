import { TeamService } from '../../services/teamService';
import { PlayerService } from '../../services/playerService';
import { TeamInfo } from '../../models/teams/teamInfo';
import { SkaterInfo } from '../../models/players/skaterInfo';
import { GoalieInfo } from '../../models/players/goalieInfo';

export interface PlayerCompareController {
  player: SkaterInfo | GoalieInfo;
  comparePlayer: SkaterInfo | GoalieInfo;
  comparePlayerId: string;
  teams: TeamInfo[];
  selectedTeamId: number;
  playersOnSelectedTeam: SkaterInfo[] | GoalieInfo[];
  loadingTeams: boolean;
  loadingPlayers: boolean;
  loadingComparePlayer: boolean;

  teamSelected(): void;
  playerSelected(): void;
}
