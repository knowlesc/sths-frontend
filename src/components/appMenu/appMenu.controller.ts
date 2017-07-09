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
          },
          {
            text: 'Injuries',
            url: '#!/injuries'
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
        text: 'Standings',
        url: '#!/standings'
      },
      {
        text: 'Transactions',
        subItems: [
          {
            text: 'Waivers',
            url: '#!/waivers'
          },
          {
            text: 'Trades',
            url: '#!/trades'
          }
        ]
      },
      {
        text: 'League',
        subItems: [
          {
            text: 'Generated Pages',
            url: config.generatedSiteUrl
          },
          {
            text: 'Client File',
            url: `${config.generatedSiteUrl}/${config.clientFileName}`
          }
        ]
      }
    ];
  }

  menuItems: MenuItem[];
}
