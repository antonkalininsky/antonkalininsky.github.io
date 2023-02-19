const GRID_PROP = {
    size: {
        width: 20,
        height: 20
    },
    unit: 30
}

// создаю сетку
const grid = [];

for (let i = 0; i < GRID_PROP.size.height; i++) {
    grid.push(new Array(GRID_PROP.size.width).fill(0));
}

grid[0][3] = 1;