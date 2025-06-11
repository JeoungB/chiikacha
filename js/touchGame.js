const $gameArea = document.querySelector(".touch-game_container .items");
const $obj = document.querySelectorAll(".touch-game_container .items ul li");

const vector = {x : 0 , y : 0};
let speedX = Math.random() * 2;
let speedY = Math.random() * 2;

const animation = () => {
    vector.x += speedX;
    vector.y += speedY;

    // 화면 밖으로 나가려하면
    if($gameArea.clientWidth < vector.x) {
        speedX = -2;
    };

    if(vector.x < 0) {
        speedX = 2;
    };

    if($gameArea.clientHeight < vector.y) {
        speedY = -2;
    };

    if(vector.y < 0) {
        speedY = 2;
    };

    $obj[0].style.setProperty("--x", `${vector.x}px`);
    $obj[0].style.setProperty("--y", `${vector.y}px`);
    requestAnimationFrame(animation);
};

requestAnimationFrame(animation);