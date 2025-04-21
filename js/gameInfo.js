// 게임 이동 버튼

const gameList = document.querySelectorAll('.game-list li');

gameList.forEach(gameMoveBtn => {
    gameMoveBtn.addEventListener('click', e => {
        let btn = e.target;
        if(btn.className === 'card-game') {
            console.log('d')
        }
    });
});