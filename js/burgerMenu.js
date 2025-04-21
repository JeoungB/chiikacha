// 클릭 시 모달 오픈.
const $modalMenu = document.querySelector(".menu-container .menu");
const $modal = document.querySelector(".menu-container");
const bugerMenuHandlerClick = () => {

  $modal.style.display = "block";

  let time = setTimeout(() => {
    $modalMenu.style.transform = "translate(0, 0)";
  }, 200);
  
  document.body.style.overflow = 'hidden';
};

// 엔터 시 모달 오픈.
const bugerMenuHandlerEnter = (e) => {
  if(e.key === 'Enter') {
    bugerMenuHandlerClick();  
  }
}

