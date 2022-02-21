import Player from '../Player';
import Gameboard from '../Gameboard';
import Ship from '../Ship';

describe('Player', () => {
  let user;
  let enemyBoard;
  let ship;

  beforeEach(() => {
    user = new Player('User');
    ship = new Ship(3);
    enemyBoard = new Gameboard();
  });

  test('create and initialize a player', () => {
    expect(user).toEqual({
      name: 'User',
      hitCoordinates: [],
    });
  });

  test('attack enemy board', () => {
    enemyBoard.placeShip(ship, 1, 1, true);
    user.attack(1, 1, enemyBoard);
    user.attack(2, 1, enemyBoard);
    user.attack(3, 1, enemyBoard);
    expect(enemyBoard.isGameOver()).toBe(true);
  });

  test('random attack', () => {
    enemyBoard.placeShip(ship, 1, 1, true);
    for (let i = 0; i < 100; i++) {
      user.randomAttack(enemyBoard);
    }
    expect(enemyBoard.isGameOver()).toBe(true);
  });
});
