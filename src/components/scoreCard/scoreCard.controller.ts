import { GameInfo } from '../../models/schedule/gameInfo';

export class ScoreCardController {

  gameInfo: GameInfo;

  get visitorRecord() {
    const w = this.gameInfo.VTotalWins;
    const l = this.gameInfo.VTotalLosses;
    const o = this.gameInfo.VTotalOther;

    return `(${w}-${l}-${o})`;
  }

  get homeRecord() {
    const w = this.gameInfo.HTotalWins;
    const l = this.gameInfo.HTotalLosses;
    const o = this.gameInfo.HTotalOther;

    return `(${w}-${l}-${o})`;
  }
}
