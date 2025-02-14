// 뽑기 포인트
const gamePointHandler = () => {
    let gamePointElement = document.getElementById('game-point');
    let gamePoint = JSON.parse(window.localStorage.getItem('gamePoint'));

    gamePointElement.innerText = (gamePoint) + 'p';

};

gamePointHandler();