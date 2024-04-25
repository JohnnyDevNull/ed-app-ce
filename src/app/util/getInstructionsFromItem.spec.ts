import { IDrinkDetailItem } from '../types/DrinkItem.interface';
import { getInstructionsFromItem } from './getInstructionsFromItem';

describe('getInstructionsFromItem', () => {
  it('should return main instructions', () => {
    expect(getInstructionsFromItem({
      strInstructions: 'Instr Main',
      strInstructionsDE: 'Instr DE',
      strInstructionsES: 'Instr ES',
      strInstructionsFR: 'Instr FR',
      strInstructionsIT: 'Instr IT',
    } as IDrinkDetailItem)).toEqual('Instr Main');
  })

  it('should return DE instructions', () => {
    expect(getInstructionsFromItem({
      strInstructions: '',
      strInstructionsDE: 'Instr DE',
      strInstructionsES: '',
      strInstructionsFR: '',
      strInstructionsIT: '',
    } as IDrinkDetailItem)).toEqual('Instr DE');
  })

  it('should return ES instructions', () => {
    expect(getInstructionsFromItem({
      strInstructions: '',
      strInstructionsDE: '',
      strInstructionsES: 'Instr ES',
      strInstructionsFR: '',
      strInstructionsIT: '',
    } as IDrinkDetailItem)).toEqual('Instr ES');
  })

  it('should return FR instructions', () => {
    expect(getInstructionsFromItem({
      strInstructions: '',
      strInstructionsDE: '',
      strInstructionsES: '',
      strInstructionsFR: 'Instr FR',
      strInstructionsIT: '',
    } as IDrinkDetailItem)).toEqual('Instr FR');
  })

  it('should return IT instructions', () => {
    expect(getInstructionsFromItem({
      strInstructions: '',
      strInstructionsDE: '',
      strInstructionsES: '',
      strInstructionsFR: 'Instr IT',
      strInstructionsIT: '',
    } as IDrinkDetailItem)).toEqual('Instr IT');
  })
});
