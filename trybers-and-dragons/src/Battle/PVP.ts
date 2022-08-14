import Fighter from '../Fighter';
import Battle from './Battle';

class PVP extends Battle {
  constructor(protected player1: Fighter, protected player2: Fighter) {
    super(player1);
  }

  // Should return 1 if player wins, -1 otherwise
  fight(): number {
    let result = 0;
    while (result === 0) {
      this.player1.attack(this.player2);
      this.player2.attack(this.player1);
      if (this.player2.lifePoints <= 0) result = 1;
      if (this.player1.lifePoints <= 0) result = -1;
    }
    return result;
  }

  // fight(): number {
  //   this.player1.attack(this.player2);
  //   this.player2.attack(this.player1);
  //   return this.player2.lifePoints < 0 ? 1 : -1;
  // }
}

export default PVP;
