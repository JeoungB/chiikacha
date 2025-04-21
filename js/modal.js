// 모달 닫기.
const closeMoalHandlerClick = () => {
  $modalMenu.style.transform = "translate(0, -450px)";
  let time = setTimeout(() => {
    $modal.style.display = "none";
  }, 400);

  document.body.style.overflow = 'auto';

};

const closeMoalHandlerEnter = (e) => {
  if(e.key === 'Enter') {
    closeMoalHandlerClick();
  }
}

$modal.addEventListener('click', (e) => {
  if($modal.style.display === "block" && !$modalMenu.contains(e.target)) {
    closeMoalHandlerClick();
  }
});

