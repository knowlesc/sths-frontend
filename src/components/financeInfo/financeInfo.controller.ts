import { TeamService } from '../../services/teamService';
import { TeamFinances } from '../../models/teams/teamFinances';

export class FinanceInfoController {
  team: number;
  league: 'pro' | 'farm';
  finances: TeamFinances;
  loading = true;
  loadingFailed = false;

  static $inject = ['$timeout', 'teamService'];
  constructor(private $timeout: ng.ITimeoutService, private teamService: TeamService) {

  }

  get totalCapacity() {
    return this.finances.ArenaCapacityL1 + this.finances.ArenaCapacityL2 +
      this.finances.ArenaCapacityL3 + this.finances.ArenaCapacityL4 +
      this.finances.ArenaCapacityLuxury;
  }

  get totalAverageAttendance() {
    return Math.round((this.finances.AttendanceL1 +
      this.finances.AttendanceL2 + this.finances.AttendanceL3 +
      this.finances.AttendanceL4 + this.finances.AttendanceLuxury)
      / this.finances.HomeGP);
  }

  averageAttendance(level: 'L1' | 'L2' | 'L3' | 'L4' | 'Luxury') {
    const attendance = Math.round(
      (level === 'L1' ? this.finances.AttendanceL1 :
      level === 'L2' ? this.finances.AttendanceL2 :
      level === 'L3' ? this.finances.AttendanceL3 :
      level === 'L4' ? this.finances.AttendanceL4 :
      this.finances.AttendanceLuxury) / this.finances.HomeGP);

    const capacity =
      level === 'L1' ? this.finances.ArenaCapacityL1 :
      level === 'L2' ? this.finances.ArenaCapacityL2 :
      level === 'L3' ? this.finances.ArenaCapacityL3 :
      level === 'L4' ? this.finances.ArenaCapacityL4 :
      this.finances.ArenaCapacityLuxury;

    const pct = ((attendance / capacity) * 100).toFixed(1);

    return `${attendance}/${capacity} (${pct}%)`;
  }

  $onInit() {
    if (!this.team || !this.league) {
      return;
    }

    this.teamService.getTeamFinances({ id: this.team.toString(), league: this.league })
      .then((results) => {
        this.$timeout(() => {
          this.finances = results;
          this.loading = false;
        });
      })
      .catch(() => {
        this.$timeout(() => {
          this.loadingFailed = true;
          this.loading = false;
        });
      });
  }
}
