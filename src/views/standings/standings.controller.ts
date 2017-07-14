import { TeamService } from '../../services/teamService';
import { TeamStatsParams } from '../../models/teams/teamStatsParams';
import { TeamStats } from '../../models/teams/teamStats';

export class StandingsController {
  loading = true;
  loadingFailed = false;
  selectedLeague: 'pro' | 'farm' = 'pro';
  selectedFormat: 'Conference' | 'Division' | 'League';
  groups: { title: string; teams: TeamStats[] }[] = [];
  teams: TeamStats[];
  orderByField = 'Points';
  fields = ['Points', 'Streak', 'TotalL10Losses', 'TotalL10Other', 'TotalL10Wins', 'TotalLosses', 'TotalOther',
      'TotalWins', 'Name', 'GP', 'GF', 'GA', 'Conference', 'Division', 'StandingPlayoffTitle', 'ROW', 'TotalHomeWins',
      'TotalHomeLosses', 'TotalHomeOther', 'Number'];

  static $inject = ['$timeout', 'teamService'];
  constructor(private $timeout: ng.ITimeoutService, private teamService: TeamService) {
    this.leagueUpdated();
  }

  updateFormat(format: 'Conference' | 'Division' | 'League') {
    this.groups = [];

    if (this.loading || this.loadingFailed) {
      return;
    }

    this.selectedFormat = format;
    if (this.selectedFormat === 'League') {
      this.groups.push({
        title: 'League',
        teams: this.teams
      });
    } else if (this.selectedFormat === 'Conference') {
      this.teams.map((team) => team.Conference)
        .filter((item, index, array) => array.indexOf(item) === index)
        .forEach((name) => {
          this.groups.push({
            title: name,
            teams: this.teams.filter((team) => team.Conference === name)
          });
        });
    } else if (this.selectedFormat === 'Division') {
      this.teams.map((team) => team.Division)
        .filter((item, index, array) => array.indexOf(item) === index)
        .forEach((name) => {
          this.groups.push({
            title: name,
            teams: this.teams.filter((team) => team.Division === name)
          });
        });
    }
  }

  orderBy(field: string) {
    this.orderByField = field;
  }

  leagueUpdated(league: 'farm' | 'pro' = 'pro') {
    this.selectedLeague = league;
    this.loading = true;
    this.loadingFailed = false;

    const params: TeamStatsParams = {
      league: this.selectedLeague,
      fields: this.fields.join(',')
    };

    this.teamService.getTeamStats(params)
      .then((results) => {
        this.$timeout(() => {
          this.loading = false;
          this.teams = results.rows;
          this.updateFormat('League');
        });
      })
      .catch(() => {
        this.$timeout(() => {
          this.loading = false;
          this.loadingFailed = true;
        });
      });
  }
}
