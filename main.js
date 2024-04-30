import { Player } from "./player.js";
import { InputHandler } from "./input.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;
  canvas.imageSmoothingEnabled = false;


  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    update( deltaTime ) {
      this.player.update(this.input.keys, deltaTime );
    }
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing

      this.player.draw(ctx);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  console.log(game);
  let lastTime = 0;

  function animate( timeStamp ){
    const deltaTime = timeStamp - lastTime;
    //console.log(deltaTime);
    lastTime = timeStamp;
    game.update( deltaTime );
    game.draw();
    requestAnimationFrame(animate);
  }

  animate(0);
});
