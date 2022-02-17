class Ship {
  constructor(length) {
    this.length = length;
    this.direction = 'horizontal';
    this.hits = [];
  }

  hit(position) {
    if (
      this.hits.includes(position)
      || position < 0
      || position >= this.length
    ) {
      return;
    }
    this.hits.push(position);
  }

  isSunk() {
    return this.hits.length === this.length;
  }
}

export default Ship;
