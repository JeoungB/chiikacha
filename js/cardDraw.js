// ------ 뽑기 확인
const $drawBtn = document.querySelectorAll(".draw-container button");
const $drawAlert = document.querySelector(".draw-alert");
const $drawAlertButtons = document.querySelectorAll(".draw-btn button");
const $drawAlertMessege = document.querySelector(".draw-alert > p");
const $drawAlertContainer = document.querySelector(".draw-alert_container");
const $drawPage = document.querySelector(".draw-page");
const $cardPack = document.getElementById("card-pack");
const $packContainer = document.querySelector(".card-pack_container");
const $cardResult = document.querySelector(".card-result");
const $instructions = document.querySelector(".draw-page p");
const $gamePointElement = document.getElementById('game-point');
let alertState = false;
let drawNum = 0;
let cardPackClickCount = 0;
let immpectColor = "rgba(6, 6, 255, 0.925)";
let immpectShadow = "aqua";
let borderSpeed = "4s";
let drawResult = [];

// 1회, 5회 뽑기 버튼
$drawBtn.forEach((drawBtn) => {
  drawBtn.addEventListener("click", (e) => {
    let point = JSON.parse(localStorage.getItem("gamePoint"));
    let btn = e.target;
    // 1뽑 클릭 시.
    if (btn.id === "one-draw" && point >= 10) {
      DrawAlert(1);
    }

    if (btn.id === "one-draw" && point < 10) {
      alert("포인트 부족!");
    }

    // 5뽑 클릭 시.
    if (btn.id === "five-draw" && point >= 50) {
      DrawAlert(5);
    }

    if (btn.id === "five-draw" && point < 50) {
      alert("포인트 부족!");
    }
  });
});

// 뽑기 확인창
const DrawAlert = (num) => {
  drawNum = num;
  cardPackClickCount = 0;
  $cardResult.replaceChildren();
  $drawAlertContainer.style.display = "block";
  $drawAlertMessege.innerText = `${num}회 뽑 하시겠습니까?`;

  setTimeout(() => {
    $drawAlert.style.bottom = "1%";
  }, 100);
};

// 뽑기 실행 버튼
$drawAlertButtons.forEach((drawBtn) => {
  drawBtn.addEventListener("click", (e) => {
    let btn = e.target;
    if (btn.id === "draw") {
      $drawPage.style.display = "block";
      drawAlertCancel();
      handleDraw();
    }
    if (btn.id === "cancel") {
      drawAlertCancel();
    }
  });
});

// 밖에 클릭 시 뽑기확인 창 내리기.
$drawAlertContainer.addEventListener("click", (e) => {
  if (!$drawAlert.contains(e.target)) {
    drawAlertCancel();
  }
});

// 뽑기 취소 함수
const drawAlertCancel = () => {
  $drawAlert.style.bottom = "-25%";
  setTimeout(() => {
    $drawAlertContainer.style.display = "none";
  }, 500);
};

// 뽑기 창 닫기 ( 리셋 )
const closeDrawPage = () => {
  // 4번째 터치때 잠시 이 함수를 잠그고 다시 풀어주자 연출 후 클릭하면 사라지게게
  if (cardPackClickCount > 4) {
    cardPackClickCount = 0;
    $drawPage.style.display = "none";
    immpectColor = "rgba(6, 6, 255, 0.925)";
    immpectShadow = "aqua";
    borderSpeed = "4s";
    $cardResult.classList.remove("show-result");
    $cardPack.classList.remove("glowImmpect");
    $cardPack.style.setProperty("--shadowColor", "rgba(6, 6, 255, 0.925)");
    $packContainer.style.setProperty("--color", "aqua");
    $packContainer.style.setProperty("--speed", "4s");
    $instructions.style.opacity = 0;
  }
};

//-------- 카드 뽑기
const cardClickHandler = (event) => {
  $cardPack.classList.add("card-vibration");
  setTimeout(() => {
    $cardPack.classList.remove("card-vibration");
  }, 100);
  cardPackClickCount += 1;

  // 아이템 등급에 따른 이펙트 조절 수정해야댐.
  if (cardPackClickCount == 2) {
    $cardPack.style.setProperty("--shadowColor", `${immpectColor}`);
    $packContainer.style.setProperty("--color", `${immpectShadow}`);
    $packContainer.style.setProperty("--speed", `${borderSpeed}`);
  }

  if (cardPackClickCount === 3) {
    $cardPack.className = "card-vibration_infinite";
  }
  // 마지막 클릭
  if (cardPackClickCount === 4) {

    $packContainer.style.setProperty("--color", "transparents");
    $cardPack.className = "glowImmpect";
    setTimeout(() => {
      $cardResult.classList.add("show-result");
      $instructions.style.opacity = 1;
      cardPackClickCount++;
    }, 1000);
  }
  console.log("카드 클릭 수", cardPackClickCount);
};

// --- 뽑기 데이터 랜덤 가져오기
const handleDraw = () => {
  drawResult = [];
  let point = JSON.parse(localStorage.getItem("gamePoint"));
  point = point - (drawNum * 10);
  localStorage.setItem("gamePoint", JSON.stringify(point));
  $gamePointElement.innerText = `${point}p`;
  fetch(`data/itemDatas.json`)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < drawNum; i++) {
        // 1~100 까지 랜덤 숫자
        const randomValue = Math.floor(Math.random() * 100);
        // 확률을 담을 객체
        let cumulativeProbability = 0;
        // 데이터의 아이템 확률이 조건에 부합할때까지 더함
        // ex) 첫번째 검사때 랜덤 숫자가 5가 나오면 1과 비교했을때 조건이 안맞기때문에
        // 다시 두번째 아이템 검사때 랜덤숫자 10이 나오면 총합 15 와 4를 비교....반복
        // 부합하면 배열에 아이템을 넣고 더한값 리셋 후 뽑기 횟수만큼 반복
        for (ii = 0; ii < data.length; ii++) {
          cumulativeProbability += data[ii].probability;

          if (randomValue < cumulativeProbability) {
            // 뽑은 카드 저장
            drawResult.push(data[ii]);
            // 뽑은 카드 화면 셋팅
            const img = document.createElement("img");
            const cardImg = data[ii].img;
            const cardColor = data[ii].background;
            img.src = cardImg;
            const li = document.createElement("li");
            li.style.background = cardColor;
            li.appendChild(img);
            $cardResult.appendChild(li);
            break;
          };
        };
      };

      // 뽑은카드 스토리지 저장.
      console.log(drawResult)
      let myCards = JSON.parse(window.localStorage.getItem("myCards"));
      if(myCards === null) {
        window.localStorage.setItem("myCards", JSON.stringify(drawResult));
      }
      
      if(myCards.length !== 0) {
        let newCards = [...myCards, ...drawResult];
        window.localStorage.setItem("myCards", JSON.stringify(newCards));
      }

      // 뽑은 카드 등급 확인.
      drawResult.forEach((cards) => {
        if (cards.grade === "SSS") {
          console.log("SSS");
          immpectColor = "rgb(140, 0, 255)";
          immpectShadow = "rgba(143, 3, 185, 0.99)";
          borderSpeed = ".5s";
        }

        if (cards.grade === "SS") {
          immpectColor = "rgb(255, 255, 0)";
          immpectShadow = "rgba(233, 233, 5, 0.99)";
          borderSpeed = "1s";
        }

        if (cards.grade === "S") {
          immpectColor = "rgb(255, 153, 0)";
          immpectShadow = "rgb(179, 125, 0)";
          borderSpeed = "2s";
        }
      });
    });
};
