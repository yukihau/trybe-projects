import Archetype from './Archetype';
import { EnergyType } from '../Energy';

class Warrior extends Archetype {
  readonly energyType: EnergyType;
  private static warriorAmount = 0;

  constructor(private warriorName: string) {
    super(warriorName);
    this.energyType = 'stamina';
    Warrior.addWarrior();
  }

  private static addWarrior() {
    this.warriorAmount += 1;
  }

  static createdArchetypeInstances() {
    return this.warriorAmount;
  }
}

export default Warrior;
