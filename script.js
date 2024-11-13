// Iniciar sesión y cambiar pantalla
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelector(".login-container").style.display = "none";
    document.getElementById("task-container").style.display = "block";
});

// Botón de agregar tarea
document.getElementById("boton-enter").addEventListener("click", function () {
    agregarTarea();
});

//Funcion para agregar tarea
function agregarTarea() {
    const taskTitle = document.getElementById("input").value.trim();
    const taskPriority = document.getElementById("activity-priority").value;
    const taskTime = document.getElementById("activity-time").value;

    if (taskTitle) {
        const newTask = document.createElement("li");
        newTask.innerHTML = `
            <i class="far fa-circle co" data="realizado"></i>
            <p class="tex">${taskTitle}</p>
            <span class="task-time">${taskTime}</span>
            <i class="fas fa-trash de" data="eliminado"></i>
        `;

        // Agregar la tarea a la lista de acuerdo a la prioridad
        document.getElementById(`lista-${taskPriority}`).appendChild(newTask);

        // Limpiar los campos de entrada
        document.getElementById("input").value = "";
        document.getElementById("activity-time").value = "";
        document.getElementById("activity-priority").value = "normal";
    } else {
        alert("Por favor, escribe un título para la actividad.");
    }
};

// Manejar eventos de la lista de tareas
document.addEventListener("click", function (event) {
    // Marcar tarea como completada
    if (event.target.classList.contains("co")) {
        completarTarea(event.target);
    }
    // Eliminar tarea
    if (event.target.classList.contains("de")) {
        eliminarTarea(event.target);
    }
});

// Función para completar una tarea
function completarTarea(element) {
    const tarea = element.parentElement;
    tarea.querySelector(".co").classList.replace("fa-circle", "fa-check-circle");
    tarea.classList.add("tarea-completada");

    // Mover la tarea a la lista de tareas completadas
    document.getElementById("lista-completadas").appendChild(tarea);
}

// Función para eliminar una tarea
function eliminarTarea(element) {
    element.parentElement.remove();
}

