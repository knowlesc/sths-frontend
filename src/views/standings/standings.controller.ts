import { TeamService } from '../../services/teamService';
import { TeamStatsParams } from '../../models/teams/teamStatsParams';
import { TeamStats } from '../../models/teams/teamStats';

interface Conference {
  name: string;
  divisions: string[];
}

export class StandingsController {
  loading = true;
  loadingFailed = false;
  selectedLeague: 'pro' | 'farm' = 'pro';
  selectedFormat: 'Conference' | 'Division' | 'League' | 'Wildcard';
  groups: { title: string; teams: TeamStats[] }[] = [];
  teams: TeamStats[];
  conferences: Conference[] = [];

  fields = ['Points', 'Streak', 'TotalL10Losses', 'TotalL10Other', 'TotalL10Wins', 'TotalLosses', 'TotalOther',
    'TotalWins', 'Name', 'GP', 'GF', 'GA', 'Conference', 'Division', 'StandingPlayoffTitle', 'ROW', 'TotalHomeWins',
    'TotalHomeLosses', 'TotalHomeOther', 'Number', 'LeagueRank', 'ConferenceRank', 'PointsPCT'];

  static $inject = ['$timeout', 'teamService'];
  constructor(private $timeout: ng.ITimeoutService, private teamService: TeamService) {
    this.leagueUpdated();
  }

  updateFormat(format: 'Conference' | 'Division' | 'League' | 'Wildcard') {
    this.groups = [];

    if (this.loading || this.loadingFailed) {
      return;
    }

    this.selectedFormat = format;

    if (this.selectedFormat === 'League') {
      this.groups.push({
        title: 'League',
        teams: this.teams.sort((a, b) => a.LeagueRank - b.LeagueRank)
      });
    } else if (this.selectedFormat === 'Conference') {
      this.conferences.forEach((conference) => {
          this.groups.push({
            title: conference.name,
            teams: this.teams.filter((team) => team.Conference === conference.name)
              .sort((a, b) => a.ConferenceRank - b.ConferenceRank)
          });
        });
    } else if (this.selectedFormat === 'Division') {
      this.conferences.forEach((conference) => {
        conference.divisions.forEach((division) =>
          this.groups.push({
            title: division,
            teams: this.teams.filter((team) => team.Division === division)
              .sort((a, b) => a.ConferenceRank - b.ConferenceRank)
          }));
        });
    } else if (this.selectedFormat === 'Wildcard') {
      this.conferences.forEach((conference) => {
        const wildCardTeams: TeamStats[] = [];
        conference.divisions.forEach((division) => {
          const teamsInDivision = this.teams.filter((team) => team.Division === division)
            .sort((a, b) => a.ConferenceRank - b.ConferenceRank);

          this.groups.push({
            title: division,
            teams: teamsInDivision.slice(0, 3)
          });

          wildCardTeams.push(...teamsInDivision.slice(3));
        });

        this.groups.push({
          title: 'Wildcard',
          teams: wildCardTeams.sort((a, b) => a.ConferenceRank - b.ConferenceRank)
        });
      });
    }
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
          this.conferences = [];

          this.teams.forEach((team) => {
            const existingConference = this.conferences.filter((conference) => conference.name === team.Conference);
            if (existingConference.length === 0) {
              this.conferences.push({
                name: team.Conference,
                divisions: []
              });
            } else {
              if (existingConference[0].divisions.indexOf(team.Division) < 0) {
                existingConference[0].divisions.push(team.Division);
              }
            }
          });

          this.updateFormat('Wildcard');
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
