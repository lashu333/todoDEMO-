const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask(){
    const task = inputBox.value.trim();
    if(!task){
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
      </label>
      <div class="btns">
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
      </div>
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
            updateCounters();
        
        }
    });
                    editButton.addEventListener("click", function () {
                            const update = prompt("Edit task:", taskSpan.textContent);
                            if (update !== null) {
                                taskSpan.textContent = update;
                                tasklist.classList.remove("completed");
                                checkbox.checked = false;
                                updateCounters();
                            }
                        });
                    delButton.addEventListener("click", function () {
                            const deleteTask = tasklist.remove();
                            updateCounters();
                    });

                    updateCounters();
            }

            const completedCounter = document.getElementById("completed-counter");
            const uncompletedCounter = document.getElementById("uncompleted-counter");
            const totalCounter = document.getElementById("total-counter");
            const progress= document.getElementById("progress");
function updateCounters() {
    const totalTasks = document.querySelectorAll("li").length;
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks =
      document.querySelectorAll("li:not(.completed)").length;
    progress.textContent = (completedTasks / totalTasks) * 100;
    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
    totalCounter.textContent = totalTasks;
  }
  