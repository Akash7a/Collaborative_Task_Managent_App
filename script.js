const body = document.body;
const form = document.querySelector("form");
const titleInput = document.querySelector(".title");
const descInput = document.querySelector(".description");
const dateInput = document.querySelector(".date");
const categoryInput = document.querySelector(".category");
const priorityInput = document.querySelector(".taskPriority");
const statusInput = document.querySelector(".taskStatus");

const allTasks = localStorage.getItem("allTasks") ? JSON.parse(localStorage.getItem("allTasks")) : [];
const allTasksContainer = document.createElement("div");
allTasksContainer.classList.add("allTasksContainer");
body.appendChild(allTasksContainer);

let isEditMode = false;
let editIndex = false;

const createTask = () => {
    allTasksContainer.innerHTML = '';

    allTasks.forEach((task, index) => {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task_container");

        const titleElem = document.createElement("h2");
        titleElem.classList.add("title_elme");
        titleElem.textContent = task.title;

        const descElem = document.createElement("p");
        descElem.classList.add("desc_elem");
        descElem.textContent = task.description;
        if (task.status === "Completed") {
            titleElem.classList.add("completed");
            descElem.classList.add("descCompleted");
        }

        const dateElem = document.createElement("p");
        dateElem.classList.add("date_elem");
        dateElem.textContent = task.date;

        const categoryElem = document.createElement("p");
        categoryElem.classList.add("category_elem");
        categoryElem.textContent = task.category;

        const priorityElem = document.createElement("p");
        priorityElem.classList.add("priority_elem");
        priorityElem.textContent = task.priority;

        const statusElem = document.createElement("p");
        statusElem.classList.add("status_elem");
        statusElem.textContent = task.status;

        const ctrl_btns = document.createElement("div");
        ctrl_btns.classList.add("ctrl_btns");

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete_btn", "ctrl");
        deleteBtn.textContent = "🗑️";
        deleteBtn.addEventListener("click", () => deletTask(index));

        const toggleBtn = document.createElement("button");
        toggleBtn.classList.add("toggle_btn", "ctrl");
        toggleBtn.textContent = "✅";
        toggleBtn.addEventListener("click", () => toggleTask(index));

        const updateBtn = document.createElement("button");
        updateBtn.classList.add("update_btn", "ctrl");
        updateBtn.textContent = "📝";
        if (task.status === "Not Started") {
            updateBtn.addEventListener("click", () => updateTask(index));
        }

        ctrl_btns.appendChild(deleteBtn);
        ctrl_btns.appendChild(toggleBtn);
        ctrl_btns.appendChild(updateBtn);
        taskContainer.appendChild(ctrl_btns);
        taskContainer.appendChild(statusElem);
        taskContainer.appendChild(priorityElem);
        taskContainer.appendChild(categoryElem);
        taskContainer.appendChild(dateElem);
        taskContainer.appendChild(titleElem);
        taskContainer.appendChild(descElem);

        allTasksContainer.appendChild(taskContainer);
    });
}
const deletTask = (index) => {
    allTasks.splice(index, 1);
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    createTask();
}

const toggleTask = (index) => {
    allTasks[index].status = allTasks[index].status === "Not Started" ? "Completed" : "Not Started";

    localStorage.setItem("allTasks", JSON.stringify(allTasks));

    createTask();
}

const updateTask = (index) => {
    const task = allTasks[index];
    titleInput.value = task.title;
    descInput.value = task.description;
    dateInput.value = task.date;
    categoryInput.value = task.category;
    priorityInput.value = task.priority;
    statusInput.value = task.status;

    isEditMode = true;
    editIndex = index;

    form.scrollIntoView({ behavior: "smooth" });
}
class Task {
    constructor(title, description, date, category, priority, status) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.status = status;
        this.priority = priority;
        this.category = category;
    }

    addTasks() {
        allTasks.push(this);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value;
    const description = descInput.value;
    const date = dateInput.value;
    const category = categoryInput.value;
    const priority = priorityInput.value;
    const status = statusInput.value;

    if (isEditMode) {

        allTasks[editIndex] = { title, description, date, category, priority, status }

        isEditMode = false;
        editIndex = null;
    } else {

        const newTask = new Task(title, description, date, category, priority, status);
        newTask.addTasks();
    }

    form.reset();

    localStorage.setItem("allTasks", JSON.stringify(allTasks));
    createTask();
});

createTask(); 