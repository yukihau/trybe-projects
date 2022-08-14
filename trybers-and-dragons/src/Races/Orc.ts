import Race from './Race';

class Orc extends Race {
  readonly maxLifePoints: number;
  private static orcAmount = 0;
  
  constructor(private orcName: string, private orcDexterity: number) {
    super(orcName, orcDexterity);
    this.maxLifePoints = 74;
    Orc.addOrc();
  }

  private static addOrc() {
    this.orcAmount += 1;
  }

  static createdRacesInstances(): number {
    return this.orcAmount;
  }
}

export default Orc;
