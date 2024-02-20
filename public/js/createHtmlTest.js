document.addEventListener("DOMContentLoaded", function () {
  let createArrTests = document.querySelector(".createArrTests");
  let addQuestionsFormBtn = document.querySelector(".addQuestionsFormBtn");
  let formContentHeader = document.querySelector(".formContentHeader");
  let submit = document.querySelector(".submit");
  let messageCreateResult = document.querySelector(".messageCreateResult");
  let messageResultTest = document.querySelector(".messageResultTest");
  let paginationCreate = document.querySelector(".paginationCreate");
  let messageBtnContent = document.querySelector(".messageBtnContent");
  let count = 0;
  addQuestionsFormBtn.addEventListener("click", function (event) {
    event.preventDefault();

    formContentHeader.style.display = "none";
    submit.style.display = "block";
    messageCreateResult.style.display = "block";
    messageBtnContent.style.display = "block";

    let newQuestionsForm = document.createElement("div");
    newQuestionsForm.classList.add("questonsForm");
    count++;
    newQuestionsForm.innerHTML = `
      <h5 name="questions[${count}][title]">Вопрос № ${count}</h5>
      <div class="questionsContent">
          <div class="tooltipQuestions">
              <div class="tooltip-toggle-questions">
                  <p>Вопрос теста</p>
                  <img src="/chto-luchshe.jpg" alt="" class="tooltip-icon">
                  <div class="tooltip-text-questions">Сформулируйте интересный завлекающий вопрос теста</div>
              </div>
              <div class="questionsCount">
                  <input type="text" name="questions[${count}][question]" class="questionsInput"></input>
                  <input type="hidden" name="questionsTitle" class="questionsTitle" value="Вопрос номер ${count}">
              </div>
          </div>
      </div>
      <div class="tooltip-toggle-questions">
        <p>варианты ответов</p>
        <img src="/chto-luchshe.jpg" alt="" class="tooltip-icon">
        <div class="tooltip-text-questions">Добавьте два или больше вариантов ответа и укажите галочкой верный.</div>
      </div>
      <div class="addOptionsContentBtn">
      
        <button class="addTwoOptionsBtn">Добавить два варианта</button>
        <div class="twoOptionsContent"></div>
        <button class="addManyOptionsBtn">Добавить много вариантов</button>
        <div class="manyOptionsContent"></div>
      </div>
      <input type="file" name="image[]"  id="imgCreateTest" multiple />
    `;
    createArrTests.appendChild(newQuestionsForm);
    createPaginationTestBtn();
    updateVisibilityCreate();
    addClassPaginationBtn();

    let addTwoOptionsBtn = newQuestionsForm.querySelector(".addTwoOptionsBtn");
    let addManyOptionsBtn = newQuestionsForm.querySelector(".addManyOptionsBtn");

    addTwoOptionsBtn.addEventListener("click", function (event) {
      event.preventDefault();
      let twoOptionsContent = addTwoOptionsBtn.nextElementSibling;

      twoOptionsContent.innerHTML = `
        <div class="twoOptionsContainer">
          <div class="twoOptions">
              <input type="text" class="twoOptions1" name="questions[${count}][twoOptions][0]">
              <input type="radio" name="questions[${count}][radio]" class="radioOption" value="0">
          </div>
          <div class="twoOptions">
              <input type="text" class="twoOptions2" name="questions[${count}][twoOptions][1]">
              <input type="radio" name="questions[${count}][radio]" class="radioOption" value="1">
          </div>
          <button id="deleteTwoOptionsBtn">Удалить ответы</button>
        </div>`;
      addTwoOptionsBtn.style.display = "none";
      addManyOptionsBtn.style.display = "none";

      let deleteTwoOptionsBtn = newQuestionsForm.querySelector(
        "#deleteTwoOptionsBtn"
      );
      deleteTwoOptionsBtn.addEventListener("click", function (event) {
        event.preventDefault();
        deleteTwoOptionsBtn.parentElement.remove();
        addTwoOptionsBtn.style.display = "block";
        addManyOptionsBtn.style.display = "block";
      });
    });

    addManyOptionsBtn.addEventListener("click", function (event) {
      event.preventDefault();
      let manyOptionsContent = addManyOptionsBtn.nextElementSibling;
      manyOptionsContent.innerHTML += `
        <div class="answerForm">
          <button class="addAnswerButton">добавить ответ</button>
        </div>`;
      addTwoOptionsBtn.style.display = "none";
      addManyOptionsBtn.style.display = "none";
      let addAnswerButton = newQuestionsForm.querySelector(".addAnswerButton");

      addAnswerButton.addEventListener("click", function (event) {
        event.preventDefault();
        let answerList = addAnswerButton.parentElement;
        let newAnswerListItem = document.createElement("div");
        newAnswerListItem.classList.add("answerListItem");
        newAnswerListItem.innerHTML = `
          <input type="text" class="manyOptions" name="questions[${count}][manyOptions][]">
          <input type="checkbox" class="checkbox" name="questions[${count}][manyOptions][${count}][checkbox]">
          <input type="hidden" name="questions[${count}][checkbox]" value="">
          <img src="/1648003803_45-kartinkin-net-p-krestik-kartinki-48.png" alt="" class="deleteManyOptionsButton">`;
        answerList.appendChild(newAnswerListItem);

        let checkboxes = newAnswerListItem.querySelectorAll(".checkbox");

        checkboxes.forEach(function (checkbox) {
          checkbox.addEventListener("click", function () {
            checkbox.setAttribute("name", "flag");
            let hiddenCheckbox = checkbox.nextElementSibling;
            hiddenCheckbox.value = checkbox.value;
          });
        });
        let deleteManyOptionsButtons = newAnswerListItem.querySelectorAll(
          ".deleteManyOptionsButton"
        );

        deleteManyOptionsButtons.forEach(function (deleteManyOptionsButton) {
          deleteManyOptionsButton.addEventListener("click", function () {
            newAnswerListItem.remove();
          });
        });
        let delBtns = manyOptionsContent.querySelectorAll(".deleteManyOptionsButton");

        delBtns.forEach(function (delBtn) {
          delBtn.addEventListener("click", function () {
            let listItem = delBtn.parentElement;
            listItem.remove();

            if (answerList.children.length === 0) {
              let answerForm = manyOptionsContent.querySelector(".answerForm");

              addTwoOptionsBtn.style.display = "block";
              addManyOptionsBtn.style.display = "block";
              answerForm.remove();
            }
          });
        });
      });
    });

  });

  messageCreateResult.addEventListener("click", function (event) {
    event.preventDefault();
    if (
      messageResultTest.style.display === "block" ||
      messageResultTest.style.display === ""
    ) {
      messageResultTest.style.display = "none";
      messageCreateResult.textContent =
        "Добавить сообщения";
    } else {
      messageResultTest.style.display = "block";
      messageCreateResult.textContent =
        "Скрыть сообщения ";
    }
  });

  function createPaginationTestBtn() {
    let button = document.createElement("button");
    button.classList.add("paginationCreateBlock");
    button.textContent = createArrTests.children.length;
    paginationCreate.appendChild(button);
  }

  function updateVisibilityCreate() {
    for (let i = 0; i < createArrTests.children.length; i++) {
      createArrTests.children[i].style.display = "none";
    }
    createArrTests.children[createArrTests.children.length - 1].style.display = "block";
  }
  function updateVisibility(pageNumber) {
    for (let i = 0; i < createArrTests.children.length; i++) {
      if (i === pageNumber - 1) {
        createArrTests.children[i].style.display = "block";
      } else {
        createArrTests.children[i].style.display = "none";
      }
    }
  }
  function addClassPaginationBtn() {
    paginationCreate.addEventListener("click", function (event) {
      if (event.target.classList.contains("paginationCreateBlock")) {
        let allButtons = document.querySelectorAll(".paginationCreateBlock");
        allButtons.forEach((button) => button.classList.remove("styleBtn"));
        event.target.classList.add("styleBtn");

        let pageNumber = parseInt(event.target.textContent, 10);
        updateVisibility(pageNumber);
      }
    });
  }
});








   