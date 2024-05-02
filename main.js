import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";

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
      //   this.groundMargin = 50;
      this.speed = 0;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler();
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000; // Add an enemy every second
    }
    update(deltaTime) {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      //add enemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
        //update enemies
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);
            if (enemy.markedForDeletion) {
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
            }
        });
    }
    draw(  ) {
        // Clear canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background without clearing
  this.background.draw(ctx);

  // Clear the previous region occupied by the player's sprite
  ctx.clearRect(
    this.player.prevX,
    this.player.prevY,
    this.player.width,
    this.player.height
  );

  // Draw the updated player sprite
  this.player.draw(ctx);
    //   this.background.draw(ctx);
    //   //ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing
    //   this.player.draw(ctx);

    // Draw enemies
    this.enemies.forEach(enemy => {
      enemy.draw(ctx);
    });
    }
    addEnemy() {
        if (this.speed > 0 && Math.random() < 0.5) {
            this.enemies.push(new GroundEnemy(this));
          }
          else if (Math.random() < 0.5) {
            this.enemies.push(new ClimbingEnemy(this));
          }
          
      this.enemies.push(new FlyingEnemy(this));
      console.log("enemies:",this.enemies);    
    }
  }

  const game = new Game(canvas.width, canvas.height);
  console.log(game);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    //console.log(deltaTime);
    lastTime = timeStamp;
    game.update(deltaTime);
    game.draw();
    requestAnimationFrame(animate);
  }

  animate(0);
});
