import Archetype from './Archetype';
import { EnergyType } from '../Energy';

class Mage extends Archetype {
  readonly energyType: EnergyType;
  private static mageAmount = 0;

  constructor(private mageName: string) {
    super(mageName);
    this.energyType = 'mana';
    Mage.addMage();
  }

  private static addMage() { 
    this.mageAmount += 1;
  }

  static createdArchetypeInstances(): number {
    return this.mageAmount;
  }
}

export default Mage;
