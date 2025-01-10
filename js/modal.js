const $modalMenu = document.querySelector(".menu-container .menu");
const $modal = document.querySelector(".menu-container");
const $closeBtn = document.querySelector(".close");

// 모달 닫기.
const closeMoal = () => {
    $modalMenu.style.transform = "translate(0, -450px)";

    let time = setTimeout(() => {
      $modal.style.display = "none";
    }, 400);
};

// 클릭해서 닫을때.
$closeBtn.addEventListener("click", () => {
    closeMoal();
});

// 탭 (엔터)키 닫을때.
$closeBtn.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        closeMoal();
    }
});
