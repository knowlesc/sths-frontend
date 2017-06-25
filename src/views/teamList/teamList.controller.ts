import { TeamInfo } from '../../models/teams/teamInfo';
import { TeamService } from '../../services/teamService';

export class TeamListController {
  proTeamList: TeamInfo[];
  farmTeamList: TeamInfo[];
  loadingProTeamList = true;
  loadingFarmTeamList = true;
  loadingProTeamListFailed = false;
  loadingFarmTeamListFailed = false;

  static $inject = ['$timeout', 'teamService'];
  constructor(private $timeout: ng.ITimeoutService, private teamService: TeamService) {
      teamService.getTeamList({ league: 'pro' })
        .then((results) => {
          $timeout(() => {
            this.proTeamList = results;
            this.loadingProTeamList = false;
          });
        })
        .catch(() => {
          $timeout(() => {
            this.loadingProTeamList = false;
            this.loadingProTeamListFailed = true;
          });
        });

      teamService.getTeamList({ league: 'farm' })
        .then((results) => {
          $timeout(() => {
            this.farmTeamList = results;
            this.loadingFarmTeamList = false;
          });
        })
        .catch(() => {
          $timeout(() => {
            this.loadingFarmTeamList = false;
            this.loadingFarmTeamListFailed = true;
          });
        });
  }

}
