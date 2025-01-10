const $burger = document.querySelector(".menu-trigger");

// 모달 오픈.
const openModal = () => {
  const $modalMenu = document.querySelector(".menu-container .menu");
  const $modal = document.querySelector(".menu-container");

  $modal.style.display = "block";

  let time = setTimeout(() => {
    $modalMenu.style.transform = "translate(0, 0)";
  }, 200);
};

// 클릭 시 모달 오픈.
$burger.addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});

// 탭(엔터)시 모달 오픈.
$burger.addEventListener('keydown', (e) => {
  e.preventDefault();
  if(e.key === 'Enter') {
    openModal();
  }
});

