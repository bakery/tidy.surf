import { slugify } from './helpers';

describe('slugify', () => {
  test('preserves dashes', () => {
    expect(slugify('Harley-davidson')).toEqual('harley-davidson');
    expect(slugify('Ski-Doo')).toEqual('ski-doo');
    expect(slugify('Can-Am')).toEqual('can-am');
    expect(slugify('Carry-On Trailer Corporation')).toEqual('carry-on-trailer-corporation');
  });

  test('replaces spaces with dashes', () => {
    expect(slugify('Something else')).toEqual('something-else');
  });

  test('removes extra spaces around dashes', () => {
    expect(slugify('FLTRXS - Road Glide® Special')).toEqual('fltrxs-road-glide-special');
    expect(slugify('FLTRXS -Road Glide® Special')).toEqual('fltrxs-road-glide-special');
  });

  test('converts forward slashes to dashes', () => {
    expect(slugify('Motorcycle / Scooter')).toEqual('motorcycle-scooter');
    expect(slugify('Motorcycle/Scooter')).toEqual('motorcycle-scooter');
  });
});
