
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const deletealltask = document.querySelectorAll(".collection li");
const clearBtn = document.querySelector(".clear-task");
const searchtask = document.querySelector("#search");
const cardaction=document.querySelector(".card-action");



loadEventListener(); //have to learn hoisting

// Load all event listeners

function loadEventListener() {

    //localstoragefunction for after loaded document

    document.addEventListener("DOMContentLoaded", gettasklist)

    // Add Task Event
    form.addEventListener("submit", addTask)

    //delete listitems
    taskList.addEventListener("click", removelist)

    //Clearalltask
    clearBtn.addEventListener("click", clearalltask)

    searchtask.addEventListener("keyup", searchlisttask)
}
function gettasklist() {

    let localtask;

    if (localStorage.getItem("task") == null) {
        localtask = [];

    }
    else {
        localtask = JSON.parse(localStorage.getItem("task"))
    }

    localtask.forEach(function (listtaks) {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(listtaks));
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="fa fa-remove"></i>`;
        li.appendChild(link);
        taskList.appendChild(li);
    })
    cardfunction();
}

function addTask(e) {

    e.preventDefault();

    if (taskInput.value.trim() === "") {
        alert("Please fill the form");
        return;
    }
    const duplicate = document.querySelectorAll(".collection-item")
    for (let tasklists of duplicate) {
        if (tasklists.innerText.trim().toLowerCase() === taskInput.value.trim().toLowerCase()) {
            alert("Already Exit");
            taskInput.value = "";
            return;
        }
    }

    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = `<i class="fa fa-remove"></i>`;
    li.appendChild(link);
    taskList.appendChild(li);
    localstoragefunction(taskInput.value)
    function localstoragefunction(listtaskitem) {
        let localtask;
        if (localStorage.getItem("task") == null) {
            localtask = [];
        }
        else {
            localtask = JSON.parse(localStorage.getItem("task"))
        }
        localtask.push(listtaskitem)
        localStorage.setItem("task", JSON.stringify(localtask))
    }
    taskInput.value = "";
    cardfunction();
}
function removelist(event) {
    if (event.target.parentElement.classList[0] === "delete-item") {
        event.target.parentElement.parentElement.remove();

        localstorageremove(event.target.parentElement.parentElement);

    }
   
}
function localstorageremove(remove) {
    let localtask;
    if (localStorage.getItem("task") == null) {
        localtask = [];

    }
    else {
        localtask = JSON.parse(localStorage.getItem("task"))
    }
    localtask.forEach(function (listlocaltask, index) {
        if (remove.innerText === listlocaltask) {

            localtask.splice(index, 1)
        }
    })
    localStorage.setItem("task", JSON.stringify(localtask))

    cardfunction();
}

function clearalltask() {
    // deletealltask.forEach(function(element){
    //     element.remove()
    // })

    taskList.innerHTML = null;

    clearlocalstorage();
}
function clearlocalstorage() {
    // localStorage.clear();
    localStorage.removeItem("task")
    cardfunction();
}

function searchlisttask() {
    const searchvalue = searchtask.value.trim().toLowerCase();
    const searchlistitem = document.querySelectorAll(".collection-item");
    searchlistitem.forEach(function (searchtask) {
        const listsearchvalue = searchtask.innerText.toLowerCase();
        if (listsearchvalue.includes(searchvalue)) {
            searchtask.style.display = 'block';
        }
        else {
            searchtask.style.display = 'none';
        }
    })
    
}

function cardfunction(){
    if (taskList.children.length === 0) {
        cardaction.style.display = 'none';
    } else {
        cardaction.style.display = 'block';
    }

}