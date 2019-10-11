import Time from './Time.js';
import createAutoComplete from './autocomplete.js';

let todolist = new Time(new Date())
document.getElementById('wds').innerHTML = todolist.getWeekdayName();
document.getElementById('Time').innerHTML = todolist.getTimeInfo();
document.getElementById('energypct').innerHTML = todolist.getEnergyPct();
document.getElementById('lblGreetings').innerHTML = todolist.getGreetingInfo();
document.getElementById('Date').innerHTML = todolist.getMonthInfo();

let {autoComplete, getTaskMemory, addTaskMemory} = createAutoComplete();

document.getElementById("new-task").addEventListener('keyup', (e) => {
  autoComplete(e.target.value);
});

//Todolist Functions
let newTask = document.querySelector('#new-task');
let addTaskBtn = document.querySelector('#addTask');
let toDoUl = document.querySelector("#incomplete-tasks");
let completeUl = document.querySelector("#complete-tasks");

//Creating the actural task list item
const createNewTask = (task) => {
  if (newTask.value.length > 0) {
    let listItem = document.createElement("li");
    let label = document.createElement("label");
    label.innerText = task;
    label.className = "background-color"
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete";
    let doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";
    doneBtn.className = "done";
    listItem.appendChild(label)
    listItem.appendChild(deleteBtn);
    listItem.appendChild(doneBtn);
    return listItem;
  }
};

//ADD THE NEW TASK INTO ACTUAL INCOMPLETE LIST
const addTask = () => {
  let listItem = createNewTask(newTask.value);
  //PUSH UNIQUE VALUE TO TASK MEMORY
  if (getTaskMemory().indexOf(newTask.value) === -1) {
    addTaskMemory(newTask.value);
  }
  toDoUl.insertBefore(listItem, toDoUl.childNodes[0])
  newTask.value = "";
  bindIncompleteItems(listItem, doneTask);
};

const input = document.getElementById("new-task");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("addTask").click();
  }
});

const doneTask = function () {
  console.log("Move Task to complete");
  //GRAB THE CHECKBOX'S PARENT ELEMENT, THE LI IT'S IN
  let listItem = this.parentNode;
  console.log(listItem)
  //CREATE AND INSERT THE DONE BUTTON
  let undoBtn = document.createElement("button"); // <button>
  undoBtn.innerText = "Undo";
  undoBtn.className = "undo";
  listItem.appendChild(undoBtn);
  let doneBtn = listItem.querySelector("button.done");
  doneBtn.remove();
  let deleteBtn = listItem.querySelector("button.delete");
  deleteBtn.className = "delete2";
  //PLACE IT INSIDE THE COMPLETED LIST
  completeUl.appendChild(listItem);
  bindCompleteItems(listItem, undoTask);
};

const undoTask = function () {
  console.log("Move Task to incomplete");
  //GRAB THE CHECKBOX'S PARENT ELEMENT, THE LI IT'S IN
  let listItem = this.parentNode;
  //CREATE AND INSERT THE DONE BUTTON
  let doneBtn = document.createElement("button"); // <button>
  doneBtn.innerText = "Done";
  doneBtn.className = "done";
  listItem.appendChild(doneBtn);
  let undoBtn = listItem.querySelector("button.undo");
  undoBtn.remove();
  let deleteBtn = listItem.querySelector("button.delete2");
  deleteBtn.className = "delete";
  //PLACE IT INSIDE THE COMPLETED LIST
  toDoUl.appendChild(listItem);
  bindIncompleteItems(listItem, doneTask);
};

//DELETE TASK FUNCTIONS
const deleteTask = function () {
  console.log("Deleting task...");
  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
};

//BINDING EACH OF THE ELEMENTS THE INCOMPLETE&COMPLETE TASK LIST
const bindIncompleteItems = function (taskItem, doneTask) {
  console.log("Binding the incomplete list...");
  //BIND DONE & DELETE BUTTON
  let doneBtn = taskItem.querySelector("button.done");
  let deleteBtn = taskItem.querySelector("button.delete");
  doneBtn.onclick = doneTask;
  deleteBtn.onclick = deleteTask;
};
const bindCompleteItems = function (taskItem, undoTask) {
  console.log("Binding the complete list...");
  //BIND UNDO & DELETE BUTTON
  let undoBtn = taskItem.querySelector("button.undo");
  let deleteBtn = taskItem.querySelector("button.delete2");
  undoBtn.onclick = undoTask;
  deleteBtn.onclick = deleteTask;
};

for (let i = 0; i < toDoUl.children.length; i++) {
  bindIncompleteItems(toDoUl.children[i], doneTask);
}
for (let i = 0; i < completeUl.children.length; i++) {
  bindCompleteItems(completeUl.children[i], undoTask);
}

addTaskBtn.addEventListener("click", addTask);