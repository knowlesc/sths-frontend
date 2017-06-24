import { Config } from '../../models/config';

export class AppMenuController {
  static $inject = ['config'];
  constructor(private config: Config) {
    this.menuItems = [
      {
        text: 'Stats',
        subItems: [
          {
            text: 'Skaters',
            url: '#!/skaterStats'
          },
          {
            text: 'Goalies',
            url: '#!/goalieStats'
          },
          {
            text: 'Teams',
            url: '#!/teamStats'
          }
        ]
      },
      {
        text: 'Players',
        subItems: [
          {
            text: 'Skaters',
            url: '#!/skaters'
          },
          {
            text: 'Goalies',
            url: '#!/goalies'
          }
        ]
      },
      {
        text: 'Teams',
        url: '#!/teams'
      },
      {
        text: 'Schedule',
        url: '#!/schedule'
      },
      {
        text: 'Generated Pages',
        url: config.generatedSiteUrl
      }
    ];
  }

  menuItems: MenuItem[];
}
