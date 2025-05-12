// ------ 게임으로 이동 및 뽑기
const $gameList = document.querySelectorAll('.game-list li');
const $drawBtn = document.querySelectorAll('.draw-container button');
const $drawAlert = document.querySelector('.draw-alert');
const $drawAlertButtons = document.querySelectorAll('.draw-btn button');
const $drawAlertMessege = document.querySelector('.draw-alert > p');
const $drawAlertContainer = document.querySelector('.draw-alert_container');
let alertState = false;

// 게임 이동 버튼
$gameList.forEach(gameMoveBtn => {
    gameMoveBtn.addEventListener('click', e => {
        let cardLink = `cardGame.html`;
        let btn = e.target;
        if(btn.className === 'card-game') {
            location.href = cardLink;
        };
    });
});

// 뽑기 버튼
$drawBtn.forEach(drawBtn => {
    drawBtn.addEventListener('click', e => {
        let btn = e.target;
        // 1뽑 클릭 시.
        if(btn.id === 'one-draw') {
            DrawAlert(1);
        }

        // 5뽑 클릭 시.
        if(btn.id === 'five-draw') {
            DrawAlert(5);
        }
    });
});

// 뽑기 확인창
const DrawAlert = (num) => {
    $drawAlertMessege.innerText = `${num}회 뽑기 하시겠습니까?`;
    $drawAlertContainer.style.display = 'block';
    setTimeout(() => {
        $drawAlert.style.bottom = '1%';
    }, 100)
};

// 뽑기 실행 버튼
$drawAlertButtons.forEach(drawBtn => {
    drawBtn.addEventListener('click', e => {
        let btn = e.target;
        if(btn.id === 'draw') {
            console.log('실행');
        };

        if(btn.id === 'cancel') {
            $drawAlert.style.bottom = '-20%';
            setTimeout(() => {
                $drawAlertContainer.style.display = 'none';
            }, 500)
        };
    });
});

// 밖에 클릭 시 뽑기확인 창 내리기.
$drawAlertContainer.addEventListener('click', e => {
    if(!$drawAlert.contains(e.target)) {
        $drawAlert.style.bottom = '-20%';
        setTimeout(() => {
            $drawAlertContainer.style.display = 'none';
        }, 500)
    }
})