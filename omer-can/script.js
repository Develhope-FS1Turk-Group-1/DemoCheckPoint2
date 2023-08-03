const nameInput = document.getElementById("name");
const addBtn = document.getElementById("addBtn");
const filteredTextInput = document.getElementById("filtered");
const deleteBtn = document.getElementById("deleteBtn");
const updateBtn = document.getElementById("updateBtn");
const tasks = document.getElementById("tasks");
const ol = document.createElement("ol");
let localStorageArea = JSON.parse(localStorage.getItem("allUsers")) || [];

let taskArray = [];
tasks.append(ol);

const updateFilteredTaskArray = () => {
  if (nameInput.value != "") {
    const otherValue = filteredTextInput.value;
    const otherValue1 = nameInput.value;
    taskArray.map((task) => {
      if (task.display == "block") {
        let chancedName = task.name.replaceAll(otherValue, otherValue1);
        task.name = chancedName;
      }
    });
    updateProcess();
    filteredTextInput.value = "";
  }
};
const filteredText = () => {
  let newText = filteredTextInput.value;
  taskArray.map((task) => {
    if (!task.name.includes(newText)) {
      task.display = "none";
    } else if (task.name.includes(newText)) {
      task.display = "block";
    }
  });
  updateProcess();
  saveToLocalStorage();
};

const clearInput = () => {
  nameInput.value = "";
};

const updateProcess = () => {
  ol.innerHTML = "";
  taskArray.map((task) => {
    const li = document.createElement("li");
    li.innerText = task.name;
    li.style.display = task.display;
    ol.appendChild(li);
    clearInput();
  });
};

const addTask = () => {
  if (nameInput.value === "") {
    alert("Please enter name");
  } else {
    taskArray = [
      ...taskArray,
      { name: nameInput.value, id: taskArray.length, display: "block" },
    ];
    updateProcess();
    saveToLocalStorage();
  }
};

const deleteTask = () => {
  if (filteredTextInput.value != "") {
    taskArray = taskArray.filter((task) => task.display == "none");
    for (let i = 0; i < taskArray.length; i++) {
      taskArray[i].display = "block";
    }
  }
  filteredTextInput.value = "";
  updateProcess();
  saveToLocalStorage();
};

const saveToLocalStorage = () => {
  localStorage.setItem("allUsers", JSON.stringify(taskArray));
};

const LoadToLocalStorage = () => {
  taskArray = [...localStorageArea];
  localStorageArea.map((storageItem) => {
    const li = document.createElement("li");
    li.innerText = storageItem.name;
    ol.appendChild(li);
  });
};

LoadToLocalStorage();

addBtn.addEventListener("click", addTask);
deleteBtn.addEventListener("click", deleteTask);
filteredTextInput.addEventListener("input", filteredText);
updateBtn.addEventListener("click", updateFilteredTaskArray);
