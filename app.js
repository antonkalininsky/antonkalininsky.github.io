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
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
    }
}

const gridShow = [];
for (let y = 0; y < GRID_PROP.size.height; y++) {
    for (let x = 0; x < GRID_PROP.size.width; x++) {

        let color = 'black';
        switch (grid[x][y]) {
            case 0:
                color = 'grey';
                break;
            case 1:
                color = 'red';
                break;
            case 2:
                color = 'green';
                break;
            case 3:
                color = 'blue';
                break;
            default:
                break;
        }

        gridShow.push(
            new Sprite({
                position: {
                    x: x * GRID_PROP.unit + GRID_PROP.unit / 3,
                    y: y * GRID_PROP.unit + GRID_PROP.unit / 3,
                },
                size: {
                    width: 10,
                    height: 10,
                },
                color,
            })
        );
    }
}


console.log(gridShow);

// animation loop
function animate() {
    // зацикливание функции анимации
    window.requestAnimationFrame(animate);

    // очистка канваса
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    // отрисовка
    // сетка
    gridShow.forEach((x) => {
        x.update();
    })
}
animate();
