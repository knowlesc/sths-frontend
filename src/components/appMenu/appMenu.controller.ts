import { Config } from '../../models/config';

export class AppMenuController {
  menuItems: MenuItem[];
  menuItemsMore: MenuItem[];
  searchText: string;

  static $inject = ['config', '$location'];
  constructor(private config: Config, private $location: ng.ILocationService) {
    this.menuItems = [
      {
        text: 'Stats',
        subItems: [
          { text: 'Skaters', url: '#!/skaterStats' },
          { text: 'Goalies', url: '#!/goalieStats' },
          { text: 'Teams', url: '#!/teamStats' }
        ]
      },
      {
        text: 'Ratings',
        subItems: [
          { text: 'Skaters', url: '#!/skaters' },
          { text: 'Goalies', url: '#!/goalies' },
          { text: 'Coaches', url: '#!/coaches' }
        ]
      },
      { text: 'Teams', url: '#!/teams', includedInMore: true },
      { text: 'Schedule', url: '#!/schedule', includedInMore: true },
      { text: 'Standings', url: '#!/standings', includedInMore: true },
      {
        text: 'Transactions',
        subItems: [
          { text: 'Waivers', url: '#!/waivers' },
          { text: 'Trades', url: '#!/trades' },
          { text: 'Injuries', url: '#!/injuries' },
          { text: 'Suspensions', url: '#!/suspensions' }
        ]
      },
      {
        text: 'League',
        subItems: [
          { text: 'Generated Pages', url: config.generatedSiteUrl },
          { text: 'Client File',  url: `${config.generatedSiteUrl}/${config.clientFileName}` }
        ]
      }
    ];

    this.menuItemsMore = [
      { text: 'Teams', url: '#!/teams' },
      { text: 'Schedule', url: '#!/schedule' },
      { text: 'Standings', url: '#!/standings' }
    ];
  }

  search() {
    if (this.searchText) {
      this.$location.url(`/search?q=${encodeURIComponent(this.searchText)}`);
    }
  }
}
