export class AppMenuController {
  menuItems: MenuItem[] = [
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
    }
  ];
}
