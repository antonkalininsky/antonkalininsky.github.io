// canvas focus
window.onload = function () {
    var canvasElm = document.getElementById("canvas");
    canvasElm.setAttribute("tabindex", "0");
    canvasElm.focus();
};

// canvas setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = game.grid.size.width * game.grid.unit;
canvas.height = game.grid.size.height * game.grid.unit;

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
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
    }
}

const gridShow = [];

// animation loop
function animate() {
    // зацикливание функции анимации
    window.requestAnimationFrame(animate);

    // пересобираем данные из модели
    gridShow.length = 0;
    for (let y = 0; y < game.grid.size.height; y++) {
        for (let x = 0; x < game.grid.size.width; x++) {
            let color = "black";
            let size = {
                width: 5,
                height: 5,
            };
            switch (game.grid.values[x][y]) {
                case 0: // empty
                    color = "grey";
                    break;
                case 1: // player
                    color = "red";
                    size = {
                        width: 30,
                        height: 30,
                    };
                    break;
                case 2: // bomb
                    color = "green";
                    size = {
                        width: 20,
                        height: 20,
                    };
                    break;
                case 4: // explosion
                    color = "pink";
                    size = {
                        width: 20,
                        height: 20,
                    };
                    break;
                case 5: // wall
                    color = "gray";
                    size = {
                        width: 30,
                        height: 30,
                    };
                    break;
                case 6: // easy wall
                    color = "yellow";
                    size = {
                        width: 30,
                        height: 30,
                    };
                    break;
                case 7: // enemy
                    color = "white";
                    size = {
                        width: 10,
                        height: 30,
                    };
                    break;
                case 80: // loot bombs
                    color = "yellow";
                    size = {
                        width: 15,
                        height: 15,
                    };
                    break;
                case 81: // loot range
                    color = "blue";
                    size = {
                        width: 15,
                        height: 15,
                    };
                    break;
                case 90: // exit
                    color = "white";
                    size = {
                        width: 30,
                        height: 30,
                    };
                    break;
                default:
                    break;
            }

            gridShow.push(
                new Sprite({
                    position: {
                        x: x * game.grid.unit,
                        y: y * game.grid.unit,
                    },
                    size,
                    color,
                })
            );
        }
    }

    // очистка канваса
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    // отрисовка
    // сетка
    gridShow.forEach((x) => {
        x.update();
    });
}
animate();
