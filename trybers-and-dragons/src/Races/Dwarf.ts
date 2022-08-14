import Race from './Race';

class Dwarf extends Race {
  readonly maxLifePoints: number;
  private static dwarfAmount = 0;

  constructor(private dwarfName: string, private dwarfDexterity: number) {
    super(dwarfName, dwarfDexterity);
    this.maxLifePoints = 80;
    Dwarf.addDwarf();
  }

  private static addDwarf() {
    this.dwarfAmount += 1;
  }

  static createdRacesInstances(): number {
    return this.dwarfAmount;
  }
}

export default Dwarf;
