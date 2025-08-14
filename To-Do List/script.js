const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText == "") {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement("li");
  li.textContent = taskText;

  // Toggle complete
  li.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    taskList.removeChild(li);
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
  taskInput.value = "";
}
