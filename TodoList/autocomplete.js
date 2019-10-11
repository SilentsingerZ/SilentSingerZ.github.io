// AUTO COMPLETE

// let taskmemory = [234,2,3423];
// let autoComplete = (value) => {

//   document.getElementById('datalist').innerHTML = '';
//   l = value.length;
//   for (let i = 0; i < taskmemory.length; i++) {
//     if (((taskmemory[i].toLowerCase()).indexOf(value.toLowerCase())) > -1) {
//       const node = document.createElement("option");
//       const val = document.createTextNode(taskmemory[i]);
//       node.appendChild(val);
//       document.getElementById("datalist").appendChild(node);
//       // console.log(taskmemory)
//     }
//   }
// }

export default function createAutoComplete() {
  let taskmemory = [];

  function autoComplete(value) {
    document.getElementById('datalist').innerHTML = '';
    let l = value.length;
    for (let i = 0; i < taskmemory.length; i++) {
      if (((taskmemory[i].toLowerCase()).indexOf(value.toLowerCase())) > -1) {
        const node = document.createElement("option");
        const val = document.createTextNode(taskmemory[i]);
        node.appendChild(val);
        document.getElementById("datalist").appendChild(node);
        // console.log(taskmemory)
      }
    }
  }

  function getTaskMemory() {
    return taskmemory;
  }

  function addTaskMemory(val) {
    taskmemory.push(val);
  }

  return {
    autoComplete, getTaskMemory, addTaskMemory
  }
}

// let autoComplete = createAutoComplete();