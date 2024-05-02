class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
    this.ground = 80;
  }
  update(deltaTime){
    //movement
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
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
        //check if enemy is off screen
        if (this.x < 0 - this.width) this.markedForDeletion = true;
  }
    draw(ctx){
        ctx.drawImage(
            this.image, 
            this.frameX * this.width, 
            0, 
            this.width, 
            this.height, 
            this.x, 
            this.y, 
            this.width, 
            this.height
            ); 
    }
}

//if I want to make a class like FlyingEnemy apply to
//multiple enemies I can make the FlyingEnemy class
//settings more generic and then extend it to the
//specific enemy classes like parachuteEnemy, birdEnemy, etc.
//these classes are structured like typescript classes but
//I am using javascript

export class FlyingEnemy extends Enemy {
    constructor(game){
        super();//this calls the constructor of the parent class
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width + Math.random() * this.game.width * 0.5;
        this.y = Math.random() * this.game.height * 0.5 - this.ground;
        this.speedX = Math.random() * 2 + 2;
        this.speedY = 0;
        this.maxFrame = 0;
        this.image = document.getElementById('enemy_fly');
        this.angle = 0;
        this.va = Math.random() * 0.1 - 0.05;//angle velocity
        // this.x = this.game.width;
        // this.y = Math.random() * this.game.height - this.height;
        // this.speed = Math.random() * 2 + 2;
        //this.image = document.getElementById('enemy_fly');
    }
    update(deltaTime){
        super.update(deltaTime);
        //if (this.x < -this.width) this.x = this.game.width;//reset enemy position not sure it's supposed to be here
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.ground;//80 is the ground height, should make this into a reusable variable
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 0;
        this.image = document.getElementById('enemy_ground');
    }
    // update(deltaTime){
    //     super.update(deltaTime);
    // }

}

export class ClimbingEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height - this.height - this.ground;
        //this.y = this.game.height + this.height;

        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 0;
        this.image = document.getElementById('enemy_climb');
    }
    update(deltaTime){
        super.update(deltaTime);
        if (this.y > this.game.height - this.height - this.ground) this.speedY *= -1;
        if (this.y < -this.height) this.markedForDeletion = true; 
    }
    draw(ctx){
        super.draw(ctx);
        //draw a line from the top of the screen to the top of the enemy
        ctx.beginPath();
        ctx.moveTo( this.x + this.width / 2, 0);
        ctx.lineTo( this.x + this.width / 2, this.y + 30);
        ctx.stroke();
    }
}