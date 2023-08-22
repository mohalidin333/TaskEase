
// Variables for nav menu
const burger = document.getElementById('burger');
const sideBar = document.getElementById('sideBar');
const closeMenu = document.getElementById('closeMenu');
const activeMenu = document.querySelectorAll('.active-menu');

// Variable for dashboard
const dashboardMenu = document.getElementById('dashboard');

// Variables for add task (box)
const newTask = document.getElementById('newTask');
const container = document.getElementById('container');
const addTaskBox = document.getElementById('addTaskBox');
const taskClose = document.getElementById('taskClose');
const color1 = document.querySelector('.color1');
const color2 = document.querySelector('.color2');
const color3 = document.querySelector('.color3');
const inputId = document.getElementById('inputId');
const inputTitle = document.getElementById('inputTitle');
const selectCategory = document.getElementById('selectCategory');
const inputDate = document.getElementById('inputDate');
const textDescription = document.getElementById('textDescription');
const btnAdd = document.getElementById('btnAdd');
const btnUpdate = document.getElementById('btnUpdate');
const btnCancel = document.getElementById('btnCancel');

// Variables for content header
const totalTask = document.getElementById('totalTask');
const displayCategory = document.getElementById('displayCategory');

// Variable for content displayer
const contentDisplayer = document.getElementById('contentDisplayer');

// Varibles for add category (box)
const addCategory = document.getElementById('addCategory');
const addCategoryBox = document.getElementById('addCategoryBox');
const catClose = document.getElementById('catClose');
const inputSaveCategory = document.getElementById('inputSaveCategory');
const btnSaveCategory = document.getElementById('btnSaveCategory');

// Variables for view task (box)
const viewTaskBox = document.querySelector('.view-task-box');
const viewClose = document.getElementById('viewClose');
const detailTask = document.getElementById('detailTask');
const detailDeadline = document.getElementById('detailDeadline');
const detailBelongTo = document.getElementById('detailBelongTo');
const detailWhatToDo = document.getElementById('detailWhatToDo');

// Function for viewing task
function vewTask(id) {
    container.classList.add('active');
    viewTaskBox.classList.add('active');
    
    const obj = task.find(i => i.id === id);

    detailTask.textContent = obj.title;
    detailDeadline.textContent = obj.date;
    detailBelongTo.textContent = obj.cat;
    detailWhatToDo.textContent = obj.task;
}

// Close View Task Box
viewClose.addEventListener('click', () => {
    container.classList.remove('active');
    viewTaskBox.classList.remove('active');
});

// Open Add Category Box
addCategory.addEventListener('click', () => {
    container.classList.add('active');
    addCategoryBox.classList.add('active');
    sideBar.classList.remove('active');
    closeMenu.style.display = 'none';
    burger.style.display = 'block';
});

// Close Add Category Box
catClose.addEventListener('click', () => {
    container.classList.remove('active');
    addCategoryBox.classList.remove('active');
    clear();
    activeMenu.forEach(menu => menu.classList.remove('active'));
});

let categories = JSON.parse(localStorage.getItem('categories')) || [];

categories.forEach(category => {

    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;

    const cloneOption = option.cloneNode(true);
    selectCategory.appendChild(option);
    displayCategory.appendChild(cloneOption);
});

// Function for saving new category
function saveCategory() {

    const inputSaveCategoryValue = inputSaveCategory.value.trim();
    if (inputSaveCategoryValue) {

        let isDuplicate = false;

        selectCategory.childNodes.forEach(node => {

            if (node.nodeName === 'OPTION' && node.value === inputSaveCategoryValue) {

                isDuplicate = true;
                alert('You already have that category saved.');
            }
        });

        if(!isDuplicate) {

            categories.push(inputSaveCategoryValue);
            localStorage.setItem('categories', JSON.stringify(categories));
            
            const option = document.createElement('option');
            option.value = inputSaveCategoryValue;
            option.textContent = inputSaveCategoryValue;

            const cloneOption = option.cloneNode(true);
            selectCategory.appendChild(option);
            displayCategory.appendChild(cloneOption);

            alert('Category saved successfully!');

            inputSaveCategory.value = '';
            activeMenu.forEach(menu => menu.classList.remove('active'));

            container.classList.remove('active');
            addCategoryBox.classList.remove('active');
        }
    } else {

        alert('Please fill the field before saving.');
    }

}

