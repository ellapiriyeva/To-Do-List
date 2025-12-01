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
    const text = input.value.trim();
    if (text === "") return;

    listContainer.style.display = "block";
    listContainer.style.border = "1px solid #c8c7c7";

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = text;

    let del = document.createElement("img");
    del.src = "./Images/x.svg";

    del.addEventListener("mouseenter", () => del.src = "./Images/xfilled.svg");
    del.addEventListener("mouseleave", () => del.src = "./Images/x.svg");
    del.addEventListener("click", () => {
        li.remove();
        if (listContainer.children.length === 0) {
            listContainer.style.display = "none";
            listContainer.style.border = "none";
            showOnly(down);
        }
    });

    li.appendChild(span);
    li.appendChild(del);

    listContainer.appendChild(li);

    input.value = "";
    input.focus();
    showOnly(down);
}

addBtn.addEventListener("click", addTask);

addSymbol.addEventListener("click", () => {
    input.focus();
    input.selectionStart = input.value.length;
});

xIcon.addEventListener("click", () => input.value = "");

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

function showOnly(icon) {
    [down, downfilled, up, upfilled].forEach(i => i.style.display = "none");
    icon.style.display = "block";
}

function sortAscending() {
    let items = Array.from(listContainer.children);
    items.sort((a, b) => {
        let ta = a.querySelector("span").textContent.toLowerCase();
        let tb = b.querySelector("span").textContent.toLowerCase();
        return ta.localeCompare(tb);
    });
    items.forEach(i => listContainer.appendChild(i));
}

function sortDescending() {
    let items = Array.from(listContainer.children);
    items.sort((a, b) => {
        let ta = a.querySelector("span").textContent.toLowerCase();
        let tb = b.querySelector("span").textContent.toLowerCase();
        return tb.localeCompare(ta);
    });
    items.forEach(i => listContainer.appendChild(i));
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
