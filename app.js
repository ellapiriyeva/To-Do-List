const input = document.querySelector("#todo-input");
const xIcon = document.querySelector(".x-icon");
const addBtn = document.querySelector("#add");
const addSymbol = document.querySelector("#addsymbol");

const down = document.querySelector(".down");
const downfilled = document.querySelector(".downfilled");
const up = document.querySelector(".up");
const upfilled = document.querySelector(".upfilled");

const listContainer = document.querySelector("#task-list");
listContainer.style.display = "none";
listContainer.style.border = "none";

function addTask() {
    if (input.value.trim() === "") return;

    listContainer.style.display = "block";
    listContainer.style.border = "1px solid #c8c7c7";

    let li = document.createElement("li");
    li.textContent = input.value.trim();
    input.value = "";

    let delIcon = document.createElement("img");
    delIcon.src = "/x.svg";
    li.appendChild(delIcon);

    delIcon.addEventListener("mouseenter", () => delIcon.src = "/xfilled.svg");
    delIcon.addEventListener("mouseleave", () => delIcon.src = "/x.svg");

    listContainer.appendChild(li);
    showOnly(down);
}

addBtn.addEventListener("click", addTask);

addSymbol.addEventListener("click", () => {
    input.focus();
});

xIcon.addEventListener("click", () => input.value = "");

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") e.target.parentElement.remove();

    if (listContainer.children.length === 0) {
        listContainer.style.display = "none";
        listContainer.style.border = "none";
        showOnly(down);
    }
});

function showOnly(icon) {
    [down, downfilled, up, upfilled].forEach(i => i.style.display = 'none');
    icon.style.display = 'block';
}

function sortAscending() {
    let items = Array.from(listContainer.children);
    items.sort((a, b) => a.textContent.localeCompare(b.textContent));
    items.forEach(item => listContainer.appendChild(item));
}

function sortDescending() {
    let items = Array.from(listContainer.children);
    items.sort((a, b) => b.textContent.localeCompare(a.textContent));
    items.forEach(item => listContainer.appendChild(item));
}

down.addEventListener("click", () => {
    sortAscending();
    showOnly(downfilled);
});

downfilled.addEventListener("click", () => {
    sortAscending();
    showOnly(up);
});

up.addEventListener("click", () => {
    sortDescending();
    showOnly(upfilled);
});

upfilled.addEventListener("click", () => {
    sortDescending();
    showOnly(down);
});