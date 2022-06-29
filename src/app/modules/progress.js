export default class Progress {

  constructor(junior, mid, senior) {

    this.goals = [this.junior = junior, this.mid = mid, this.senior = senior ]
  }

  calculateProgress(wallet) {

    let progresses = [];

    for (let i = 0; i < this.goals.length; i++) {
      
      const progress = Math.floor((wallet / this.goals[i]) * 100)

      progresses.push(progress)
    }

    return progresses;

  }
}