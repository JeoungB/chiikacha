const $modal = document.querySelector(".modal");
const yes = document.getElementById("yes");
let $modalText = document.querySelector(".modal p");
let modalState = false;
let drawState = 0;
let retultDate = [];

// 1뽑.
function oneDraw() {
    event.stopPropagation();
    $modalText.innerText = "1회 먼작귀 친구들을 불러볼까요?"
    $modal.style.display = "block";
    modalState = true;
    drawState = 1;
};

// 5뽑.
function fiveDraw() {
    event.stopPropagation();
    $modalText.innerText = "5회 먼작귀 친구들을 불러볼까요?"
    $modal.style.display = "block";
    modalState = true;
    drawState = 5;
};

// 모달 없애기.
function modalCencel() {
    $modal.style.display = "none";
    modalState = false;
};

// 모달 외 영역 클릭 시 모달 없애기.
document.addEventListener('click', (e) => {
    //$modal.contains : 모달에 클릭한 요소가 포함되어 있나 없나.
    if(modalState && !$modal.contains(e.target)) {
        modalCencel();
    };
});

// 뽑기 결과.
function addItem(resultData) {
    console.log(resultData)
    const result = document.createElement("section");
    const ul = document.createElement("ul");
    const button = document.createElement("button");
    const bgImg = document.createElement("img");
    const name = document.createElement("p");
    bgImg.src = `./imgs/point.png`;

    button.setAttribute("onclick", "removeRestult()");

    for(let i = 0 ; i < drawState ; i++) {
        const li = document.createElement("li");
        li.appendChild(bgImg);
        li.append(name);
        ul.appendChild(li);
    }
    result.setAttribute('class', 'result');
    result.append(ul,button);
    document.querySelector(".game").appendChild(result);
};

// 뽑기 1회, 5회 선택 시 회면 전환.
function handleDraw() {
    document.querySelector(".menu").style.display = "none";
    document.querySelector(".nomal-banner").style.display = "none";
    let resultData = [];

    fetch(`data/itemDatas.json`)
    .then(res => res.json())
    .then(data => {
        for(let j = 0 ; j < drawState ; j++) {
            const randomValue = Math.floor(Math.random() * 100);
            let cumulativeProbability = 0;
            for(let i = 0 ; i < data.length ; i++) {
                cumulativeProbability += data[i].probability;
                if(randomValue < cumulativeProbability) {
                    resultData.push(data[i]);
                    break;
                };
            };   
        }
        addItem(resultData);
    });
};

// 뽑기화면 삭제.
function removeRestult() {
        document.querySelector(".result").remove();
        document.querySelector(".menu").style.display = "block";
        document.querySelector(".nomal-banner").style.display = "block";
};


