import { SkaterInfo } from '../../models/players/skaterInfo';

export class SkaterInfoController {
  page = 'PlayerInfo';

  static $inject = ['skaterInfo'];
  constructor(private skaterInfo: SkaterInfo) {

  }
}
