import { ScheduleService } from '../../services/scheduleService';
import { LeagueService } from '../../services/leagueService';
import { TransactionsGridService } from '../../grids/transactionsGrid/transactionsGrid.service';
import { transactionsGridColumns } from '../../grids/transactionsGrid/transactionsGrid.columns';
import { GridOptions } from '../../components/grid/models/gridOptions';

export class AppMainController {
  picOfTheDayConfig: { imgUrl: string; caption: string };
  loadingUpcomingGames = true;
  loadingRecentGames = true;
  loadingRecentNews = true;
  upcomingGames: {}[];
  recentGames: {}[];
  recentNews: {};
  gridOptions: GridOptions;

  static $inject = ['$timeout', 'scheduleService', 'leagueService', 'transactionsGridService'];
  constructor(private $timeout: ng.ITimeoutService,
    private scheduleService: ScheduleService,
    private leagueService: LeagueService,
    private transactionsGridService: TransactionsGridService) {
    leagueService.getNews()
      .then((news) => {
        $timeout(() => {
          this.recentNews = news;
          this.loadingRecentNews = false;
        });
      })
      .catch(() => {
        $timeout(() => {
          this.loadingRecentNews = false;
        });
      });

    leagueService.getLeagueInfo()
      .then((leagueInfo) => {
        const currentDay = leagueInfo.ScheduleNextDay;
        const daysPerSim = leagueInfo.DefaultSimulationPerDay;
        scheduleService.getSchedule({
          startDay: currentDay - daysPerSim,
          endDay: currentDay + daysPerSim
        })
        .then((results) => {
          $timeout(() => {
            this.upcomingGames = results.rows.filter((row) => row.Play === 'False');
            this.recentGames = results.rows.filter((row) => row.Play === 'True');
            this.loadingUpcomingGames = false;
            this.loadingRecentGames = false;
          });
        })
        .catch(() => {
          $timeout(() => {
            this.loadingUpcomingGames = false;
            this.loadingRecentGames = false;
          });
        });
      })
      .catch(() => {
        $timeout(() => {
          this.loadingUpcomingGames = false;
          this.loadingRecentGames = false;
        });
      });

    leagueService.getPicOfTheDay()
      .then((config) => {
        if (config.imgUrl && config.caption) {
          this.picOfTheDayConfig = config;
        }
      })
      .catch(() => {
        // No problem
      });

    this.transactionsGridService.types = null;

    this.gridOptions = new GridOptions();
    this.gridOptions.dataSource = this.transactionsGridService;
    this.gridOptions.columns = transactionsGridColumns();
  }
}
