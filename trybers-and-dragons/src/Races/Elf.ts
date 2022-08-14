import Race from './Race';

class Elf extends Race {
  readonly maxLifePoints: number;
  private static elfAmount = 0;

  constructor(private elfName: string, private elfDexterity: number) {
    super(elfName, elfDexterity);
    this.maxLifePoints = 99;
    Elf.addElf();
  }

  private static addElf() {
    this.elfAmount += 1;
  }

  static createdRacesInstances(): number {
    return this.elfAmount;
  }
}

export default Elf;
