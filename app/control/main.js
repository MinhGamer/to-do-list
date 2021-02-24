import Task from '../model/Task.js';

let todoList = [];

const addTask = () => {
  const newTaskEle = document.getElementById('newTask');

  if (newTaskEle.value.trim() === '') return;

  let createId = Math.random().toString();

  const newTask = new Task(createId, newTaskEle.value, false);

  todoList.push(newTask);

  renderUncompletedTasks();
  newTaskEle.value = '';
  saveLocalStorage();
};

const saveLocalStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(todoList));
};

const getLocalStorage = () => {
  todoList = JSON.parse(localStorage.getItem('todoList')) || [];

  renderCompletedTasks();
  renderUncompletedTasks();
};

const compareASC = (a, b) => (a.content < b.content ? -1 : 0);

const compareDESC = (a, b) => (a.content > b.content ? -1 : 0);

// A -> Z
const sortASC = () => {
  todoList.sort(compareASC);
  renderUncompletedTasks();
  renderCompletedTasks();
};

// Z -> A
const sortDESC = () => {
  todoList.sort(compareDESC);

  renderUncompletedTasks();
  renderCompletedTasks();
};

document.getElementById('addItem').addEventListener('click', addTask);
document.getElementById('sortASC').addEventListener('click', sortASC);
document.getElementById('sortDESC').addEventListener('click', sortDESC);

// return todoListHTML
const renderTasks = (todoList) => {
  let todoListHTML = '';
  todoList.forEach((todoItem) => {
    todoListHTML += `
          <li>
            <p>${todoItem.content}</p>
            <div class="buttons">

                <button onclick="removeTask('${todoItem.id}')" class="remove"><i class="fa fa-trash"></i></button>

                <button onclick="checkCompleted('${todoItem.id}')" class="complete">
                <i class="fa fa-check-circle"></i>
                </button>

          </div>
        </li>
            `;
  });
  return todoListHTML;
};

const renderUncompletedTasks = () => {
  const uncompletedTasksEle = document.getElementById('todo');

  // render to HTML
  const uncompletedTasks = todoList.filter(
    (todoItem) => todoItem.isCompleted === false
  );
  const uncompletedTasksHTML = renderTasks(uncompletedTasks);
  uncompletedTasksEle.innerHTML = uncompletedTasksHTML;
};

const renderCompletedTasks = () => {
  const completedTaskEle = document.getElementById('completed');

  // render to HTML
  const completedTasks = todoList.filter(
    (todoItem) => todoItem.isCompleted === true
  );
  const completedTasksHTML = renderTasks(completedTasks);
  completedTaskEle.innerHTML = completedTasksHTML;
};

const removeTask = (id) => {
  const indexTaskFound = todoList.findIndex((todoItem) => todoItem.id === id);

  if (indexTaskFound === -1) return;

  todoList.splice(indexTaskFound, 1);

  renderUncompletedTasks();
  renderCompletedTasks();
  saveLocalStorage();
};

window.removeTask = removeTask;

const checkCompleted = (id) => {
  console.log(id);
  const indexTaskFound = todoList.findIndex((todoItem) => todoItem.id === id);
  if (indexTaskFound === -1) return;

  todoList[indexTaskFound].isCompleted = true;

  renderUncompletedTasks();
  renderCompletedTasks();
  saveLocalStorage();
};

window.checkCompleted = checkCompleted;

//-------function called at the begin---------
getLocalStorage();
