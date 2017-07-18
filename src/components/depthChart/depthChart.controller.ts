import { PlayerService } from '../../services/playerService';
import { DraftService } from '../../services/draftService';
import { SkaterInfo } from '../../models/players/skaterInfo';
import { DraftPick } from '../../models/draft/draftPick';

export class DepthChartController {
  loading = true;
  loadingFailed = false;
  team: number;
  defense: SkaterInfo[];
  leftWingers: SkaterInfo[];
  rightWingers: SkaterInfo[];
  centers: SkaterInfo[];
  goalies: SkaterInfo[];
  draftPicks: DraftPick[];

  static $inject = ['$timeout', 'playerService', 'draftService'];
  constructor(private $timeout: ng.ITimeoutService,
    private playerService: PlayerService,
    private draftService: DraftService) {

  }

  get draftPickYears() {
    if (!this.draftPicks) {
      return null;
    }

    return this.draftPicks.map((pick) => pick.Year)
      .filter((item, i, array) => array.indexOf(item) === i);
  }

  getDraftPicksInYear(year: number) {
    if (!this.draftPicks) {
      return null;
    }

    // https://gist.github.com/ferronrsmith/5630696
    const ordinal = (n: number) => {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;

      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return this.draftPicks.filter((pick) => pick.Year === year)
      .map((pick) => pick.FromTeam.toString() === this.team.toString()
        ? ordinal(pick.Round)
        : `${ordinal(pick.Round)} (From ${pick.FromTeamAbbre})`)
      .join(', ');
  }

  $onInit() {
    if (!this.team) {
      return;
    }

    const fields = ['Name', 'Age', 'Position', 'Overall', 'PO', 'UniqueID'].join(',');

    Promise.all([
      this.playerService.getSkaterInfo({ fields: fields, team: this.team, sort: '-Overall' }),
      this.playerService.getGoalieInfo({ fields: fields, team: this.team, sort: '-Overall' }),
      this.draftService.getDraftPicks({ team: this.team })
    ]).then((results) => {
      this.$timeout(() => {
        this.draftPicks = results[2];
        this.goalies = results[1].rows;
        const skaters = results[0].rows;

        this.defense = skaters.filter((skater) => skater.Position === 'D');
        this.leftWingers = skaters.filter((skater) => skater.Position.indexOf('LW') >= 0);
        this.rightWingers = skaters.filter((skater) => skater.Position.indexOf('RW') >= 0);
        this.centers = skaters.filter((skater) => skater.Position.indexOf('C') >= 0);

        this.loading = false;
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
