"use strict";

const taskList = document.querySelector("#task_list");
const form = document.querySelector("#newTaskForm");
const list = ["Personal", "Personal", "Personal", "Personal"];
const dateHeader = document.querySelector("#date_header");
const completed = document.querySelector("input[type='checkbox']");

function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector('input[name="taskName"]').value;
    const date = form.querySelector('input[name="date"]').value;
    const listValue = form.querySelector('select[name="list"]').value;

    const storageList = JSON.parse(window.localStorage.getItem("list")) ?? [];
    storageList.push({ name, date, listValue });
    window.localStorage.setItem("list", JSON.stringify(storageList));

    window.location.href = "./index.html";
  });
}

function deleteTask(id) {
  const jsonList = JSON.parse(window.localStorage.getItem("list"));

  console.log(jsonList);
  jsonList.splice(id, 1);
  console.log(jsonList);
  window.localStorage.setItem("list", JSON.stringify(jsonList));
  window.location.href = "./index.html";
}

if (taskList) {
  dateHeader.innerHTML = new Date().toDateString();
  const jsonList = JSON.parse(window.localStorage.getItem("list"));
  const jsonListToday = jsonList.filter((item) =>
    isSameDay(new Date(item.date), new Date())
  );

  jsonListToday.forEach((listItem, index) => {
    taskList.innerHTML += `<li class="task display-flex">
    <div class="button__container display-flex align-center">
      <input
        type="checkbox"
        name="completed"
        id="completed"
        value="${index}"
        onclick="deleteTask(${index})"
      />
    </div>
    <div class="task__information display-flex">
      <div class="wrapper">
        <div class="task__body">
          <div class="task__section">
            <p>
             ${listItem.name}
            </p>
          </div>
          <div class="task__section">
            <span class="task__date">${listItem.date}</span>
            <span class="task__list">${list[listItem.listValue]}</span>
          </div>
        </div>
      </div>
      <div class="button__wrapper display-flex align-center">
        <button class="task__detailed-information btn-normal">
          >
        </button>
      </div>
    </div>
  </li>`;
  });
}
