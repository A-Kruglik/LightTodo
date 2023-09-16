import { count, countCheck } from "./styles/count.js";

const todoTemplate = document.querySelector("[data-todo-item-template]");
const todoContainer = document.querySelector("[data-todo-container]");
const inputAdd = document.querySelector("[data-input-add]");
const btnAdd = document.querySelector("[data-btn-add]");
const btnRemove = document.querySelector("[data-item-btn]");
const btnClear = document.querySelector("[data-btn-clear]");

let todos = [];

btnAdd.addEventListener("click", () => {
  let text = inputAdd.value.trim();

  if (text) {
    const newTodo = {
      id: todos.length + 1,
      text,
    };
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    inputAdd.value = "";
  }

  inputAdd.focus();
  render();
});

btnClear.addEventListener("click", () => {
  todos = [];
  localStorage.clear();

  render();
});

function createTodo(id, text) {
  const todoItem = document.importNode(todoTemplate.content, true);
  const todoText = todoItem.querySelector("[data-item-text]");
  todoText.textContent = text;

  const btnRemove = todoItem.querySelector("[data-item-btn]");
  btnRemove.addEventListener("click", () => {
    todos = todos.filter((todo) => todo.id != id);
    localStorage.removeItem("todos");
    localStorage.setItem("todos", JSON.stringify(todos));

    render();
  });

  return todoItem;
}

function clearTodoList() {
  todoContainer.innerHTML = "";
}

function appendTodo() {
  if (todos.length) {
    todos.forEach((el) => {
      const todo = createTodo(el.id, el.text);
      todoContainer.append(todo);
    });
  }
}

function render() {
  clearTodoList();
  appendTodo();
  countCheck();
  count();
}

function checkTodo() {
  const localTodo = JSON.parse(localStorage.getItem("todos"));

  if (localTodo) {
    localTodo.forEach((el) => {
      todos.push(el);
      todoContainer.append(el);
    });
  }
}

checkTodo();
render();
