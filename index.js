// Load user credentials and info from local storage
let userCreds = JSON.parse(localStorage.getItem("user-creds"));
let userInfo = JSON.parse(localStorage.getItem("user-info"));

// Function to sign out user
function signout() {
  localStorage.removeItem("user-creds");
  localStorage.removeItem("user-info");
  window.location.href = "signin.html";
}

// Function to check user credentials and update UI
function checkCredentials() {
  if (!localStorage.getItem("user-creds")) {
    window.location.href = "signin.html";
  } else {
    document.getElementById("welcomeMessage").textContent = `You are currently logged in as user: ${userInfo.firstname}`;
    document.getElementById("userName").textContent = userInfo.firstname;
  }
}

// Event listener when the page loads
window.addEventListener('load', checkCredentials);

// Event listener for sign-out link
document.getElementById('signoutLink').addEventListener('click', signout);

// Function to save tasks for the current user
function saveTasks(tasks) {
  const key = `tasks_${userCreds.email}`;
  localStorage.setItem(key, JSON.stringify(tasks));
}

// Function to load tasks for the current user
function loadTasks() {
  const key = `tasks_${userCreds.email}`;
  const tasks = localStorage.getItem(key);
  return tasks ? JSON.parse(tasks) : [];
}

// Function to display tasks in the UI
function displayTasks() {
  const tasks = loadTasks().filter(task => !task.deleted); // Filter out deleted tasks
  const ul = document.getElementById("myUL");
  ul.innerHTML = ""; // Clear existing tasks
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add('checked');
    }
    ul.appendChild(li);
    addCloseButton(li); // Add close button for each task
  });
}

// Function to add a new task
function newElement() {
  const inputValue = document.getElementById("myInput").value;
  if (inputValue.trim() === '') {
    alert("Please enter a task!");
    return;
  }
  const tasks = loadTasks();
  tasks.push({ text: inputValue, completed: false, deleted: false }); // Ensure new tasks are not marked as deleted
  saveTasks(tasks);
  displayTasks(); // Display only non-deleted tasks
  document.getElementById("myInput").value = "";
}

// Function to add a "close" button to a task item
function addCloseButton(li) {
  const span = document.createElement("SPAN");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  span.onclick = function() {
    const taskText = this.parentElement.textContent.replace('\u00D7', '').trim();
    removeTask(taskText);
    this.parentElement.remove();
  };
}

// Function to remove a task
function removeTask(taskText) {
  let tasks = loadTasks();
  tasks = tasks.map(task => {
    if (task.text === taskText) {
      return { ...task, deleted: true }; // Mark task as deleted
    } else {
      return task;
    }
  });
  saveTasks(tasks);
  displayTasks(); // Refresh task display to exclude deleted tasks
}

// Event listener for clicking on a task item (toggle completion)
document.getElementById("myUL").addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    const tasks = loadTasks();
    const taskText = ev.target.textContent.replace('\u00D7', '').trim();
    tasks.forEach(task => {
      if (task.text === taskText) {
        task.completed = !task.completed;
      }
    });
    saveTasks(tasks);
  }
});

// Initial display of tasks when the page loads
window.addEventListener('load', displayTasks);