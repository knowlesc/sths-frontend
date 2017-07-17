import { PlayerService } from '../../services/playerService';
import { SkaterInfo } from '../../models/players/skaterInfo';

export class DepthChartController {
  team: number;
  defense: SkaterInfo[];
  leftWingers: SkaterInfo[];
  rightWingers: SkaterInfo[];
  centers: SkaterInfo[];
  goalies: SkaterInfo[];

  static $inject = ['$timeout', 'playerService'];
  constructor(private $timeout: ng.ITimeoutService, private playerService: PlayerService) {

  }

  $onInit() {
    if (!this.team) {
      return;
    }

    const fields = ['Name', 'Age', 'Position', 'Overall', 'PO', 'UniqueID'].join(',');

    Promise.all([
      this.playerService.getSkaterInfo({ fields: fields, team: this.team, sort: '-Overall' }),
      this.playerService.getGoalieInfo({ fields: fields, team: this.team, sort: '-Overall' })
    ]).then((results) => {
      this.$timeout(() => {
        this.goalies = results[1].rows;
        const skaters = results[0].rows;

        this.defense = skaters.filter((skater) => skater.Position === 'D');
        this.leftWingers = skaters.filter((skater) => skater.Position.indexOf('LW') >= 0);
        this.rightWingers = skaters.filter((skater) => skater.Position.indexOf('RW') >= 0);
        this.centers = skaters.filter((skater) => skater.Position.indexOf('C') >= 0);
      });
    });
  }
}
