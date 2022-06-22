export default class Stats {
    constructor() {
        this.results = [];
    }

    // metody w prototypie, bo mozemy odwolac sie do wlasciwosci w konstruktorze
    addResult(win, bet) {
        this.results.push({win, bet});
    }

    checkStats() {
        let gamesTotal = this.results.length;

        let gamesWon = this.results.filter(result => result.win).length;

        let gamesLost = gamesTotal - gamesWon;

        return [gamesTotal, gamesWon, gamesLost]

    }
}
