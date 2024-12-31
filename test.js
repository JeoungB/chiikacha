const $detail1 = document.querySelector(".detail1");
const $detail2 = document.querySelector(".detail2");

const routes = {
    "#" : "<h1>기본 페이지</h2>",
    "#detail1" : "<h1>상세 페이지1</h1>",
    "#detail2" : "<h1>상세 페이지2</h1>"
}

const renderPage = () => {
   const hash = window.location.hash;
   const $detailPage = document.getElementById("content");

   if(routes[hash]) {
    $detailPage.innerHTML = routes[hash];
   } else {
    $detailPage.innerHTML = `<h2>404<h2>`
   };
};

$detail1.addEventListener('click', () => {
    window.location.hash = "#detail1"
});

$detail2.addEventListener('click', () => {
    window.location.hash = "#detail2"
});

window.addEventListener('hashchange', renderPage);

if (!window.location.hash) {
    window.location.hash = "#";  // 기본 페이지 설정
  } else {
    renderPage();
  }