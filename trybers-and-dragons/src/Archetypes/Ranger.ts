import Archetype from './Archetype';
import { EnergyType } from '../Energy';

class Ranger extends Archetype {
  readonly energyType: EnergyType;
  private static rangerAmount = 0;

  constructor(private rangerName: string) {
    super(rangerName);
    this.energyType = 'stamina';
    Ranger.addRanger();
  }

  private static addRanger() {
    this.rangerAmount += 1;
  }

  static createdArchetypeInstances() {
    return this.rangerAmount;
  }
}

export default Ranger;
