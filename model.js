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

class Element {
    constructor({ pos, id }) {
        this.pos = pos;
        this.id = id;
    }
}

class Npc extends Element {
    constructor({ pos, id }) {
        super({ pos, id });
        this.isAlive = true;
        this.isKiller = false;
        this.deathList = [];
        this.killList = [];
    }

    move(dir, grid) {
        const newPos = {
            x: this.pos.x + dir.x,
            y: this.pos.y + dir.y,
        };

        // смертельные колизии
        for (let deathSource of this.deathList) {
            if (grid.get(newPos) === deathSource) {
                this.isAlive = false;
                return;
            }
        }

        // убийственные колизии
        for (let killSource of this.deathList) {
            if (grid.get(newPos) === killSource) {
                this.isKiller = true;
                return;
            }
        }

        // просто ходим
        if (grid.get(newPos) === 0) {
            grid.clear(this);
            this.pos.x += dir.x;
            this.pos.y += dir.y;
            grid.add(this);
            return true;
        }
        return false;
    }
}

class Player extends Npc {
    constructor({ pos }) {
        super({ pos, id: 1 });
        this.deathList = [4, 7];
        this.bombLocked = false;
        this.bombRange = 2;
        this.bombLimit = 1;
        this.heart;
    }
}

class Enemy extends Npc {
    constructor({ pos }) {
        super({ pos, id: 7 });
        this.curDir = 0;
    }

    move(grid) {
        if (!super.move(dirs[this.curDir], grid)) {
            this.curDir++;
            if (this.curDir > 3) {
                this.curDir = 0;
            }
            this.move(grid);
        }
        if (Math.random() > 0.95) {
            console.log(`wow`);
            this.curDir = Math.trunc((Math.random() * 10) % 4);
        }
    }

    start(grid) {
        grid.add(this);
        this.curDir = Math.trunc((Math.random() * 10) % 4);
        this.heart = setInterval(() => {
            this.move(grid);
        }, 100);
    }

    die() {
        clearInterval(this.heart);
    }
}

class Game {
    constructor() {
        // grid
        this.grid = new Grid();

        // terrain
        this.generateWalls();
        this.boxCount = 0;
        this.boxNumber = 0;
        this.generateBoxes();

        // enemies
        this.enemy = new Enemy({
            pos: {
                x: 9,
                y: 9,
            },
        });
        this.enemy.start(this.grid);

        // player
        this.player = new Player({
            pos: {
                x: 1,
                y: 1,
            },
        });
        this.grid.add(this.player);
        this.bombCount = 0;

        // endgame
        this.isExitFound = false;
    }

    gameOver(isWin) {
        console.log(`Game Over!`);
        if (isWin) {
            console.log(`You Won!`);
        } else {
            console.log(`You Lose!`);
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

    generateBoxes() {
        for (let y = 1; y < this.grid.size.height - 1; y++) {
            for (let x = 1; x < this.grid.size.width - 1; x++) {
                if ((y > 2 || x > 2) && this.grid.get({ x, y }) === 0) {
                    if (Math.random() > 0.5) {
                        this.boxNumber++;
                        this.grid.add({
                            pos: {
                                x,
                                y,
                            },
                            id: 6,
                        });
                    }
                }
            }
        }
    }

    rollBoxLoot(pos) {
        console.log(this.boxCount);
        console.log(this.boxNumber);
        const seed = Math.random();
        if (seed >= 0 && seed < 0.08) {
            this.grid.set(pos, 80);
        } else if (seed >= 0.1 && seed < 0.18) {
            this.grid.set(pos, 81);
        }
        if (
            ((seed >= 0.2 && seed < (0.2 + 0.05*this.boxCount/this.boxNumber)) || this.boxCount === this.boxNumber) &&
            !this.isExitFound
        ) {
            this.isExitFound = true;
            this.grid.set(pos, 90);
        }
    }

    movePlayer(direction) {
        const oldPos = { ...this.player.pos };
        const newPos = { ...this.player.pos };
        newPos.x += direction.x;
        newPos.y += direction.y;
        switch (this.grid.get(newPos)) {
            case 7:
                console.log(`enemy stepped on`);
                break;
            case 80:
                this.player.bombLimit++;
                this.grid.set(newPos, 0);
                console.log(`bomb loot`);
                break;
            case 81:
                this.player.bombRange++;
                this.grid.set(newPos, 0);
                console.log(`range loot`);
                break;
            case 90:
                // this.grid.set(newPos, 0);
                console.log(`exit reached!`);
                break;
            default:
                break;
        }
        this.player.move(direction, this.grid);
        if (this.player.bombLocked) {
            this.player.bombLocked = false;
            this.grid.set(oldPos, 2);
        }
    }

    dropBomb() {
        if (this.bombCount >= this.player.bombLimit) {
            return;
        }
        this.bombCount++;
        this.player.bombLocked = true;
        const buf = { ...this.player.pos };
        this.timeout = setTimeout(() => {
            this.triggerExplosion(buf);
        }, 2000);
    }

    triggerExplosion(pos) {
        this.bombCount--;
        // центр
        this.grid.tryExplode(pos);
        this.hitScan(this.grid.get(pos), pos);
        // 4 направления
        for (let dir of dirs) {
            // одно направление
            for (let i = 1; i < this.player.bombRange; i++) {
                const buf = {
                    x: pos.x + dir.x * i,
                    y: pos.y + dir.y * i,
                };
                this.grid.tryExplode(buf);
                if (this.hitScan(this.grid.get(buf), buf)) {
                    break;
                }
            }
        }
    }

    hitScan(val, pos) {
        switch (val) {
            case 1:
                this.gameOver(false);
                return true;
            case 2:
                this.grid.set(pos, 0);
                this.grid.tryExplode(pos);
                return true;
            case 5:
                return true;
            case 6:
                this.grid.set(pos, 0);
                this.grid.tryExplode(pos);
                this.boxCount++;
                setTimeout(() => {
                    this.rollBoxLoot(pos);
                }, 1100);
                return true;
            case 7:
                this.enemy.die();
                this.grid.set(pos, 0);
                return true;
            default:
                return false;
        }
    }
}

const game = new Game();