// Button save category event for saving new/task
btnSaveCategory.addEventListener('click', saveCategory);

// Function for dashboard
function dashboard() {

    displayCategory.value = task[0].cat;
    displayTasks();
    sideBar.classList.remove('active');
    closeMenu.style.display = 'none';
    burger.style.display = 'block';
}

// Dashboard
dashboardMenu.addEventListener('click', dashboard);

// Open Add Task Box
newTask.addEventListener('click', () => {
    btnAdd.style.display = 'block';
    btnUpdate.style.display = 'none';
    container.classList.add('active');
    addTaskBox.classList.add('active');
    sideBar.classList.remove('active');
    closeMenu.style.display = 'none';
    burger.style.display = 'block';
});

// Close Add Task Box
taskClose.addEventListener('click', () => {
    container.classList.remove('active');
    addTaskBox.classList.remove('active');
    clear();
    activeMenu.forEach(menu => menu.classList.remove('active'));
});

let getTotalTask = JSON.parse(localStorage.getItem('getTotalTask')) || 0;

// Function for saving total task
function saveTotalTask() {

    getTotalTask++;
    localStorage.setItem('getTotalTask', JSON.stringify(getTotalTask));
    totalTask.textContent = getTotalTask;
}

// Dynamically change the category and display tasks

selectCategory.addEventListener('change', () => {
    displayCategory.value = selectCategory.value;
    displayTasks();
});

displayCategory.addEventListener('change', () => displayTasks());

// Window event for displaying total & default task every page loaded
window.addEventListener('load', () => {

    localStorage.setItem('getTotalTask', JSON.stringify(getTotalTask));
    totalTask.textContent = getTotalTask;

    dashboard();
});

// Function for displaying tasks
function displayTasks() {

    contentDisplayer.innerHTML = '';
    task.forEach(taskObj => {

        if (displayCategory.value === taskObj.cat) {

            const taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
            taskCard.style.background = taskObj.color || '#c8c8c8';
            taskCard.style.borderLeft = taskObj.border || '3px solid #000';

            const element = `
                <div class="div1">
                    <p class="title"><span>TASK:</span>${taskObj.title}</p>
                    <p class="task-des"><span>WHAT TO DO:</span>${taskObj.task}</p>
                    <div class="div2">
                        <p><span>BELONG TO:</span>${taskObj.cat}</p>
                        <p><span>DEADLINE:</span>${taskObj.date}</p>
                    </div>
                    <a class="view-task" onClick="vewTask(${taskObj.id})"><i class="fa-solid fa-eye"></i></a>
                    <a class="edit" onClick="edit(${taskObj.id})"><i class="fa-solid fa-pen"></i></a>
                    <a class="delete" onClick="deleteTask(${taskObj.id})"><i class="fa-solid fa-trash"></i></a>
                </div>
            `;
            taskCard.innerHTML = element;
            contentDisplayer.appendChild(taskCard);
        }
    });

}

// Add Task
let task = JSON.parse(localStorage.getItem('task')) || [];
let colors = '';
let borders = '';

color1.addEventListener('click', () => {
    colors = '#fab4b4';
    borders = '3px solid red';
});
color2.addEventListener('click', () => {
    colors = '#b4fab4';
    borders = '3px solid green';
});
color3.addEventListener('click', () => {
    colors = '#b4b4fa';
    borders = '3px solid blue';
});

