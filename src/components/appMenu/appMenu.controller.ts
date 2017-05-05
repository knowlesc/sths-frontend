export class AppMenuController {
  menuItems: MenuItem[] = [
    {
      text: 'Stats',
      subItems: [
        {
          text: 'Players',
          url: '#!/playerStats'
        }
      ]
    },
    {
      text: 'Teams',
      url: '#!/teams'
    }
  ];
}
