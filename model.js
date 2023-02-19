class Element {
    constructor({pos, id}) {
        this.pos = pos;
        this.id = id;
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

        this.player = new Element({
            pos: {
                x: 1,
                y: 1,
            },
            id: 1
        });
        this.dropLocked = false;

        this.grid.add(this.player);
    }

    movePlayer(direction) {
        if (this.player.pos.x + direction.x >= this.grid.size.width ||
            this.player.pos.x + direction.x < 0 ||
            this.player.pos.y + direction.y >= this.grid.size.height ||
            this.player.pos.y + direction.y < 0) {
                return
            }
        if (this.grid.values[this.player.pos.x + direction.x][this.player.pos.y + direction.y] === 0) {
            if (this.dropLocked) {
                this.dropLocked = false;
                this.grid.values[this.player.pos.x][this.player.pos.y] = 2;
            } else {
                this.grid.values[this.player.pos.x][this.player.pos.y] = 0;
            }
            this.player.pos.x += direction.x;
            this.player.pos.y += direction.y;
            this.grid.values[this.player.pos.x][this.player.pos.y] = 1;
        }
    }

    dropBomb() {
        this.dropLocked = true;
    }


}

const game = new Game();