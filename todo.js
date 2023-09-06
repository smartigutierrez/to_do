document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#save').onclick = function (event) {
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
                    <role="button" class="delete">Mark as done</role>
                </div>
            `;

            taskInput.value = "";

            var currentTasks = document.querySelectorAll(".delete");
            for (var i = 0; i < currentTasks.length; i++) {
                currentTasks[i].onclick = function () {
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

    function darkmode() {
        // Implement dark mode functionality here
    }

    class Timer {
        constructor(root) {
          root.innerHTML = Timer.getHTML();
      
          this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__part--minutes")
          };
      
          this.interval = null;
          this.remainingSeconds = 0;
      
          this.el.control.addEventListener("click", () => {
            if (this.interval === null) {
              this.start();
            } else {
              this.stop();
            }
          });
      
          this.el.reset.addEventListener("click", () => {
            const inputMinutes = prompt("Number of minutes:");
      
            if (inputMinutes < 60) {
              this.stop();
              this.remainingSeconds = inputMinutes * 60;
              this.updateInterfaceTime();
            }
          });
        }
      
        updateInterfaceTime() {
          const minutes = Math.floor(this.remainingSeconds / 60);
          const seconds = this.remainingSeconds % 60;
      
          this.el.minutes.textContent = minutes.toString().padStart(2, "0");
          this.el.seconds.textContent = seconds.toString().padStart(2, "0");
        }
      
        updateInterfaceControls() {
          if (this.interval === null) {
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
          } else {
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
          }
        }
      
        start() {
          if (this.remainingSeconds === 0) return;
      
          this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();
      
            if (this.remainingSeconds === 0) {
              this.stop();
            }
          }, 1000);
      
          this.updateInterfaceControls();
        }
      
        stop() {
          clearInterval(this.interval);
      
          this.interval = null;
      
          this.updateInterfaceControls();
        }
      
        static getHTML() {
          return `
                  <span class="timer__part timer__part--minutes">00</span>
                  <span class="timer__part">:</span>
                  <span class="timer__part timer__part--seconds">00</span>
                  <button class="timer__btn timer__btn--control timer__btn--start">
                      <span class="material-icons">play_arrow</span>
                  </button>
              `;
        }
      }
      
      new Timer(
          document.querySelector(".timer")
      );
});
