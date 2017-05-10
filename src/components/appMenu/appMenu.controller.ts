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
      text: 'Teams',
      url: '#!/teams'
    }
  ];
}
