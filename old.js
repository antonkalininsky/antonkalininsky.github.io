// canvas setup
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);

// init
// const player = new Player({
//     position: {
//         x: 100,
//         y: 100,
//     },
//     size: {
//         width: 30,
//         height: 30,
//     },
// });

// const wall = new Wall({
//     position: {
//         x: 300,
//         y: 300,
//     },
//     size: {
//         width: 100,
//         height: 50,
//     },
//     color: `gray`,
// });

// const walls = [];
// walls.push(wall);
// const bombs = [];

// animation loop
function animate() {
    // зацикливание функции анимации
    window.requestAnimationFrame(animate);

    // очистка канваса
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    // отработка нажатий
    // player.velocity.x = 0;
    // player.velocity.y = 0;
    // if (keys.up.pressed && lastKey !== "down") {
    //     player.velocity.y = -1;
    // } else if (keys.down.pressed && lastKey !== "up") {
    //     player.velocity.y = 1;
    // } else if (keys.left.pressed && lastKey !== "right") {
    //     player.velocity.x = -1;
    // } else if (keys.right.pressed && lastKey !== "left") {
    //     player.velocity.x = 1;
    // }
    // if (keys.space.pressed) {
    //     bombs.push(player.dropBomb());
    //     keys.space.pressed = false;
    // }

    // колизии
    // if (
    //     ((player.position.x + player.size.width > wall.position.x &&
    //         player.position.x + player.size.width <
    //             wall.position.x + wall.size.width) ||
    //         (player.position.x > wall.position.x &&
    //             player.position.x < wall.position.x + wall.size.width)) &&
    //     ((player.position.y + player.size.height > wall.position.y &&
    //         player.position.y + player.size.height <
    //             wall.position.y + wall.size.height) ||
    //         (player.position.y > wall.position.y &&
    //             player.position.y < wall.position.y + wall.size.height))
    // ) {
    //     console.log(`collision`);
    // }


    // if (
    //     player.velocity.x > 0 &&
    //     player.position.x + player.size.width + player.velocity.x > wall.position.x &&
    //     !(
    //         player.position.y + player.size.height < wall.position.y ||
    //         player.position.y > wall.position.y + wall.size.height
    //     )

    // ) {
    //     player.velocity.x = 0;
    // }

    // отрисовка графических элементов
    // игрок
    // player.update();
    // // бомбы
    // bombs.forEach((x) => {
    //     x.update();
    //     return;
    // });
    // // стены
    // walls.forEach((x) => {
    //     x.update();
    //     return;
    // });
}
animate();
