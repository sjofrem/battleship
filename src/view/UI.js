import Gameboard from '../factories/Gameboard';
import Player from '../factories/Player';

class UI {
  constructor() {
    this.cpuBoard = new Gameboard();
    this.playerBoard = new Gameboard();
    this.user = new Player('user');
    this.cpu = new Player('cpu');
    this.playerTurn = true;
  }

  static createPlayerGameboard() {
    const game = document.getElementById('game');
    const user = document.createElement('div');
    const gamerTag = document.createElement('div');
    const gameboard = document.createElement('div');
    const letters = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let i;
    let j;

    user.classList.add('player');
    user.setAttribute('id', 'user');

    gamerTag.classList.add('playerTag');
    gamerTag.textContent = 'Player';
    user.appendChild(gamerTag);

    gameboard.classList.add('gameboard');
    for (i = 0; i < 11; i++) {
      const coordinate = document.createElement('div');
      coordinate.classList.add('coordinate');
      coordinate.textContent = letters[i];
      gameboard.appendChild(coordinate);
    }

    for (i = 0; i < 10; i++) {
      for (j = 0; j < 11; j++) {
        if (j === 0) {
          const coordinate = document.createElement('div');
          coordinate.classList.add('coordinate');
          coordinate.textContent = `${i}`;
          gameboard.appendChild(coordinate);
        } else {
          const field = document.createElement('div');
          field.classList.add('field');
          gameboard.appendChild(field);
        }
      }
    }

    user.appendChild(gameboard);
    game.appendChild(user);
  }

  createCPUGameboard() {
    const game = document.getElementById('game');
    const user = document.createElement('div');
    const gamerTag = document.createElement('div');
    const gameboard = document.createElement('div');
    const letters = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let i;
    let j;

    user.classList.add('player');
    user.setAttribute('id', 'cpu');

    gamerTag.classList.add('playerTag');
    gamerTag.classList.add('cpu');
    gamerTag.textContent = 'CPU';
    user.appendChild(gamerTag);

    gameboard.classList.add('gameboard');
    for (i = 0; i < 11; i++) {
      const coordinate = document.createElement('div');
      coordinate.classList.add('coordinate');
      coordinate.textContent = letters[i];
      gameboard.appendChild(coordinate);
    }

    for (i = 0; i < 10; i++) {
      for (j = 0; j < 11; j++) {
        if (j === 0) {
          const coordinate = document.createElement('div');
          coordinate.classList.add('coordinate');
          coordinate.textContent = `${i}`;
          gameboard.appendChild(coordinate);
        } else {
          const field = document.createElement('div');
          field.classList.add('cpuField');
          gameboard.appendChild(field);
          field.row = i;
          field.column = j - 1;
          field.addEventListener('click', (evt) => {
            if (this.user.attack(
              evt.currentTarget.row,
              evt.currentTarget.column,
              this.cpuBoard,
            ) && this.playerTurn
            ) {
              this.renderCPUGameboard();
              this.playerTurn = false;
              if (this.cpuBoard.isGameOver()) {
                const textDisplay = document.querySelector('.instructionsPrompt');
                textDisplay.textContent = 'You Won';
                this.createRetryBtn();
              } else {
                this.CPUAttack();
              }
            }
          });
        }
      }
    }
    user.appendChild(gameboard);
    game.appendChild(user);
  }

  createRetryBtn() {
    const instructionContainers = document.querySelectorAll('.instructionsContainer');
    const retryBtn = document.createElement('button');
    retryBtn.textContent = 'Retry';
    retryBtn.classList.add('btn');
    retryBtn.addEventListener('click', () => {
      const gameMsg = document.querySelector('.instructionsPrompt');
      const cpu = document.getElementById('cpu');
      const user = document.getElementById('user');
      const btn = document.querySelector('.btn');
      gameMsg.textContent = '';
      cpu.remove();
      user.remove();
      btn.remove();
      this.cpuBoard.board = [];
      this.cpuBoard.shots = [];
      this.cpuBoard.initialize();
      this.playerBoard.board = [];
      this.playerBoard.shots = [];
      this.playerBoard.initialize();
      this.playerTurn = true;
      this.user.hitCoordinates = [];
      this.cpu.hitCoordinates = [];
      this.Game();
    });
    instructionContainers[1].appendChild(retryBtn);
  }

  renderBoats() {
    const user = document.getElementById('user');
    const board = user.querySelectorAll('.field');
    let fieldCounter = 0;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.playerBoard.board[i][j]) {
          board[fieldCounter].classList.add('ship');
        }

        fieldCounter++;
      }
    }
  }

  renderPlayerGameboard() {
    const user = document.getElementById('user');
    const board = user.querySelectorAll('.field');
    let fieldCounter = 0;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.playerBoard.board[i][j]
          && this.playerBoard.shots[i][j]
          && !board[fieldCounter].querySelector('.shot')) {
          const shot = document.createElement('div');
          shot.classList.add('shot');
          shot.classList.add('hit');
          board[fieldCounter].appendChild(shot);
        }
        if (this.playerBoard.shots[i][j]
          && !board[fieldCounter].querySelector('.shot')) {
          const shot = document.createElement('div');
          shot.classList.add('shot');
          shot.classList.add('miss');
          board[fieldCounter].appendChild(shot);
        }

        fieldCounter++;
      }
    }
  }

  renderCPUGameboard() {
    const cpu = document.getElementById('cpu');
    const board = cpu.querySelectorAll('.cpuField');
    let fieldCounter = 0;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.cpuBoard.board[i][j]
          && this.cpuBoard.shots[i][j]
          && !board[fieldCounter].querySelector('.shot')) {
          const shot = document.createElement('div');
          shot.classList.add('shot');
          shot.classList.add('hit');
          board[fieldCounter].appendChild(shot);
        }
        if (this.cpuBoard.shots[i][j]
          && !board[fieldCounter].querySelector('.shot')) {
          const shot = document.createElement('div');
          shot.classList.add('shot');
          shot.classList.add('miss');
          board[fieldCounter].appendChild(shot);
        }

        fieldCounter++;
      }
    }
  }

  CPUAttack() {
    this.cpu.randomAttack(this.playerBoard);
    this.renderPlayerGameboard();
    if (this.playerBoard.isGameOver()) {
      const textDisplay = document.querySelector('.instructionsPrompt');
      textDisplay.textContent = 'CPU Won';
      this.createRetryBtn();
    } else {
      this.playerTurn = true;
    }
  }

  Game() {
    this.cpuBoard.placeShipsRandomly();
    this.playerBoard.placeShipsRandomly();

    this.constructor.createPlayerGameboard();
    this.createCPUGameboard();

    this.renderBoats();
  }
}

export default UI;
