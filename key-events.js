window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            grid.movePlayer({
                x: 0,
                y: -1
            });
            break;
        case "ArrowDown":
            grid.movePlayer({
                x: 0,
                y: 1
            });
            break;
        case "ArrowLeft":
            grid.movePlayer({
                x: -1,
                y: 0
            });
            break;
        case "ArrowRight":
            grid.movePlayer({
                x: 1,
                y: 0
            });
            break;
        case " ":
            grid.dropBomb();
            break;
    }
});
