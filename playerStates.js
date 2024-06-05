const states = {
    STANDING: 0,
    FORWARD: 1,
    BACKWARD: 2,
    JUMPING: 3, 
    FALLING: 4,
    DUCKING: 5,  
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class Standing extends State {
    constructor(player) {
        
        super('STANDING');
        // console.log("ground margin:", this.groundMargin);
        this.player = player;
    }
    enter() {
        this.player.speed = 0;
        this.player.frameX = 0;
        this.player.frameY = 0;
        this.player.maxFrame = 0;
    }
    handleInput(input) {
        if (this.player.onGround() && input.includes("ArrowUp")) {
            this.player.setState(states.JUMPING, 0);
            console.log("jumping from standing state:", this.player.currentState);
            
        } else if (input.includes("ArrowLeft")) {
          this.player.setState(states.BACKWARD, -2);
        } else if (input.includes("ArrowRight")) {
            this.player.setState(states.FORWARD, 2);
        } else if (input.includes("ArrowDown")) {
            this.player.setState(states.DUCKING, 0);
        }
      }

}

export class Forward extends State {
    constructor(player) {
        super('FORWARD');
        this.player = player;
    }
    enter() {
        this.player.frameY = 0;
        this.player.frameX = 0;
        this.player.maxFrame = 5;
    }
    handleInput(input) {

        if (this.player.onGround() && input.includes("ArrowUp")) {
            this.player.setState(states.JUMPING, 2);
          } 
          else if (this.player.onGround() && input.includes("ArrowDown")) {
            this.player.setState(states.DUCKING, 2);
            } else if (input.includes("ArrowLeft")) {
            this.player.setState(states.BACKWARD, 2);
          } else if (!input.includes("ArrowRight")) {
            this.player.setState(states.STANDING, 0);
          } 
       
      }  
}

export class Backward extends State {
    constructor(player) {
        super('BACKWARD');
        this.player = player;
    }
    enter() {
        this.player.frameY = 1;
        this.player.frameX = 0;
        this.player.maxFrame = 5;
    }
    handleInput(input) {

        if (this.player.onGround() && input.includes("ArrowUp")) {
            this.player.setState(states.JUMPING, -2);
          } else if (input.includes("ArrowRight")) {
            this.player.setState(states.FORWARD, 2);
          } else if (!input.includes("ArrowLeft")) {
            this.player.setState(states.STANDING, 0);
          }

    }
}

export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0; 
        this.player.frameY = 4;
        this.player.maxFrame = 5;
      if ( this.player.onGround()) { this.player.vy = -22;}
            
    }
    handleInput(input) {
        //these keep the momentum of the player when falling
        if (this.player.vy > this.player.gravity) {
            this.player.setState(states.FALLING, this.player.speed);
        }
        if (input.includes("ArrowRight") && this.player.vy > this.player.gravity) {
            this.player.setState(states.FALLING, 2);
        }
        if (input.includes("ArrowLeft") && this.player.vy > this.player.gravity) {
            this.player.setState(states.FALLING, -2);
        }
    }
}

export class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
    }
    enter() {

        this.player.frameX = 0;
        this.player.frameY = 5;
        this.player.maxFrame = 5;
    }
    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.STANDING, 0);
        }
    }
}

export class Ducking extends State {
    constructor(player) {
        super('DUCKING');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.maxFrame = 5;
    }
    handleInput(input) {
      if (!input.includes("ArrowDown")) {
        this.player.setState(states.STANDING, 0);
      }
    }
}
