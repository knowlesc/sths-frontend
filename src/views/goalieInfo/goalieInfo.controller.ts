import { GoalieInfo } from '../../models/players/goalieInfo';

export class GoalieInfoController {
  page = 'GoalieInfo';

  static $inject = ['goalieInfo'];
  constructor(private goalieInfo: GoalieInfo) {

  }
}
