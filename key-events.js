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
            lastKey = "up";
            break;
        case "ArrowDown":
            keys.down.pressed = true;
            lastKey = "down";
            break;
        case "ArrowLeft":
            keys.left.pressed = true;
            lastKey = "left";
            break;
        case "ArrowRight":
            keys.right.pressed = true;
            lastKey = "right";
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
