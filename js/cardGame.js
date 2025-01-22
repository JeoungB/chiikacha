// 기존 카드.
let imgs = [
  "A-갑옷씨.webp",
  "SS-우사기.png",
  "SS-하치와레.png",
  "SS-치이카와.webp",
];
// 중복 카드.
let imgsClone = imgs;
// 뒤집은 2개의 카드(비교).
let cards = [];
// 카드 갯수.
let cardCount = 8;
// 뒤집은 카드 갯수.
let clearCardCount = 0;
// 카드 배열 + 중복 카드 배열.
let cardImgs = imgs.concat(imgsClone);
// 비교 후 다르면 다시 뒤집을(style적용)카드.
let firstCard = null;
let secondCard = null;
// 게임 시작 여부
let startGame = false;

// 카트 클릭시 뒤집기 이벤트.
const clickCard = (e) => {
  // 게임 시작이 되면.
  if (startGame) {
    let target = e.target;
    // 카드 2개 뒤집기 전.
    if (cards.length < 2) {
      // 클릭한(fron)요소의 부모(li)를 뒤집는다.
      target.parentElement.style.transform = "rotateY(180deg)";
      // 클릭한 요소(front)의 다음 요소(back)의 자식 요소(img) : 클릭한 뒷면 이미지.
      let clickCardSrc = target.nextElementSibling.firstElementChild.src;
      let clickCardName = clickCardSrc.replace(/^.*\//, "");

      // 뒤집은 카드 비교할 배열.
      cards.push(clickCardName);

      if (!firstCard) {
        firstCard = target;
      } else {
        secondCard = target;
        cardMatch();
      }
    }
  }
};

// 카드 비교.
const cardMatch = () => {
  // 2개의 카드를 뒤집고 카드가 같다면.
  if (cards.length === 2 && cards[0] === cards[1]) {
    firstCard = null;
    secondCard = null;
    cards = [];
    clearCardCount += 1;
  }

  // 2개의 카드를 뒤집고 카드가 다르다면.
  if (cards.length === 2 && cards[0] !== cards[1]) {
    setTimeout(() => {
      firstCard.parentElement.style.transform = "rotateY(0deg)";
      secondCard.parentElement.style.transform = "rotateY(0deg)";

      firstCard = null;
      secondCard = null;
      cards = [];
    }, 1000);
  }
};

// 카드 배열 섞기.
const shuffleCards = () => {
  for (let i = cardImgs.length - 1; i > 0; i--) {
    // 0 ~ i + 1 까지의 랜덤한 숫자를 생성.
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // 카드 순서 바꾸기.
    [cardImgs[i], cardImgs[randomIndex]] = [cardImgs[randomIndex], cardImgs[i]];
  }
};

// 카드 만들기.
const makeCards = () => {
  for (let i = 0; i < cardCount; i++) {
    const card = document.createElement("li");
    const front = document.createElement("div");
    const frontImg = document.createElement("img");
    const backImg = document.createElement("img");
    const back = document.createElement("div");

    card.setAttribute("class", "card");

    front.setAttribute("class", "front");
    frontImg.setAttribute("src", "./imgs/카드앞면.png");
    front.setAttribute("onclick", "clickCard(event)");
    front.appendChild(frontImg);

    back.setAttribute("class", "back");
    backImg.setAttribute("src", "./imgs/" + cardImgs[i]);
    back.appendChild(backImg);

    card.append(front, back);
    document.querySelector(".card-list").appendChild(card);
  }
};

// 게임 알림
const startAlert = () => {
  const $alert = document.querySelector(".game-alert");
  let text = document.createElement("p");
  text.innerText = "시작!";

  $alert.classList.add('pointer');
  $alert.appendChild(text);
  $alert.setAttribute("onclick", "startGameclick(event)");
  $alert.setAttribute("onkeydown", "startGameEnter(event)");
};

// 게임 시작 (클릭)
const startGameclick = (e) => {
  e.target.style.display = 'none'
  startGame = true;
};

// 게임 시작 (엔터)
const startGameEnter = (e) => {
  if (e.key === "Enter") {
    startGameclick();
  }
};

shuffleCards();
makeCards();
startAlert();
