import Gameboard from '../Gameboard';
import Ship from '../Ship';

describe('Ship', () => {
  let gameboard;
  let ship;
  const testBoard = [];
  const testMissShots = [];

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship(3);

    for (let i = 0; i < 10; i++) {
      testBoard[i] = [];
      testMissShots[i] = [];
      for (let j = 0; j < 10; j++) {
        testBoard[i][j] = null;
        testMissShots[i][j] = false;
      }
    }
  });

  test('create and initialize the gameboard', () => {
    expect(gameboard).toEqual({
      board: testBoard,
      missShots: testMissShots,
    });
  });

  test('place a ship', () => {
    gameboard.placeShip(ship, 1, 1, true);
    testBoard[1][1] = ship;
    testBoard[2][1] = ship;
    testBoard[3][1] = ship;
    expect(gameboard).toEqual({
      board: testBoard,
      missShots: testMissShots,
    });
  });

  test('prevent placement of a ship outside gameboard', () => {
    expect(gameboard.isValidPlacement(ship, 8, 8, true)).toBe(false);
    expect(gameboard.isValidPlacement(ship, 10, 10, true)).toBe(false);
  });

  test('prevent placement of a ship when place is already taken', () => {
    gameboard.placeShip(ship, 1, 1, true);
    expect(gameboard.isValidPlacement(ship, 1, 1, true)).toBe(false);
    expect(gameboard.isValidPlacement(ship, 2, 1, true)).toBe(false);
    expect(gameboard.isValidPlacement(ship, 3, 1, true)).toBe(false);
  });

  test('receive attack', () => {
    gameboard.placeShip(ship, 1, 1, true);
    gameboard.receiveAttack(2, 1);
    expect(gameboard.board[2][1].hits.includes(1)).toBe(true);
  });

  test('keep track of miss attack', () => {
    gameboard.placeShip(ship, 1, 1, true);
    gameboard.receiveAttack(2, 2);
    expect(gameboard.missShots[2][2]).toBe(true);
  });

  test('report if all ships have been sunk', () => {
    gameboard.placeShip(ship, 1, 1, true);
    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(2, 1);
    gameboard.receiveAttack(3, 1);
    expect(gameboard.isGameOver()).toBe(true);
  });
});
