export default class Progress {

  constructor(goals) {

    this.goals = goals;
  }

  calculateProgress(wallet) {

    let goalProgress = [];

    for (let i = 0; i < this.goals.length; i++) {
      const goal = Math.floor((wallet / this.goals[i]) * 100);
        goalProgress.push(goal);
    }
    
    return goalProgress;
  }
}