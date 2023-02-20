class Element {
    constructor({ pos, id }) {
        this.pos = pos;
        this.id = id;
    }
}

class Player extends Element {
    constructor({ pos }) {
        super({ pos, id: 1 });
        this.bombCapacity = 1;
        this.bombSize = 3;
    }
}

class Bomb extends Element {
    constructor({ pos, time, boom }) {
        super({ pos, id: 2 });
        this.time = time;
        setTimeout(boom.call(this), time);
    }
}

class Grid {
    constructor() {
        // const values
        this.size = {
            width: 19,
            height: 19,
        };
        this.unit = 30;

        // field initization
        this.values = [];
        for (let i = 0; i < this.size.height; i++) {
            this.values.push(new Array(this.size.width).fill(0));
        }
    }

    get(pos) {
        if (pos.x >= this.size.width || pos.y >= this.size.height) {
            return -1;
        }
        return this.values[pos.x][pos.y];
    }

    set(pos, id) {
        this.values[pos.x][pos.y] = id;
    }

    add(el) {
        this.values[el.pos.x][el.pos.y] = el.id;
    }

    clear(el) {
        this.values[el.pos.x][el.pos.y] = 0;
    }

    tryExplode(pos) {
        if (this.values[pos.x][pos.y] !== 0) {
            return;
        }
        this.values[pos.x][pos.y] = 4;
        setTimeout(() => {
            this.clearExplosion(pos);
        }, 1000);
    }

    clearExplosion(pos) {
        this.values[pos.x][pos.y] = 0;
    }
}

class Game {
    constructor() {
        this.grid = new Grid();

        this.player = new Player({
            pos: {
                x: 1,
                y: 1,
            },
        });
        this.dropLocked = false;

        this.generateWalls();
        this.grid.add(this.player);
        this.grid.add({
            pos: {
                x: 3,
                y: 3,
            },
            id: 6,
        });

        this.curDir = 0;
        this.enemy = new Element({
            pos: {
                x: 9,
                y: 9,
            },
            id: 7,
        });
        this.createEnemy();
    }

    createEnemy() {
        this.grid.add(this.enemy);

        setInterval(() => {
            this.moveEnemy();
        }, 1000);
    }

    moveEnemy() {
        if(Math.random() > 0.9) {
            this.curDir++;   
        }
        // if(Math.random() < 0.1) {
        //     this.curDir--;   
        // }
        if (this.curDir >= 4) {
            this.curDir = 0;
        }
        if (this.curDir < 0) {
            this.curDir = 3;
        }

        const dirs = [
            {
                x: 1,
                y: 0,
            },
            {
                x: 0,
                y: 1,
            },
            {
                x: -1,
                y: 0,
            },
            {
                x: 0,
                y: -1,
            },
        ];
        // выход за границы
        if (
            this.enemy.pos.x + dirs[this.curDir].x >= this.grid.size.width ||
            this.enemy.pos.x + dirs[this.curDir].x < 0 ||
            this.enemy.pos.y + dirs[this.curDir].y >= this.grid.size.height ||
            this.enemy.pos.y + dirs[this.curDir].y < 0
        ) {
            return;
        }
        // колизия со стенами
        if (
            this.grid.values[this.enemy.pos.x + dirs[this.curDir].x][
                this.enemy.pos.y + dirs[this.curDir].y
            ] === 0
        ) {
            this.grid.clear(this.enemy);
            this.enemy.pos.x += dirs[this.curDir].x;
            this.enemy.pos.y += dirs[this.curDir].y;
            this.grid.add(this.enemy);
        } else {
            this.curDir++;
            if (this.curDir >= 4) {
                this.curDir = 0;
            }
            if (this.curDir < 0) {
                this.curDir = 3;
            }
            this.moveEnemy();
        }
    }

    generateWalls() {
        for (let y = 0; y < this.grid.size.height; y++) {
            for (let x = 0; x < this.grid.size.width; x++) {
                if (
                    x === 0 ||
                    y === 0 ||
                    x === this.grid.size.width - 1 ||
                    y === this.grid.size.height - 1 ||
                    ((x + 1) % 2 === 1 && (y + 1) % 2 === 1)
                ) {
                    this.grid.values[x][y] = 5;
                }
            }
        }
    }

    movePlayer(direction) {
        // выход за границы
        if (
            this.player.pos.x + direction.x >= this.grid.size.width ||
            this.player.pos.x + direction.x < 0 ||
            this.player.pos.y + direction.y >= this.grid.size.height ||
            this.player.pos.y + direction.y < 0
        ) {
            return;
        }
        // колизия со стенами
        if (
            this.grid.values[this.player.pos.x + direction.x][
                this.player.pos.y + direction.y
            ] === 0
        ) {
            if (this.dropLocked) {
                this.dropLocked = false;
                this.grid.values[this.player.pos.x][this.player.pos.y] = 2;
            } else {
                this.grid.clear(this.player);
            }
            this.player.pos.x += direction.x;
            this.player.pos.y += direction.y;
            this.grid.add(this.player);
        }
    }

    dropBomb() {
        this.dropLocked = true;
        const buf = { ...this.player.pos };
        this.timeout = setTimeout(() => {
            this.triggerExplosion(buf);
        }, 2000);
    }

    triggerExplosion(pos) {
        const dirs = [
            {
                x: 1,
                y: 0,
            },
            {
                x: -1,
                y: 0,
            },
            {
                x: 0,
                y: 1,
            },
            {
                x: 0,
                y: -1,
            },
        ];
        // центр
        this.grid.tryExplode(pos);
        this.hitScan(this.grid.get(pos), pos);
        // 4 направления
        for (let dir of dirs) {
            // одно направление
            for (let i = 1; i < this.player.bombSize; i++) {
                const buf = {
                    x: pos.x + dir.x * i,
                    y: pos.y + dir.y * i,
                };
                this.grid.tryExplode(buf);
                let msg = this.hitScan(this.grid.get(buf), buf);
                if (msg !== "") {
                    console.log(msg);
                    break;
                }
            }
        }
    }

    hitScan(val, pos) {
        // console.log(pos);
        switch (val) {
            case 1:
                return "player killed!";
            case 2:
                this.grid.set(pos, 0);
                this.grid.tryExplode(pos);
                return "bomb touches itself!";
            case 5:
                return "wall hit!";
            case 6:
                this.grid.set(pos, 0);
                this.grid.tryExplode(pos);
                return "wall destroyed!";
            default:
                return "";
        }
    }
}

const game = new Game();
