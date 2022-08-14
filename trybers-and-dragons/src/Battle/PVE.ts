import Fighter, { SimpleFighter } from '../Fighter';
import Battle from './Battle';

class PVE extends Battle {
  constructor(protected player: Fighter, protected monsters: SimpleFighter[]) {
    super(player);
  }

  // Should return 1 if player wins, -1 otherwise
  fight(): number {
    let i = 0;
    while (i < this.monsters.length) {
      this.player.attack(this.monsters[i]);
      this.monsters[i].attack(this.player);
      if (this.player.lifePoints <= 0) return -1;
      if (this.monsters[i].lifePoints <= 0) i += 1;
    }
    return 1;
  }
}

export default PVE;
