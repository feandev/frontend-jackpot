import Wallet from './wallet'
import Result from './result'
import Stats from './gameStats'
import Draw from './draw'
import dolarImageSource from '../assets/img/dolar.png'

export default class Game {
    constructor(money) {

        this.wallet = new Wallet(money);
        this.stats = new Stats();
        this.colors = new Draw();
        this.dolarImage = dolarImageSource;

        // bind to object game
        document.getElementById('start').addEventListener('click', this.startGame.bind(this))
        this.boards = document.querySelectorAll('.game__img');
        this.input = document.getElementById('bet');
        this.spanWallet = document.getElementById('wallet');
        this.spanResult = document.getElementById('result');
        this.spanGamesNumber = document.getElementById('games');
        this.spanWins = document.getElementById('wins');
        this.spanLosses = document.getElementById('losses');
      
        this.render();

    }

    render(colors = [this.dolarImage, this.dolarImage, this.dolarImage], money = this.wallet.showWallet(), result ='', stats =[0, 0, 0], bet = 0, moneyWon = 0  ) {

        this.boards.forEach((board, index) => board.src = colors[index]);

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
        this.input.textContent = '';

    }

    startGame() {

        if (this.input.value < 1) return alert ('too small bet');

        const bet = Math.floor(this.input.value);

        if(!this.wallet.checkWallet(bet)) return alert (`you don't have enough money to play`)

        this.wallet.updateWallet(bet, '-');

        const colors = this.colors.getImages();

        const result = Result.checkWinner(colors);

        const moneyWon = Result.moneyWon(result, bet)

        this.wallet.updateWallet(moneyWon);

        this.stats.addResult(result, bet);
       
        this.render(colors, this.wallet.showWallet(), result, this.stats.checkStats(), bet, moneyWon );

    }
}
