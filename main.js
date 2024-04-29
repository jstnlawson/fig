import { Player } from "./player.js";
import { InputHandler } from "./input.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler();
      // this.states = {
      //     STANDING: 0,
      //     RUNNING: 1,
      //     JUMPING: 2,
    }
    update() {
      this.player.update();
    }
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing

      this.player.draw(ctx);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  console.log(game);

  function animate( ){
    game.update();
    game.draw();
    requestAnimationFrame(animate);
  }

  animate();
});
