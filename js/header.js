// 뽑기 포인트
const gamePointHandler = () => {
    const $gamePointElement = document.getElementById('game-point');
    let gamePoint = JSON.parse(window.localStorage.getItem('gamePoint'));

    if(gamePoint === null) {
        $gamePointElement.innerText = '0p';
    }

    if(gamePoint !== null) {
        $gamePointElement.innerText = (gamePoint) + 'p';
    }

};

// scrollntoView ( 게임하기 버튼 )
const gameMenuView = (e) => {
    let datasetLink = e.target.dataset.link;
    let $gameInfo = document.getElementById(datasetLink);
    $gameInfo.scrollIntoView({behavior : "smooth"});
};

gamePointHandler();