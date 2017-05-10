export class AppMenuController {
  menuItems: MenuItem[] = [
    {
      text: 'Stats',
      subItems: [
        {
          text: 'Players',
          url: '#!/playerStats'
        },
        {
          text: 'Goalies',
          url: '#!/goalieStats'
        }
      ]
    },
    {
      text: 'Teams',
      url: '#!/teams'
    }
  ];
}
