import { TeamInfo } from '../../models/teams/teamInfo';

export class TeamListController {

  static $inject = ['proTeamList', 'farmTeamList'];
  constructor(private proTeamList: TeamInfo[], private farmTeamList: TeamInfo[]) {

  }

}
