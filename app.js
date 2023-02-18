// canvas setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

// classes
class Sprite {
    constructor({ position, size, color = 'red' }) {
        this.position = position;
        this.size = size;
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.color = color;
    }

    draw() {
        c.fillStyle = this.color;
        c.fillRect(
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        );
    }

    update() {
        this.position.x -= this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
    }


}

class Bomb extends Sprite {
    constructor(position) {
        super({
            position,
            size: {
                width: 10,
                height: 10,
            },
            color: `green`
        });
    }
}

class Player extends Sprite {
    constructor({ position, size }) {
        super({ position, size });
    }

    dropBomb() {
        return new Bomb({...this.position})
    }
}



// init
const player = new Player({
    position: {
        x: 100,
        y: 100,
    },
    size: {
        width: 30,
        height: 30,
    },
});

const bombs = [];

// key event
// при нажатии на кнопку
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            player.velocity.y = -1;
            break;
        case "ArrowDown":
            player.velocity.y = 1;
            break;
        case "ArrowLeft":
            player.velocity.x = 1;
            break;
        case "ArrowRight":
            player.velocity.x = -1;
            break;
        case " ":
            bombs.push(player.dropBomb());
            console.log(bombs);
            break;
    }
});
// при отпускании кнопки
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowUp":
            player.velocity.y = 0;
            break;
        case "ArrowDown":
            player.velocity.y = 0;
            break;
        case "ArrowLeft":
            player.velocity.x = 0;
            break;
        case "ArrowRight":
            player.velocity.x = 0;
            break;
    }
});

// animation loop
function animate() {
    // зацикливание функции анимации
    window.requestAnimationFrame(animate);
    // очистка канваса
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    // отрисовка графических элементов
    // игрок
    player.update();
    // бомбы
    bombs.forEach((x) => {
        x.update();
        return;
    });
}
animate();
