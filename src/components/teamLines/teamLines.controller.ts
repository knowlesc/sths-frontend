import { TeamLines } from './../../models/teams/teamLines';
import { TeamService } from './../../services/teamService';

export class TeamLinesController {
  loading = true;
  loadingFailed = false;
  team: number;
  lines: TeamLines;

  static $inject = ['$timeout', 'teamService', 'draftService'];
  constructor(private $timeout: ng.ITimeoutService,
    private teamService: TeamService) {

  }

  $onInit() {
    if (!this.team) {
      return;
    }

    this.teamService.getTeamLines({ id: this.team, league: 'pro' })
      .then((lines) => {
        this.$timeout(() => {
          this.lines = lines;
          this.loading = false;
        });
      })
      .catch(() => {
        this.loading = false;
        this.loadingFailed = true;
      });
  }
}
