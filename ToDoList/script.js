// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todo");
const todoDesc = document.querySelector(".taskdesc");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
  if (todoInput.value == "") {
    alert("Task Cannot Be Empty");
    event.preventDefault();
  } else {
    // prevent form from submitting
    event.preventDefault();

    //   Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //   Create Li
    const newTodo = document.createElement("li");
    // newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    //    Todo Description
    const tododesc = document.createElement("p");
    tododesc.classList.add("description");
    tododesc.innerText = todoInput.value;
    newTodo.appendChild(tododesc);
    todoDiv.appendChild(newTodo);
    // text area

    if (todoDesc.value == "") {
    } else {
      const descadd = document.createElement("p");
      descadd.classList.add("Description");
      descadd.innerText = "Description Of Task :" + todoDesc.value;
      newTodo.appendChild(descadd);
    }

    // Add todo to local storage
    saveLocalTodos(todoInput.value);
    // Check mark button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class = "fas fa-check-circle"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // Check Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append To List
    todoList.appendChild(todoDiv);
    alert("Your Task Added");
  }
  // Clear Todo input value
  todoInput.value = "";
  todoDesc.value = "";
}
function deleteCheck(e) {
  const item = e.target;

  // Delete Todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // Check Mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // Check --Hey do i already have thing in there?]
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
  // console.log("Hello");
  // Check --Hey do i already have thing in there?]
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //   Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //   Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //    Todo Description
    const tododesc = document.createElement("p");
    tododesc.classList.add("description");
    tododesc.innerText = todoInput.value;
    newTodo.appendChild(tododesc);
    todoDiv.appendChild(newTodo);

    // Check mark button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class = "fas fa-check-circle"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // Check Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append To List
    todoList.appendChild(todoDiv);
  });
}
function removeLocalTodos(todo) {
  // Check --Hey do i already have thing in there?]
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
