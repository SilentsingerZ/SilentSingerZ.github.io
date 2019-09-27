// Timer Infos
let myDate = new Date();
let days = ("0" + myDate.getDate()).slice(-2)
let hrs = myDate.getHours();
let mins = ("0" + myDate.getMinutes()).slice(-2)
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
"Friday", "Saturday"];
let wds = weekdays[myDate.getDay()];
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
let months = monthNames[myDate.getMonth()];
let energypct = ((17.5 - hrs - mins/60)/0.08).toFixed(0) + '%'
switch (days % 10) {
  case 1:
    sufix = "st";
  case 2:
    sufix = "nd";
  case 3:
    sufix = "rd";
  default:
    sufix = "th";
}
document.getElementById('wds').innerHTML =wds;
document.getElementById('Date').innerHTML =months + ' ' + days+sufix;
document.getElementById('Time').innerHTML =hrs + ':' + mins;
document.getElementById('energypct').innerHTML =energypct;
// Greeting Infos
let greet;
if (hrs < 12)
  greet = 'Good Morning!';
else if (hrs >= 12 && hrs <= 17)
  greet = 'Good Afternoon!';
else if (hrs >= 17 && hrs <= 24)
  greet = 'Good Evening!';
document.getElementById('lblGreetings').innerHTML = greet;

//Todolist Functions
let newTask = document.querySelector('#new-task');
let addTaskBtn = document.querySelector('#addTask');
let toDoUl = document.querySelector("#incomplete-tasks");
let completeUl =  document.querySelector("#complete-tasks");
var taskmemory = [];

//Creating the actural task list item
var createNewTask = (task) => {
  if (newTask.value.length > 0) {
  var listItem=document.createElement("li");
  var label = document.createElement("label");
  label.innerText = task;
  label.className = "background-color"
  var deleteBtn = document.createElement("button");
  deleteBtn.innerText ="Delete";
  deleteBtn.className = "delete";
  var doneBtn = document.createElement("button");
  doneBtn.innerText ="Done";
  doneBtn.className = "done";
  listItem.appendChild(label)
  listItem.appendChild(deleteBtn);
  listItem.appendChild(doneBtn);
  return listItem;
}
};

//ADD THE NEW TASK INTO ACTUAL INCOMPLETE LIST
var addTask = () => {
  var listItem = createNewTask(newTask.value);
  //PUSH UNIQUE VALUE TO TASK MEMORY
  if(taskmemory.indexOf(newTask.value) === -1) {
    taskmemory.push(newTask.value);
  }
  toDoUl.appendChild(listItem);
  newTask.value="";
  bindIncompleteItems(listItem, doneTask);
};

var input = document.getElementById("new-task");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("addTask").click();
  }
});

var doneTask = function(){
  console.log("Move Task to complete");
  //GRAB THE CHECKBOX'S PARENT ELEMENT, THE LI IT'S IN
  var listItem = this.parentNode;
  //CREATE AND INSERT THE DONE BUTTON
  var undoBtn = document.createElement("button"); // <button>
  undoBtn.innerText = "Undo";
  undoBtn.className = "undo";
  listItem.appendChild(undoBtn);
  var doneBtn = listItem.querySelector("button.done");
  doneBtn.remove();
  //PLACE IT INSIDE THE COMPLETED LIST
  completeUl.appendChild(listItem);
  bindCompleteItems(listItem, undoTask);
};

var undoTask = function(){
  console.log("Move Task to incomplete");
  //GRAB THE CHECKBOX'S PARENT ELEMENT, THE LI IT'S IN
  var listItem = this.parentNode;
  //CREATE AND INSERT THE DONE BUTTON
  var doneBtn = document.createElement("button"); // <button>
  doneBtn.innerText ="Done";
  doneBtn.className = "done";
  listItem.appendChild(doneBtn);
  var undoBtn = listItem.querySelector("button.undo");
  undoBtn.remove();
  //PLACE IT INSIDE THE COMPLETED LIST
  toDoUl.appendChild(listItem);
  bindIncompleteItems(listItem, doneTask);
};

//DELETE TASK FUNCTIONS
var deleteTask = function(){
  console.log("Deleting task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

//BINDING EACH OF THE ELEMENTS THE INCOMPLETE&COMPLETE TASK LIST
var bindIncompleteItems = function(taskItem, doneTask){
  console.log("Binding the incomplete list...");
  //BIND DONE & DELETE BUTTON
  var doneBtn=taskItem.querySelector("button.done");
	var deleteBtn=taskItem.querySelector("button.delete");
  doneBtn.onclick=doneTask;
  deleteBtn.onclick=deleteTask;
};
var bindCompleteItems = function(taskItem, undoTask){
  console.log("Binding the complete list...");
  //BIND UNDO & DELETE BUTTON
  var undoBtn=taskItem.querySelector("button.undo");
	var deleteBtn=taskItem.querySelector("button.delete");
  undoBtn.onclick=undoTask;
  deleteBtn.onclick=deleteTask;
};

for(var i=0; i < toDoUl.children.length; i++) {
  bindIncompleteItems(toDoUl.children[i], doneTask);
}
for(var i=0; i < completeUl.children.length; i++) {
  bindCompleteItems(completeUl.children[i], undoTask);
}

addTaskBtn.addEventListener("click", addTask);

// AUTO COMPLETE
var autoComplete = (value) => {
  document.getElementById('datalist').innerHTML = '';
  l = value.length;
  for (let i=0; i<taskmemory.length; i++) {
    if(((taskmemory[i].toLowerCase()).indexOf(value.toLowerCase()))>-1) { 
      const node = document.createElement("option"); 
      const val = document.createTextNode(taskmemory[i]); 
      node.appendChild(val); 
      document.getElementById("datalist").appendChild(node); 
    } 
  }
}