class Layer {
    constructor() {
        this.game = game;
        this.width = width;
        this.height = height;
        this,speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }
    update() {
       
        if (this.x < -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layer5image = layer5; //could also use getElemntById
        this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layerImage5);
        this.backgroundLayers = [layer1];
    }
    addLayer(width, height, speedModifier, imageSrc) {
        const image = new Image();
        image.src = imageSrc;
        this.layers.push(new Layer(this.game, width, height, speedModifier, image));
    }
    update() {
        this.layers.forEach(layer => layer.update());
    }
    draw(ctx) {
        this.layers.forEach(layer => layer.draw(ctx));
    }
}