import Tides from './tides'

describe('tides', () => {
  it('works', () => {
    expect(1 + 1).toEqual(2);
  });

  it('import works too', () => {
    expect(Tides.getTides).toBeDefined()
  })
});