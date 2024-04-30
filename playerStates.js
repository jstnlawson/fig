const states = {
    STANDING: 0,
    FORWARD: 1,
    BACKWARD: 2,
    JUMPING: 3, 
    FALLING: 4,  
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
        if (input.includes("ArrowRight")) {
            console.log("forward");
            this.player.setState( states.FORWARD );
        }
        if (input.includes("ArrowLeft")) {
            console.log("backward");
            this.player.setState( states.BACKWARD );
        } 
        if (input.includes("ArrowUp")) {
            this.player.setState( states.JUMPING );
        } 
        // else {
        //     if (!input.some(key => key.includes("ArrowRight") || key.includes("ArrowLeft") || key.includes("ArrowUp"))) {
        //         this.player.setState(states.STANDING);
        //     }
        // }
        
        // else {
        //     if (input.!includes("ArrowRight") && input.!includes("ArrowLeft") && input.!includes("ArrowUp")) {
        //         this.player.setState( states.STANDING );
        //     }
        // }
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
       
        if (input.includes("ArrowLeft")) {
            this.player.setState(states.BACKWARD);
        }
        if (input.includes("ArrowUp")) {
            this.player.setState(states.JUMPING);
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
        if (input.includes("ArrowRight")) {
            this.player.setState(states.FORWARD);
        }
        if (input.includes("ArrowUp")) {
            this.player.setState(states.JUMPING);
        } 
    }
}

export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    }
    enter() {
        // this.player.frameX = 1; 
        // this.player.frameY = 0;
        // this.player.maxFrame = 1;
      if ( this.player.onGround()) this.player.vy = -20;
            
    }
    handleInput(input) {
        if (this.player.vy > this.player.gravity) {
            this.player.setState(states.FALLING);
        }
        }
    }

export class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
    }
    enter() {

        // this.player.frameX = 2;
        this.player.maxFrame = 0;
    }
    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.STANDING);
        }
    }
}
