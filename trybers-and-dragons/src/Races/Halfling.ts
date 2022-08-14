import Race from './Race';

class Halfling extends Race {
  readonly maxLifePoints: number;
  private static halflingAmount = 0;

  constructor(private halflingName: string, private halflingDexterity: number) {
    super(halflingName, halflingDexterity);
    this.maxLifePoints = 60;
    Halfling.addHalfling();
  }

  private static addHalfling() {
    this.halflingAmount += 1;
  }

  static createdRacesInstances(): number {
    return this.halflingAmount;
  }
}

export default Halfling;