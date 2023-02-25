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
    constructor({
        position,
        size,
        color = "red",
        imageSrc = "./sprites.png",
        sourcePos,
        sourceSize = 16,
        hasImage = false,
    }) {
        this.position = position;
        this.size = size;
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.color = color;

        this.sourcePos = sourcePos;
        this.sourceSize = sourceSize;
        this.image = new Image();
        this.image.src = imageSrc;
        this.hasImage = hasImage;
    }

    drawBox() {
        c.fillStyle = this.color;
        c.fillRect(
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        );
    }

    drawImage() {
        c.drawImage(
            this.image,
            this.sourcePos.x,
            this.sourcePos.y,
            this.sourceSize,
            this.sourceSize,
            this.position.x,
            this.position.y,
            this.size,
            this.size
        );
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.hasImage) {
            this.drawImage();
        } else {
            this.drawBox();
        }
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
            let sourcePos = {};
            switch (game.grid.values[x][y]) {
                case 0: // empty
                    sourcePos = {
                        x: 0,
                        y: 16 * 4,
                    };
                    break;
                case 1: // player
                    sourcePos = {
                        x: 0,
                        y: 16,
                    };
                    break;
                case 2: // bomb
                    sourcePos = {
                        x: 0,
                        y: 16 * 3,
                    };
                    break;
                case 4: // explosion
                    sourcePos = {
                        x: 16 * 2,
                        y: 16 * 6,
                    };
                    break;
                case 5: // wall
                    sourcePos = {
                        x: 16 * 3,
                        y: 16 * 3,
                    };
                    break;
                case 6: // easy wall
                    sourcePos = {
                        x: 16 * 4,
                        y: 16 * 3,
                    };
                    break;
                case 7: // enemy
                    sourcePos = {
                        x: 0,
                        y: 16 * 15,
                    };
                    break;
                case 80: // loot bombs
                    sourcePos = {
                        x: 0,
                        y: 16 * 14,
                    };
                    break;
                case 81: // loot range
                    sourcePos = {
                        x: 16,
                        y: 16 * 14,
                    };
                    break;
                case 90: // exit
                    sourcePos = {
                        x: 16 * 11,
                        y: 16 * 3,
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
                    size: 30,
                    sourcePos,
                    hasImage: true,
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
