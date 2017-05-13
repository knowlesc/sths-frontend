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
    }
  ];
}
