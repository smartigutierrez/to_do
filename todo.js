document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#save').onclick = function(event) {
        event.preventDefault();

        const taskInput = document.querySelector('#newtask input');
        const taskValue = taskInput.value.trim();

        if (taskValue.length === 0) {
            alert("Enter a task.");
        } else {
            const taskContainer = document.querySelector('#tasks');
            taskContainer.innerHTML += `
                <div class="task">
                    <span class="taskname">${taskValue}</span>
                    <button class="delete"><i class="far fa-trash-alt"></i></button>
                </div>
            `;

            taskInput.value = ""; // Clear the input field

            var currentTasks = document.querySelectorAll(".delete");
            for (var i = 0; i < currentTasks.length; i++) {
                currentTasks[i].onclick = function() {
                    const task = this.parentNode.querySelector(".taskname").textContent;
                    this.parentNode.remove();
                    moveToCompleted(task);
                };
            }
        }
    };

    function moveToCompleted(task) {
        const completedTasksContainer = document.querySelector('#completedtasks');
        completedTasksContainer.innerHTML += `
            <div class="task">
                <span class="del">${task}</span>
            </div>
        `;
    }
});
