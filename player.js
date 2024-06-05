import {
  Standing,
  Forward,
  Backward,
  Jumping,
  Falling,
  Ducking,
} from "./playerStates.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 128;
    this.height = 128;
    this.x = 0;
    this.y = this.game.height - this.height; //start at the bottom of the screen
    this.vy = 0; //vertical velocity
    this.gravity = 1;
    this.image = document.getElementById("player");
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame;
    this.fps = 20;
    this.frameInterval = 1500 / this.fps;
    this.frameTimer = 0;
    this.speed = 0;
    this.maxSpeed = 5;
    this.states = [
      new Standing(this),
      new Forward(this),
      new Backward(this),
      new Jumping(this),
      new Falling(this),
      new Ducking(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();

    //non-looping sprite animation variables
    this.animationInProgress = false;
    this.currentFrame = 0;
    this.totalFrames;
  }

  
  update(input, deltaTime) {

    this.currentState.handleInput(input);

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

    //vertical movement
    this.y += this.vy;
    this.vy += this.gravity;
    if (this.y > this.game.height - this.height) {
      this.y = this.game.height - this.height;
      this.vy = 0;
    }

    const isDownPressed = input.includes("ArrowDown");

    if (isDownPressed && !this.animationInProgress) {
      this.animationInProgress = true;
      this.currentFrame = 0; // Start animation from frame 0
      this.totalFrames = 5; // Set total number of frames in the animation
      this.frameX = 0; // Reset frameX to 0
  }

  // Reset animation-related variables when the down arrow key is released
  if (!isDownPressed && this.animationInProgress) {
    this.animationInProgress = false;
    this.currentFrame = 0;
    this.totalFrames = 0;
    this.frameX = 0;
}

  // Handle sprite animation logic if animation is in progress
  if (this.animationInProgress) {
      // Loop through animation frames until the last frame is reached
      if (this.currentFrame < this.totalFrames - 1) {
          if (this.frameTimer > this.frameInterval) {
              this.frameTimer = 0;
              this.currentFrame++;
              this.frameX++;
          } else {
              this.frameTimer += deltaTime;
          }
      } else {
          // Stop animation at the last frame
          this.currentFrame = this.totalFrames - 1;
          this.frameX = this.totalFrames - 1;
      }
  }

    //looping sprite animation
    if (!input.includes("ArrowDown")) {
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

    // // NEED TO ADD LOGIC FOR ONLY LOOPING THROUGH SPRITE ANIMATIONS ONCE!


}

  draw(context) {
    // context.imageSmoothingEnabled = false;

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x + 50, //this is the padding
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
