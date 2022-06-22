export default class Wallet {
    constructor(money) {
        let _money = money;
        this.showWallet = () => _money;
        this.checkWallet = (value) => {

           if  (_money > value) {
                return true
           } else {
               return false
           }
        }

        this.updateWallet = (value, type = '+') => {

            if (typeof value === 'number' && !isNaN(value)) {

                if (type === '+') {
                    return _money += value;
                } else if (type === '-') {
                    return _money -= value;
                } else {
                    throw new Error('niepoprawny type')
                }
            } else {
                throw new Error ('podaj poprawna liczba')
            }
        }
    }
}


