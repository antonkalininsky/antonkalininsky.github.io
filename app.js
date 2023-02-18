// canvas setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);


// classes
class Sprite {
    constructor({position, size}) {
        this.position = position;
        this.size = size
    }

    draw() {
        c.fillStyle = `red`;
        c.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
}

// init
const player = new Sprite({
    position: {
        x: 100,
        y: 100
    },
    size: {
        width: 30,
        height: 30
    }
});

// action
player.draw();
