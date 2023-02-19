class Grid {
    constructor() {
        // const values
        this.size = {
            width: 20,
            height: 20,
        };
        this.unit = 30;

        // player
        this.playerPosition = {
            x: 0,
            y: 3
        }
        this.dropLocked = false;

        // field initization
        this.values = [];
        for (let i = 0; i < this.size.height; i++) {
            this.values.push(new Array(this.size.width).fill(0));
        }
        this.values[this.playerPosition.x][this.playerPosition.y] = 1;
    }

    movePlayer(direction) {
        if (this.playerPosition.x + direction.x >= this.size.width ||
            this.playerPosition.x + direction.x < 0 ||
            this.playerPosition.y + direction.y >= this.size.height ||
            this.playerPosition.y + direction.y < 0) {
                return
            }
        if (this.values[this.playerPosition.x + direction.x][this.playerPosition.y + direction.y] === 0) {
            if (this.dropLocked) {
                this.dropLocked = false;
                this.values[this.playerPosition.x][this.playerPosition.y] = 2;
            } else {
                this.values[this.playerPosition.x][this.playerPosition.y] = 0;
            }
            this.playerPosition.x += direction.x;
            this.playerPosition.y += direction.y;
            this.values[this.playerPosition.x][this.playerPosition.y] = 1;
        }
    }

    dropBomb() {
        this.dropLocked = true;
    }
}

const grid = new Grid();

// class Player {
//     constructor({ position, grid }) {
//         this.position = position;
//     }

//     // move(direction) {
//     // }
// }
