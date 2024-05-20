const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");
const totalCounter = document.getElementById("total-counter");
const progress = document.getElementById("progress");
const checkSound = document.getElementById('checkSound');
const deteleSound = document.getElementById('deleteSound');
const listItems = document.querySelectorAll('#list-container li');
const clearAll = document.getElementById('clear-all');
const clearCompleted = document.getElementById('clear-completed');
const checkAll = document.getElementById('check-all');

checkAll.addEventListener('click', function() {
    const tasks = document.querySelectorAll("li");
    tasks.forEach((task) => {
        task.classList.add("completed");
        const checkbox = task.querySelector('input');
        checkbox.checked = true;
        const gotCompleted = task.querySelector('.got-completed');
        const gotCompletedDATE = new Date();
        const completedTime = gotCompletedDATE.toLocaleTimeString();
        gotCompleted.innerHTML = `completed : ${completedTime}`;
        const taskCreatedTime = task.querySelector('.task-createdTime');
       if (gotCompleted !== null) {
            taskCreatedTime.textContent = ``;
        }
    });
    updateCounters();
});

clearCompleted.addEventListener('click', function() {
    const completedTasks = document.querySelectorAll(".completed");
    completedTasks.forEach((task) => {
        task.remove();
    });
    updateCounters();
});

updateCounters();
clearAll.addEventListener('click', function() {
   
    const taskContainer = document.getElementById('list-container');
    taskContainer.innerHTML = '';
    updateCounters();

});
listItems.forEach((item) => {
  item.addEventListener('touchstart', () => {
    item.classList.add('touched');
  });

  item.addEventListener('touchend', () => {
    item.classList.remove('touched');
  });
});
function updateCounters() {
    const totalTasks = document.querySelectorAll("li").length;
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;
    progress.textContent = (completedTasks / totalTasks) * 100;
    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
    totalCounter.textContent = totalTasks;

    if (totalTasks > 1) {
        clearAll.style.display = 'block';
        checkAll.style.display = 'block';
        clearCompleted.style.display = 'block';
    } else {
        clearAll.style.display = 'none';
        checkAll.style.display = 'none';
        clearCompleted.style.display = 'none';
    }
}

function addTask() {
    const task = inputBox.value.trim();
    const taskDate = new Date();
    const taskTime = taskDate.toLocaleTimeString();

    if (!task) {
        alert('Task cannot be empty');
        return;
    }

    const tasklist = document.createElement('li');
    listContainer.appendChild(tasklist);
    tasklist.innerHTML = `
    <div class="checkbox-wrapper-53">
        <label class="container">
            <input type="checkbox">
            <div class="checkmark"></div>
        </label>
    </div>
    <span class="task-Text">${task}</span>
    <div class="task-time">
        <span class="task-createdTime">${taskTime}</span>
        <span class="got-completed"></span>
    </div>
    <div class="btns">
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
    </div>
    `;
    inputBox.value = '';

    const checkbox = tasklist.querySelector('input');
    const delButton = tasklist.querySelector('.delete-btn');
    const editButton = tasklist.querySelector('.edit-btn');
    const taskSpan = tasklist.querySelector('span');

    listContainer.addEventListener('change', function(e) {
        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            const tasklist = e.target.closest('li');
            tasklist.classList.toggle("completed", e.target.checked);
            const gotCompleted = tasklist.querySelector('.got-completed');
            const gotCompletedDATE = new Date();
            const completedTime = gotCompletedDATE.toLocaleTimeString();
            const taskCreatedTime = tasklist.querySelector('.task-createdTime');

            if (gotCompleted !== null) {
                gotCompleted.textContent = `completed time: ${completedTime}`;
            }

            if (e.target.checked && taskCreatedTime !== null) {
                checkSound.currentTime = 0;
                checkSound.play();
                taskCreatedTime.textContent = '';
            } else {
                gotCompleted.textContent = '';
                const updatedCreationTime = tasklist.getAttribute('data-created');
                taskCreatedTime.textContent = updatedCreationTime;
            }
            if (!e.target.checked) {
                taskCreatedTime.textContent = taskTime;
                updateCounters();
            }

            updateCounters();
        }
    });

    editButton.addEventListener("click", function() {
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null) {
            taskSpan.textContent = update;
            tasklist.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();

            const newTaskTime = new Date().toLocaleTimeString();
            tasklist.setAttribute('data-created', newTaskTime);
            const taskCreatedTime = tasklist.querySelector('.task-createdTime');
            taskCreatedTime.textContent = newTaskTime;

            const gotCompleted = tasklist.querySelector('.got-completed');
            gotCompleted.textContent = '';
        }
    });

    delButton.addEventListener("click", function() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.indexOf(task);
        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));    
        tasklist.remove();
        deteleSound.currentTime = 0;
        deteleSound.play();
        updateCounters();
    });

    updateCounters();


}
