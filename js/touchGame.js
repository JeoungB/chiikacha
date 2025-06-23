const $gameArea = document.querySelector(".touch-game_container .items");
const $obj = document.querySelectorAll(".touch-game_container .items ul li");
// 1. 클릭하면 클릭한 요소 사라지게
// 2. 각 요소의 크기 및 색상을 다르게

let domArray = [];

for (let ii = 0; ii < $obj.length / 3; ii++) {
  let randomDom = Math.floor(Math.random() * $obj.length);
  domArray.push(randomDom);
};

// 각 요소($obj)에 vector , speed 객체를 map함수로 추가.
let objects = Array.from($obj).map(() => ({
  vector: { x: Math.random() * 700, y: Math.random() * 700 },
  speed: {
    x: Math.random() * 2 + 1,
    y: Math.random() * 2 + 1,
  },
  color : Math.floor(Math.random() * 2) ? 'red' : 'black'
}));

const animation = () => {
  objects.forEach((obj, i) => {
    // obj.vector.x , obj.speed.y 를 간결하게.
    // 이는 객체 분해할당 으로 위의 map함수로 추가해준 obj의 객체를 분리해서 사용.
    const { vector, speed, color } = obj;

    vector.x += speed.x;
    vector.y += speed.y;

    // 화면 밖으로 나가려하면
    if ($gameArea.clientWidth < vector.x) {
      speed.x = -(1 + Math.random() * 2);
    }

    if (vector.x < 0) {
      speed.x = 1 + Math.random() * 2;
    }

    if ($gameArea.clientHeight < vector.y) {
      speed.y = -(1 + Math.random() * 2);
    }

    if (vector.y < 0) {
      speed.y = 1 + Math.random() * 2;
    }

    $obj[i].style.transform = `translate(${vector.x}px, ${vector.y}px)`;
    $obj[i].style.backgroundColor = color;
  });
  requestAnimationFrame(animation);
};

requestAnimationFrame(animation);
