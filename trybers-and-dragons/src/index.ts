import Battle, { PVE, PVP } from './Battle';
import Character from './Character';
import Dragon from './Dragon';
import Monster from './Monster';

// Players
const player1 = new Character('Anya');
const player2 = new Character('Laurice');
const player3 = new Character('Heather');

// Monsters
const monster1 = new Monster();
const monster2 = new Dragon();

// Battle
const pvp = new PVP(player2, player3);
const pve = new PVE(player1, [monster1, monster2]);
const runBattles = (battles: Battle[]) => {
  for (let i = 0; i < battles.length; i += 1) {
    battles[i].fight();
  }
};

// Actions
player1.levelUp();
player1.levelUp();
player1.levelUp();

export { player1, player2, player3, monster1, monster2, pvp, pve, runBattles };