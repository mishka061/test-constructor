let paginationTest = document.querySelector(".paginationTest");
let testConteiner = document.querySelectorAll(".testConteiner");
let seeResult = document.querySelector(".seeResult");
let takeTestAgain = document.querySelector(".TakeTestAgain");

let pageTest = 1;
let pageCurrent = 1;
let arrResponse = [];

function createPaginationTestBtn(pageNumber) {
  let button = document.createElement("button");
  button.classList.add("paginationCreateBlock");
  button.style.display = "none";
  button.textContent = pageNumber;

  button.addEventListener("click", function () {
    pageCurrent = pageNumber;
    updateVisibilityTest();
  });

  paginationTest.appendChild(button);
}

function updateVisibilityTest() {
  for (let i = 0; i < testConteiner.length; i++) {
    if (i < (pageCurrent - 1) * pageTest || i >= pageCurrent * pageTest) {
      testConteiner[i].style.display = "none";
    } else {
      testConteiner[i].style.display = "block";
    }
  }
  if (pageCurrent === Math.ceil(testConteiner.length / pageTest)) {
    seeResult.style.display = "block";
  } else {
    seeResult.style.display = "none";
  }
}

for (let i = 0; i < Math.ceil(testConteiner.length / pageTest); i++) {
  createPaginationTestBtn(i + 1);
}

testConteiner.forEach((container, index) => {
  container.addEventListener("click", function (event) {
    let button = event.target.closest(".takeQuestionsTestBtn");
    if (button) {
      event.stopImmediatePropagation();
      let buttonValue = button.value;
      arrResponse[index] = buttonValue;
      pageCurrent = Math.floor(index / pageTest) + 1;
      pageCurrent++;
      updateVisibilityTest();
      seeResult.style.display = "none";
      if (pageCurrent === testConteiner.length + 1) {
        seeResult.style.display = "block";
        arrResponseSubmit.setAttribute("name", "arrResponse");
        arrResponseSubmit.setAttribute("value", arrResponse.join(",")); // Преобразуйте массив в строку
      }
    }
  });
});

updateVisibilityTest();

takeTestAgain.addEventListener("click", function (event) {
  event.preventDefault();
  let id = takeTestAgain.getAttribute("data-id");
  window.location.href = "/takeTest/" + id;
});
