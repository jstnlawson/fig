const states = {
    STANDING: 0,
    RUNNING: 1,
    JUMPING: 2,   
}

class State {
    constructor() {
        this.state = states.STANDING;
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }
}

export class Standing extends State {
    constructor(player) {
        super('SITTING');
        this.player = player;
    }
}