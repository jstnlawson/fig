export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 100;
    this.x = 0;
    // this.y = 100;
    this.y = this.game.height - this.height;
    // this.vy = 0;
    // this.weight = 1;
    this.image = document.getElementById('player');
    // this.speed = 0;
    // this.maxSpeed = 10;
    // this.states = [];
    // this.currentState = this.states[0];
    // this.currentState.enter();
  }
  update() {
    // this.x++;
  }
  draw(context) {
    // context.fillStyle = "transparent";
    // context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }
}
