import Archetype from './Archetype';
import { EnergyType } from '../Energy';

class Necromancer extends Archetype {
  readonly energyType: EnergyType;
  private static necromancerAmount = 0;

  constructor(private necromancerName: string) {
    super(necromancerName);
    this.energyType = 'mana';
    Necromancer.addNecromancer();
  }

  private static addNecromancer() {
    this.necromancerAmount += 1;
  }

  static createdArchetypeInstances() {
    return this.necromancerAmount;
  }
}

export default Necromancer;
