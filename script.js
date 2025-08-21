    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const deleteAllBtn = document.getElementById("deleteAllBtn");

    const gradients = [
      "linear-gradient(135deg,#ff9a9e,#fad0c4)",
      "linear-gradient(135deg,#a18cd1,#fbc2eb)",
      "linear-gradient(135deg,#f6d365,#fda085)",
      "linear-gradient(135deg,#84fab0,#8fd3f4)",
      "linear-gradient(135deg,#fccb90,#d57eeB)",
      "linear-gradient(135deg,#e0c3fc,#8ec5fc)"
    ];

    window.onload = function() {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach((task, index) => addTaskToDOM(task, index));
      toggleDeleteAllBtn();
    };

    function addTask() {
      const task = taskInput.value.trim();
      if(task === "") return;
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      addTaskToDOM(task, tasks.length - 1);
      taskInput.value = "";
      toggleDeleteAllBtn();
    }

    function addTaskToDOM(task, index) {
      let li = document.createElement("li");
      li.style.background = gradients[index % gradients.length];
      li.innerHTML = `
        <span class="task-text">${task}</span>
        <div class="actions">
          <span class="edit" onclick="editTask(this)">✎</span>
          <span class="delete" onclick="deleteTask(this)">✖</span>
        </div>`;
      taskList.appendChild(li);
    }

    function deleteTask(element) {
      let task = element.parentElement.parentElement.querySelector(".task-text").textContent;
      element.parentElement.parentElement.remove();
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter(t => t !== task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      toggleDeleteAllBtn();
    }

    function deleteAllTasks() {
      taskList.innerHTML = "";
      localStorage.removeItem("tasks");
      toggleDeleteAllBtn();
    }

    function editTask(element) {
      let li = element.parentElement.parentElement;
      let taskText = li.querySelector(".task-text");
      let currentTask = taskText.textContent;
      let input = document.createElement("input");
      input.type = "text";
      input.value = currentTask;
      input.className = "edit-input";
      let okButton = document.createElement("button");
      okButton.textContent = "OK";
      okButton.className = "ok-btn";
      okButton.onclick = function() {
        saveEdit(li, input, okButton);
      };
      li.replaceChild(input, taskText);
      li.querySelector(".actions").prepend(okButton);
      input.focus();
    }

    function saveEdit(li, input, okButton) {
      let newTask = input.value.trim();
      if(newTask === "") newTask = "Untitled Task";
      let span = document.createElement("span");
      span.className = "task-text";
      span.textContent = newTask;
      li.replaceChild(span, input);
      okButton.remove();
      let tasks = Array.from(document.querySelectorAll(".task-text")).map(t => t.textContent);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function toggleDeleteAllBtn() {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      if(tasks.length > 1) {
        deleteAllBtn.style.display = "block";
      } else {
        deleteAllBtn.style.display = "none";
      }
    }

