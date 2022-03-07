import Ship from './Ship';

const SIZE = 10;

class Gameboard {
  constructor() {
    this.board = [];
    this.shots = [];
    this.initialize();
  }

  initialize() {
    for (let i = 0; i < SIZE; i++) {
      this.board[i] = [];
      this.shots[i] = [];
      for (let j = 0; j < SIZE; j++) {
        this.board[i][j] = null;
        this.shots[i][j] = false;
      }
    }
  }

  placeShip(ship, row, column, isVertical) {
    if (!this.isValidPlacement(ship, row, column, isVertical)) {
      return false;
    }
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][column] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[row][column + i] = ship;
      }
    }
    return true;
  }

  placeShipsRandomly() {
    const ships = [];
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const destroyer = new Ship(3);
    const submarine = new Ship(3);
    const patrolBoat = new Ship(2);
    ships.push(carrier, battleship, destroyer, submarine, patrolBoat);

    let succesfulPlacemets = 0;

    while (succesfulPlacemets < 5) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const isVertical = Math.floor(Math.random() * 2) === 1;

      if (this.placeShip(ships[succesfulPlacemets], row, column, isVertical)) {
        succesfulPlacemets++;
      }
    }
  }

  getEmptyFields() {
    let emptyFields = 0;

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (this.board[i][j] === null) {
          emptyFields++;
        }
      }
    }
    return emptyFields;
  }

  isValidPlacement(ship, row, column, isVertical) {
    // if placement is out of gameboard
    if (row < 0 || row > SIZE - 1 || column < 0 || column > SIZE - 1) {
      return false;
    }

    // ship don't fit in gameboard
    if (isVertical) {
      if (row + ship.length > SIZE) {
        return false;
      }
    } else if (column + ship.length > SIZE) {
      return false;
    }

    // if placement is already taken
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][column]) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][column + i]) {
          return false;
        }
      }
    }

    return true;
  }

  receiveAttack(row, column) {
    // check if attack is valid
    if (row < 0 || row > SIZE - 1 || column < 0 || column > SIZE - 1) {
      return false;
    }

    if (this.board[row][column]) {
      let hitIndex = 0;
      // is vertical
      if (row > 0 && this.board[row - 1][column] === this.board[row][column]) {
        for (let i = 1; i < row; i++) {
          if (this.board[row][column] === this.board[i][column]) {
            hitIndex++;
          }
        }
      // is horizontal
      } else if (column > 0 && this.board[row][column - 1] === this.board[row][column]) {
        for (let i = 1; i < column; i++) {
          if (this.board[row][column] === this.board[row][i]) {
            hitIndex++;
          }
        }
      }

      this.board[row][column].hit(hitIndex);
      this.shots[row][column] = true;
      return true;
    }

    this.shots[row][column] = true;
    return false;
  }

  isGameOver() {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (this.board[i][j]) {
          if (!this.board[i][j].isSunk()) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

export default Gameboard;
