class Player {
  constructor(name) {
    this.name = name;
    this.hitCoordinates = [];
  }

  attack(x, y, gameboard) {
    const findCoordinates = this.checkCoordinates(x, y);
    if (findCoordinates != null) {
      return false;
    }
    this.hitCoordinates.push([x, y]);
    gameboard.receiveAttack(x, y);
    return true;
  }

  randomAttack(gameboard) {
    if (this.hitCoordinates.length === 100) {
      return false;
    }

    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let findCoordinates = this.checkCoordinates(x, y);

    while (findCoordinates != null) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      findCoordinates = this.checkCoordinates(x, y);
    }

    this.hitCoordinates.push([x, y]);
    gameboard.receiveAttack(x, y);
    return true;
  }

  checkCoordinates(x, y) {
    return this.hitCoordinates.find(
      (element) => element[0] === x && element[1] === y,
    );
  }
}

export default Player;
