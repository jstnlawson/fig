import {
  Standing,
  Forward,
  Backward,
  Jumping,
  Falling,
} from "./playerStates.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 100;
    this.x = 0;
    // this.y = 100;
    this.y = this.game.height - this.height; //start at the bottom of the screen
    this.vy = 0; //vertical velocity
    this.gravity = 1;
    this.image = document.getElementById("player");
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.speed = 0;
    this.maxSpeed = 5;
    this.states = [
      new Standing(this),
      new Forward(this),
      new Backward(this),
      new Jumping(this),
      new Falling(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input);

    if (input.includes("ArrowRight")) {
      this.speed = this.maxSpeed;
    } else if (input.includes("ArrowLeft")) {
      this.speed = -this.maxSpeed;
      this.frameY = 1;
    } else {
      this.speed = 0;
      this.maxFrame = 0;
    }

    // Limit x coordinate to stay within a specific range
    const minX = 10; // Adjust this value as needed
    const maxX = this.game.width - this.width - 300;

    this.x += this.speed;

    // Limit x coordinate to stay within the specified range
    if (this.x < minX) {
      this.x = minX;
    } else if (this.x > maxX) {
      this.x = maxX;
    }

    // if (this.x < 0) this.x = 0;
    // if (this.x > this.game.width - this.width)
    //   this.x = this.game.width - this.width;

    //vertical movement
    this.y += this.vy;
    this.vy += this.gravity;
    if (this.y > this.game.height - this.height) {
      this.y = this.game.height - this.height;
      this.vy = 0;
    }
    //sprite animation

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(context) {
    // context.imageSmoothingEnabled = false;

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y - 80, //this is the padding
      this.width,
      this.height
    );
  }
  onGround() {
    return this.y === this.game.height - this.height;
  }

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = speed;
    this.currentState.enter();
  }
}
