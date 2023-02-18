// canvas setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

// classes
class Sprite {
    constructor({ position, size, color = "red" }) {
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
            color: `green`,
        });
    }
}

class Player extends Sprite {
    constructor({ position, size }) {
        super({ position, size });
    }

    dropBomb() {
        return new Bomb({ ...this.position });
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

// KEY EVENTS
// inits
const keys = {
    up: {
        pressed: false,
    },
    down: {
        pressed: false,
    },
    left: {
        pressed: false,
    },
    right: {
        pressed: false,
    },
    space: {
        pressed: false,
    },
};
let lastKey = "";
// при нажатии на кнопку
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            keys.up.pressed = true;
            lastKey = 'up';
            break;
        case "ArrowDown":
            keys.down.pressed = true;
            lastKey = 'down';
            break;
        case "ArrowLeft":
            keys.left.pressed = true;
            lastKey = 'left';
            break;
        case "ArrowRight":
            keys.right.pressed = true;
            lastKey = 'right';
            break;
        case " ":
            keys.space.pressed = true;
            break;
    }
});
// при отпускании кнопки
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowUp":
            keys.up.pressed = false;
            break;
        case "ArrowDown":
            keys.down.pressed = false;
            break;
        case "ArrowLeft":
            keys.left.pressed = false;
            break;
        case "ArrowRight":
            keys.right.pressed = false;
            break;
        case " ":
            keys.space.pressed = false;
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


    // отработка нажатий
    player.velocity.x = 0;
    player.velocity.y = 0;
    if (keys.up.pressed && lastKey !== "down") {
        player.velocity.y = -1;
    } else if (keys.down.pressed && lastKey !== "up") {
        player.velocity.y = 1;
    } else if (keys.left.pressed && lastKey !== "right") {
        player.velocity.x = 1;
    } else if (keys.right.pressed && lastKey !== "left") {
        player.velocity.x = -1;
    }
    if (keys.space.pressed) {
        bombs.push(player.dropBomb());
        keys.space.pressed = false;
    }


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
