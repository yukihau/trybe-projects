import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

class Character implements Fighter {
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
  
  constructor(
    private name: string,
    private _race = new Elf(name, 10),
    private _archetype: Archetype = new Mage(name),
  ) {
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._dexterity = this._race.dexterity;
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get race(): Race { return this._race; }

  get archetype(): Archetype { return this._archetype; }

  get lifePoints(): number { return this._lifePoints; }

  get strength(): number { return this._strength; }

  get defense(): number { return this._defense; }

  get dexterity(): number { return this._dexterity; }

  get energy(): Energy {
    return { 
      type_: this._energy.type_,
      amount: this._energy.amount,
    };
  }

  attack(enemy: SimpleFighter) {
    enemy.receiveDamage(this._strength);
  }

  special(enemy: SimpleFighter) {
    if (this._energy.amount >= 2) {
      enemy.receiveDamage(this._strength * (getRandomInt(0.5, 2.5)));
      this._energy.amount -= 2;
    } else {
      throw Error(`Not enough ${this._energy.type_} to perform this attack!`);
    }
  }

  levelUp() {
    const hpRoll = getRandomInt(1, 10);
    const strRoll = getRandomInt(1, 10);
    const dexRoll = getRandomInt(1, 10);
    const defRoll = getRandomInt(1, 10);

    this._maxLifePoints += hpRoll;
    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }

    this._lifePoints = this._maxLifePoints;

    this._energy.amount = 10;

    this._strength += strRoll;

    this._dexterity += dexRoll;

    this._defense += defRoll;
  }

  receiveDamage(attackPoints: number) {
    const mitigatedDamage = attackPoints - this._defense;

    if (mitigatedDamage > 0) {
      this._lifePoints -= mitigatedDamage;
      if (this._lifePoints <= 0) this._lifePoints = -1;
    }

    return this._lifePoints;
  }
}

export default Character;
