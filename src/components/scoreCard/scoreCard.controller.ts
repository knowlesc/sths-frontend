import { GameInfo } from '../../models/schedule/gameInfo';

export class ScoreCardController {

  gameInfo: GameInfo;

  get visitorRecord() {
    const w = this.gameInfo.VTotalWins;
    const l = this.gameInfo.VTotalLosses;
    const o = this.gameInfo.VTotalOther;
    const streak = this.gameInfo.VStreak;

    return `(${w}-${l}-${o}, ${streak})`;
  }

  get homeRecord() {
    const w = this.gameInfo.HTotalWins;
    const l = this.gameInfo.HTotalLosses;
    const o = this.gameInfo.HTotalOther;
    const streak = this.gameInfo.HStreak;

    return `(${w}-${l}-${o}, ${streak})`;
  }
}
