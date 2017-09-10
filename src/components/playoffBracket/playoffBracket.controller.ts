import { PlayoffStandings } from './../../models/playoffs/playoffStandings';

interface BracketSeries {
  topTeam: string;
  topScore: number;
  bottomTeam: string;
  bottomScore: number;
}

export class PlayoffBracketController {
  seriesWinCount = 4;
  rounds: BracketSeries[][] = [];

  standings: PlayoffStandings[];

  $onInit() {
    if (!this.standings) {
      return;
    }

    const seriesToBracketSeries = (series: PlayoffStandings) => {
      return {
        topTeam: series.HomeName,
        topScore: series.HomeWin,
        bottomTeam: series.VisitorName,
        bottomScore: series.VisitorWin
      };
    };

    let currentRoundNumber = Math.max(...this.standings.map((s) => s.Round));
    let currentRound = this.standings
      .filter((series) => series.Round === currentRoundNumber)
      .map(seriesToBracketSeries);

    this.rounds.push(currentRound);

    let teamsInRound = currentRound.length;
    while (currentRoundNumber > 1) {
      /* In order to make the series match up in the bracket, we need to know the order
         the teams are displayed in the next round, so that's why we're going backwards */
      const nextRoundOrder = this.getSeriesOrder(currentRound);

      teamsInRound *= 2;
      currentRoundNumber--;
      currentRound = this.standings
        .filter((series) => series.Round === currentRoundNumber)
        .map(seriesToBracketSeries)
        .sort((seriesA, seriesB) => {
          const aWinner = seriesA.bottomScore >= this.seriesWinCount ? seriesA.bottomTeam : seriesA.topTeam;
          const bWinner = seriesB.bottomScore >= this.seriesWinCount ? seriesB.bottomTeam : seriesB.topTeam;

          return nextRoundOrder.indexOf(aWinner) - nextRoundOrder.indexOf(bWinner);
        });

      this.rounds.unshift(currentRound);
    }
  }

  private getSeriesOrder(round: BracketSeries[]) {
    const teamNames: string[] = [];

    round.forEach((series) => {
      teamNames.push(series.topTeam);
      teamNames.push(series.bottomTeam);
    });

    return teamNames;
  }
}
