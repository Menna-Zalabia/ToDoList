const form = document.getElementById("form");
const Errors = {};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = form.elements.title.value;
    const d = form.elements.description.value;

    if (title.length < 5 || title.length > 20) {
        Errors.title = "Title must be between 5 and 20";
        form.elements.title.nextElementSibling.classList.remove("d-none");
        form.elements.title.nextElementSibling.innerText = Errors.title;
    } else {
        Errors.title = "";
        form.elements.title.nextElementSibling.classList.add("d-none");
        form.elements.title.nextElementSibling.innerText = Errors.title;
    }

    if (d.length < 5 || d.length > 300) {
        Errors.d = "Description must be between 5 and 300";
        form.elements.description.nextElementSibling.classList.remove("d-none");
        form.elements.description.nextElementSibling.innerText = Errors.d;
    } else {
        Errors.d = "";
        form.elements.description.nextElementSibling.classList.add("d-none");
        form.elements.description.nextElementSibling.innerText = Errors.d;
    }

    if (!(Errors.title || Errors.d)) {
        document.getElementById("content").innerHTML += `
        <div class="card col-6 m-2 alert-warning" data-completed="false">
            <div class="card-body">
                <h3 class)">${title}</h3>
                <p class="card-text">${d}</p>
                <button class="col-4 btn btn-danger" onclick="deleteTask(this)">Delete Task</button>
                <button class="col-4 btn btn-success" onclick="completeTask(this)">Completed Task</button
            </div>
        </div>
        `;
        form.reset();
    }
});
function deleteTask(btn) {
    btn.parentElement.parentElement.remove();
}

function completeTask(button) {
    const card = button.closest(".card");
    const isComplete = card.dataset.completed === "true";
    card.dataset.completed = !isComplete;
    card.classList.toggle("alert-warning", isComplete);
    card.classList.toggle("alert-success", !isComplete);
    button.innerText = isComplete ? "Completed Task" : "Undo Task";
}