// Function for adding new task
function addTask() {

    let inputIdCounter = task.length > 0 ? task[task.length - 1].id + 1 : 1;

    const inputTitleValue = inputTitle.value;
    const selectCategoryValue = selectCategory.value;
    const inputDateValue = inputDate.value;
    const textDescriptionValue = textDescription.value || 'Empty';

    const taskObj = {
        id: inputIdCounter,
        title: inputTitleValue,
        cat: selectCategoryValue,
        date: inputDateValue,
        task: textDescriptionValue,
        color: colors,
        border: borders
    };

    if (inputTitleValue && selectCategoryValue && inputDateValue) {

        task.push(taskObj);
        saveTasksToLocalStorage();

        displayTasks();
        saveTotalTask();

        colors = '';
        borders = '';
        alert('New task added successfully!');

        clear();
        activeMenu.forEach(menu => menu.classList.remove('active'));
    
        container.classList.remove('active');
        addTaskBox.classList.remove('active');
    } else {

        alert('Please complete all required fields.');
    }

}

// Function for saving tasks to localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('task', JSON.stringify(task));
}

// Button add event for creating and saving new/task
btnAdd.addEventListener('click', () => {
    addTask();
    saveTasksToLocalStorage();
});

// Function for editing task
function edit(id) {
    
    container.classList.add('active');
    addTaskBox.classList.add('active');
    btnAdd.style.display = 'none';
    btnUpdate.style.display = 'block';
    
    const obj = task.find(i => i.id === id);

    inputId.value = obj.id;
    inputTitle.value = obj.title;
    selectCategory.value = obj.cat;
    inputDate.value = obj.date;
    textDescription.value = obj.task;

    updateClose.style.display = 'block';
    addClose.style.display = 'none';
}

// Function for updating task
function updateTask() {

    const inputIdValue = parseInt(inputId.value);
    const titleValue = inputTitle.value;
    const selectCategoryValue = selectCategory.value;
    const inputDateValue = inputDate.value;
    const textDescriptionValue = textDescription.value;

    const index = task.findIndex(i => i.id === inputIdValue);
    task[index].id = inputIdValue;
    task[index].title = titleValue;
    task[index].cat = selectCategoryValue;
    task[index].date = inputDateValue;
    task[index].task = textDescriptionValue;
    task[index].color = colors;
    task[index].border = borders;

    saveTasksToLocalStorage();
    displayTasks();

    container.classList.remove('active');
    addTaskBox.classList.remove('active');

    clear();
    updateClose.style.display = 'none';
    addClose.style.display = 'block';
}

// Update Task
btnUpdate.addEventListener('click', updateTask);

// Function for deleting task
function deleteTask(id) {

    const index = task.findIndex(i => i.id === id);
    task.splice(index, 1);
    saveTasksToLocalStorage();
    displayTasks();

    getTotalTask--;
    localStorage.setItem('getTotalTask', JSON.stringify(getTotalTask));
    totalTask.textContent = getTotalTask;
}

// Cancel add task
btnCancel.addEventListener('click', () => {
    container.classList.remove('active');
    addTaskBox.classList.remove('active');
    clear();
    activeMenu.forEach(menu => menu.classList.remove('active'));
});

// Window click event for closing box
window.addEventListener('click', e => {

    if (e.target === container) {
        container.classList.remove('active');
        addTaskBox.classList.remove('active');
        addCategoryBox.classList.remove('active')
        activeMenu.forEach(menu => menu.classList.remove('active'));
        viewTaskBox.classList.remove('active');
    }
});

// Open Menu
burger.addEventListener('click', () => {
    sideBar.classList.add('active');
    burger.style.display = 'none';
    closeMenu.style.display = 'block';
});

// Close Menu
closeMenu.addEventListener('click', () => {
    sideBar.classList.remove('active');
    closeMenu.style.display = 'none';
    burger.style.display = 'block';
});

// Active Menu
activeMenu.forEach(menu1 => {
    menu1.addEventListener('click', () => {
        activeMenu.forEach(menu2 => menu2.classList.remove('active'));
        menu1.classList.add('active');
    });
});

// Function for clearing fields
function clear() {

    inputTitle.value = '';
    selectCategory.value = '';
    inputDate.value = '';
    textDescription.value = '';
    colors = '';
    borders = '';
}