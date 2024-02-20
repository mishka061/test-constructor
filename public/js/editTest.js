document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    let target = event.target;

    if (target.classList.contains("delleteEditOptionsBtn")) {
      event.preventDefault();

      let parentContainer = target.closest(".editQuestonsForm");
      let addManyOptionsEditBtn = parentContainer.querySelector(
        ".addManyOptionsEditBtn"
      );
      let addTwoOptionsEditBtn = parentContainer.querySelector(
        ".addTwoOptionsEditBtn"
      );

      target.parentElement.remove();
      addManyOptionsEditBtn.style.display = "block";
      addTwoOptionsEditBtn.style.display = "block";
    }

    if (target.classList.contains("addTwoOptionsEditBtn")) {
      event.preventDefault();
      let parentContainer = target.closest(".editQuestonsForm");
      let addManyOptionsEditBtn = parentContainer.querySelector(
        ".addManyOptionsEditBtn"
      );
      let addTwoOptionsEditBtn = parentContainer.querySelector(
        ".addTwoOptionsEditBtn"
      );
      let twoOptionsContentEdit = parentContainer.querySelector(
        ".twoOptionsContentEdit"
      );

      let count = Array.from(parentContainer.parentElement.children).indexOf(
        parentContainer
      );

      twoOptionsContentEdit.innerHTML += `
              <div class="twoOptionsContainer">
                  <div class="twoOptions">
                      <input type="text" class="twoOptionsEdit1" name="questions[${count}][twoOptions][0]">
                      <input type="radio" name="questions[${count}][radio]" class="radioOption" value="0">
                  </div>
                  <div class="twoOptions">
                      <input type="text" class="twoOptionsEdit1" name="questions[${count}][twoOptions][1]">
                      <input type="radio" name="questions[${count}][radio]" class="radioOption" value="1">
                  </div>
                  <button class="delleteEditOptionsBtn">Удалить вариант ответа</button>
                  <input type="file" name="image[]" id="imgCreateTest" multiple />
              </div>`;

      addTwoOptionsEditBtn.style.display = "none";
      addManyOptionsEditBtn.style.display = "none";
    }

    if (target.classList.contains("addManyOptionsEditBtn")) {
      event.preventDefault();
      let parentContainer = target.closest(".editQuestonsForm");
      let addManyOptionsEditBtn = parentContainer.querySelector(
        ".addManyOptionsEditBtn"
      );
      let addTwoOptionsEditBtn = parentContainer.querySelector(
        ".addTwoOptionsEditBtn"
      );
      let manyOptionsContentEdit = parentContainer.querySelector(
        ".manyOptionsContentEdit"
      );

      let count = Array.from(parentContainer.parentElement.children).indexOf(
        parentContainer
      );
      manyOptionsContentEdit.innerHTML += `
              <div class="answerEditForm">
              <button class="addEditAnswerBtn">добавить ответ</button>
              </div>
              <input type="file" name="image[]" id="imgCreateTest" multiple />`;

      addTwoOptionsEditBtn.style.display = "none";
      addManyOptionsEditBtn.style.display = "none";

      let addEditAnswerBtn = parentContainer.querySelector(".addEditAnswerBtn");
      let answerList = parentContainer.querySelector(".answerEditForm");

      addEditAnswerBtn.addEventListener("click", function (event) {
        console.log("addEditAnswerBtn.addEventListener");
        event.preventDefault();
        let newAnswerListItem = document.createElement("div");
        newAnswerListItem.classList.add("answerListItem");
        newAnswerListItem.innerHTML += `
            <input type="text" class="manyOptionsEdit" name="questions[${count}][manyOptions][]">
            <input type="checkbox" class="checkbox" name="questions[${count}][manyOptions][${count}][checkbox]">
            <input type="hidden" name="questions[${count}][checkbox]" value="">
            <img src="/1648003803_45-kartinkin-net-p-krestik-kartinki-48.png" alt="" class="delManyEditOptButton">
            
          `;

        answerList.appendChild(newAnswerListItem);
        let deleteListOptionsBtn = document.querySelectorAll(
          ".delManyEditOptButton"
        );

        for (let i = 0; i < deleteListOptionsBtn.length; i++) {
          deleteListOptionsBtn[i].addEventListener("click", function () {
            deleteListOptionsBtn[i].parentElement.remove();
            let answerEditForm =
              parentContainer.querySelector(".answerEditForm");

            if (answerList.children.length === 0) {
              addTwoOptionsEditBtn.style.display = "block";
              addManyOptionsEditBtn.style.display = "block";
              answerEditForm.style.display = "none";
            }
          });
        }
      });
    }

    if (target.classList.contains("addEditListQuestionsForm")) {
      event.preventDefault();
      let parentContainer = target.previousElementSibling;

      let createLi = document.createElement("div");
      createLi.classList.add("editQuestonsForm");

      let count = parentContainer.querySelectorAll(".editQuestonsForm").length;

      createLi.innerHTML = `                   
              <h5 name="questions[${count}][title[${count}]]">Вопрос номер ${
        count + 1
      }</h5>
              <div class="questionsContent">
                  <h5>Напишите вопрос</h5>
                  <input type="text" name="questions[${count}][question]" class="questionsInput"></input>
                  <input type="hidden" name="questions[${count}][title]" class="questionsTitle" value="Вопрос номер ${
        count + 1
      }">
              </div>
              <div class="addOptionsEditContentBtn">
      
              <button class="addTwoOptionsEditBtn">Добавить два варианта </button>
              <div class="twoOptionsContentEdit" data-type="twoOptions"></div>
              <button class="addManyOptionsEditBtn">Добавить много вариантов</button>
              <div class="manyOptionsContentEdit" data-type="manyOptions"></div>
            </div>

             
          `;
      parentContainer.appendChild(createLi);
      updateEditNumbers();
    }

    function updateEditNumbers() {
      let questionForms = document.querySelectorAll(".editQuestonsForm");
      questionForms.forEach((form, index) => {
        let title = form.querySelector("h5");
        title.innerHTML = `Вопрос номер ${index + 1}`;
      });
    }
  });
});
