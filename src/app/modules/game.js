import Wallet from './wallet'
import Result from './result'
import Stats from './gameStats'
import Draw from './draw'
import Progress from './progress'
import dolarImageSource from '../assets/img/dolar.png'

export default class Game {
    constructor(money, goals) {

        this.wallet = new Wallet(money);
        this.stats = new Stats();
        this.cards = new Draw();
        this.progress = new Progress(goals)
        this.dolarImage = dolarImageSource;

        // bind to object game
        document.getElementById('start').addEventListener('click', this.startGame.bind(this))
        this.boards = document.querySelectorAll('.draw__img');
        this.input = document.getElementById('bet');
        this.spanWallet = document.getElementById('wallet');
        this.spanResult = document.getElementById('result');
        this.spanGamesNumber = document.getElementById('games');
        this.spanWins = document.getElementById('wins');
        this.spanLosses = document.getElementById('losses');
        this.progressBars = document.querySelectorAll('.bar__inner');
        this.goalsText = document.querySelectorAll('.goal__status');
        this.goalsValue = document.querySelectorAll('.goal__txt_value');
        this.render();
    }

    render(cards = [this.dolarImage, this.dolarImage, this.dolarImage], money = this.wallet.showWallet(), result = '', stats = [0, 0, 0], bet = 0, moneyWon = 0, progress = this.progress.calculateProgress(this.wallet.showWallet())) {

        this.boards.forEach((board, index) => board.src = cards[index]);

        this.spanWallet.textContent = money;

        if (result) {
            result = `+ ${moneyWon} $`;
            this.spanResult.classList.remove('red-score')
        } else if (!result && result !== '') {
            result = `- ${bet} $`;
            this.spanResult.classList.add('red-score')
        }
        this.spanResult.textContent = result;
        this.spanGamesNumber.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.spanLosses.textContent = stats[2];
        this.input.value = '';
        // display goals values
        this.goalsValue.forEach((val, index) => val.textContent = this.progress.goals[index])
        // display progress in width, if 100% goal is completed
        this.progressBars.forEach((bar, index) => {

            if (progress[index] > 100) {
                bar.classList.add('completed')
                this.goalsText[index].textContent = 'COMPLETED!';
                this.goalsText[index].classList.add('animation')

            } else {
                bar.style.width = `${progress[index]}%`;
            }
        })
    }

    startGame() {

        if (this.input.value < 1) return alert('too small bet');

        const bet = Math.floor(this.input.value);

        if (!this.wallet.checkWallet(bet)) return alert(`you don't have enough money to play`)

        this.wallet.updateWallet(bet, '-');

        const cards = this.cards.getImages();

        const result = Result.checkWinner(cards);

        const moneyWon = Result.moneyWon(result, bet)

        this.wallet.updateWallet(moneyWon);

        this.stats.addResult(result, bet);

        let progress = this.progress.calculateProgress(this.wallet.showWallet());

        this.render(cards, this.wallet.showWallet(), result, this.stats.checkStats(), bet, moneyWon, progress);
    }
}
