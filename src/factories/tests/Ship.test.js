import Ship from '../Ship';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('create and initialize a ship', () => {
    expect(ship).toEqual({ length: 3, direction: 'horizontal', hits: [] });
  });

  test('take a hit', () => {
    ship.hit(1);
    expect(ship.hits).toContain(1);
  });

  test('ship sinks', () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBeTruthy();
  });
});
