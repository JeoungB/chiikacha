// 1. 스코어 실시간 만들기
// 1. 시간 제한 만들기 ( 달의 색상이 위로 차오르게 )

const $gameArea = document.querySelector(".touch-game_container .items");
const $obj = document.querySelectorAll(".touch-game_container .items ul li");
const $score = document.querySelector(".footer_container p");

let score = 0;
// 각 요소($obj)에 vector , speed, color 객체를 map함수로 추가.
let objects = Array.from($obj).map(() => ({
  vector: { x: Math.random() * 1000, y: Math.random() * 1000 },
  speed: {
    x: Math.random() * 1 + 1,
    y: Math.random() * 1 + 1,
  },
  color : {
    color : Math.floor(Math.random() * 2) ? 'red' : 'yellow'
  },
  opacity : {
    value : Math.floor(Math.random() * 100),
    cycle : 1
  }
}));

// 초기 오브젝트 배치
const startSet = () => {
    objects.forEach((obj, i) => {
    $obj[i].style.top = obj.vector.x;
    $obj[i].style.left = obj.vector.y;
  });
};

const animation = () => {
  objects.forEach((obj, i) => {
    // obj.vector.x , obj.speed.y 를 간결하게.
    // 이는 객체 분해할당 으로 위의 map함수로 추가해준 obj의 객체를 분리해서 사용.
    const { vector, speed, opacity, color } = obj;

    vector.x += speed.x;
    vector.y += speed.y;

    opacity.value += opacity.cycle;

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

    if(opacity.value > 100) {
      setTimeout(() => {
        opacity.cycle = -(Math.random() * 2);
      }, Math.floor(Math.random() * 3000));
    }

    if(opacity.value < 0) {
      color.color = Math.floor(Math.random() * 2) ? 'red' : 'yellow'
      setTimeout(() => {
        opacity.cycle = (Math.random() * 2);
      }, Math.floor(Math.random() * 3000));
    }

    $obj[i].style.transform = `translate(${vector.x}px, ${vector.y}px)`;
    $obj[i].style.backgroundColor = color.color;
    $obj[i].style.boxShadow = `0px 0px 30px 20px ${color.color}`;
    $obj[i].style.opacity = `${opacity.value}%`; 
  });
  requestAnimationFrame(animation);
};

// 점수 체크
const checkScore = (color) => {
  if(color === "yellow") { score += 1 }
  if(color === "red") { score -= 1 }

  $score.innerText = `score : ${score}`;
};

// 터치 시 점수 계산 및 사라졌다가 다시 생김.
const clickHandler = () => {
  $obj.forEach(obj => {
    obj.addEventListener('click', (e) => {
      e.target.style.display = 'none';

      setTimeout(() => {
        e.target.style.display = 'block';
      }, 1000);

      checkScore(e.target.style.backgroundColor);
    });
  });
};

startSet();
requestAnimationFrame(animation);
clickHandler();
