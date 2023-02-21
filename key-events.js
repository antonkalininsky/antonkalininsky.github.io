window.addEventListener("keydown", (event) => {
    if (game.disableControl) {
        return
    }
    switch (event.key) {
        case "ArrowUp":
            game.movePlayer({
                x: 0,
                y: -1
            });
            break;
        case "ArrowDown":
            game.movePlayer({
                x: 0,
                y: 1
            });
            break;
        case "ArrowLeft":
            game.movePlayer({
                x: -1,
                y: 0
            });
            break;
        case "ArrowRight":
            game.movePlayer({
                x: 1,
                y: 0
            });
            break;
        case " ":
            game.dropBomb();
            break;
    }
});
