class Element {
    constructor({pos, id}) {
        this.pos = pos;
        this.id = id;
    }
}

class Player extends Element {
    constructor({pos}) {
        super({pos, id: 1});
        this.bombCapacity = 1;
    }
}

class Bomb extends Element {
    constructor({pos, time, boom}) {
        super({pos, id: 2});
        this.time = time;
        setTimeout(boom.call(this), time);
    }
}

class Grid {
    constructor() {
        // const values
        this.size = {
            width: 20,
            height: 20,
        };
        this.unit = 30;

        // field initization
        this.values = [];
        for (let i = 0; i < this.size.height; i++) {
            this.values.push(new Array(this.size.width).fill(0));
        }
    }

    add(el) {
        this.values[el.pos.x][el.pos.y] = el.id;
    }

    clear(el) {
        this.values[el.pos.x][el.pos.y] = 0;
    }
}

class Game {
    constructor() {
        this.grid = new Grid();

        this.player = new Player({
            pos: {
                x: 1,
                y: 1,
            }
        });
        this.dropLocked = false;

        this.bombs = [];

        this.grid.add(this.player);

        let timeout;
    }

    movePlayer(direction) {
        // выход за границы
        if (this.player.pos.x + direction.x >= this.grid.size.width ||
            this.player.pos.x + direction.x < 0 ||
            this.player.pos.y + direction.y >= this.grid.size.height ||
            this.player.pos.y + direction.y < 0) {
                return
        }
        // колизия со стенами
        if (this.grid.values[this.player.pos.x + direction.x][this.player.pos.y + direction.y] === 0) {
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
        const buf = {...this.player.pos};
        this.timeout = setTimeout(() => {this.triggerExplosion(buf)}, 2000);
    }

    triggerExplosion(pos) {
        console.log(`boom`);
        this.grid.add({
            pos: {
                x: pos.x,
                y: pos.y
            },
            id: 4 
        });
        this.grid.add({
            pos: {
                x: pos.x + 1,
                y: pos.y
            },
            id: 4 
        });
        this.grid.add({
            pos: {
                x: pos.x - 1,
                y: pos.y
            },
            id: 4 
        });
        this.grid.add({
            pos: {
                x: pos.x,
                y: pos.y + 1
            },
            id: 4 
        });
        this.grid.add({
            pos: {
                x: pos.x,
                y: pos.y - 1
            },
            id: 4 
        });
        setTimeout(() => {this.clearExplosion(pos)}, 1000);
    }

    clearExplosion(pos) {
        this.grid.clear({
            pos: {
                x: pos.x,
                y: pos.y
            },
            id: 4 
        });
        this.grid.clear({
            pos: {
                x: pos.x + 1,
                y: pos.y
            },
            id: 4 
        });
        this.grid.clear({
            pos: {
                x: pos.x - 1,
                y: pos.y
            },
            id: 4 
        });
        this.grid.clear({
            pos: {
                x: pos.x,
                y: pos.y + 1
            },
            id: 4 
        });
        this.grid.clear({
            pos: {
                x: pos.x,
                y: pos.y - 1
            },
            id: 4 
        });
    }


}

const game = new Game();