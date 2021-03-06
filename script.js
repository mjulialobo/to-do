const listElement = document.querySelector("#app ul");
const inputElement = document.querySelector("#app input");
const buttonElement = document.querySelector("#app button");

const toDos = JSON.parse(localStorage.getItem("list_toDos")) || [];
const doneToDos = JSON.parse(localStorage.getItem("list_doneToDos")) || [];

renderToDos();

//transformar ToDo em ID, class active em todos
function createListItemWithClass(className) {
  let toDoElement = document.createElement("li");

  toDoElement.classList.add(className);

  toDoElement.id = toDo;

  let toDoText = document.createTextNode(toDo);

  let deleteLinkElement = document.createElement("i");
  let checkInput = document.createElement("input");
  checkInput.type = "checkbox";

  deleteLinkElement.setAttribute("class", "fa fa-trash-o");

  let taskIndex = toDos.indexOf(toDo);
  deleteLinkElement.setAttribute("onclick", "deleteToDo(" + taskIndex + ")");

  /*   deleteLinkElement.setAttribute(
    "onclick",
    "deleteToDo(" + toDoElement.id + ")"
  ); */

  if (className === "done") {
    checkInput.setAttribute("onchange", "uncheckToDo(" + taskIndex + ")");
    checkInput.checked = "on";
  } else if (className === "todo") {
    checkInput.setAttribute("onchange", "checkToDo(" + taskIndex + ")");
  }

  toDoElement.appendChild(checkInput);
  toDoElement.appendChild(toDoText);
  toDoElement.appendChild(deleteLinkElement);

  return toDoElement;
}

function renderToDos() {
  listElement.innerHTML = "";

  for (toDo of toDos) {
    const toDoElement = createListItemWithClass("todo");

    listElement.appendChild(toDoElement);
  }
  for (toDo of doneToDos) {
    const toDoElement = createListItemWithClass("done");

    listElement.appendChild(toDoElement);
  }
}

function addToDo() {
  const toDoText = inputElement.value;

  toDos.push(toDoText);
  inputElement.value = "";
  renderToDos();
  saveToStorage();

  inputElement.value = "";
  inputElement.focus();
}

function checkToDo(pos) {
  const selectedTask = toDos.splice(pos, 1).pop();
  doneToDos.push(selectedTask);
  renderToDos();
  saveToStorage();
}

function uncheckToDo(pos) {
  const selectedTask = doneToDos.splice(pos, 1).pop();
  toDos.push(selectedTask);
  renderToDos();
  saveToStorage();
}

/* function addClassDelete(id) {
  const removedItem = document.getElementById(id);
  removedItem.classList.add("delete");
} */

function deleteToDo(pos) {
  /* CHANGE POS TO ID
     console.log(id);
  addClassDelete(id);
  const todoIndex = toDos.findIndex((item) => item === id);
  toDos.splice(todoIndex, 1); */
  toDos.splice(pos, 1);
  renderToDos();
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("list_toDos", JSON.stringify(toDos));
  localStorage.setItem("list_doneToDos", JSON.stringify(doneToDos));
}
