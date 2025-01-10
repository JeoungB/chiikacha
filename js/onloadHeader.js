window.addEventListener("load", function () {
  // 모든 엘리먼트를 불러온다.
  let allElements = document.getElementsByTagName("*");
  // data-include-path 속성이 붙은 값을 찾는다.
  Array.prototype.forEach.call(allElements, function (el) {
    let includePath = el.dataset.includePath;

    if (includePath) {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // outerHTML : html 태그에서 자신을 포함하기.
          el.outerHTML = this.responseText;
        }
      };
      xhttp.open("GET", includePath, true);
      xhttp.send();
    }
  });
});
