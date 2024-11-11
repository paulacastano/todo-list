// Iniciar sesión y cambiar pantalla
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    document.querySelector(".login-container").style.display = "none";
    document.getElementById("task-container").style.display = "block";
});

// Agregar tarea al hacer clic en el botón de agregar
document.getElementById("boton-enter").addEventListener("click", function() {
    const taskTitle = document.getElementById("input").value.trim();
    const taskTime = document.getElementById("activity-time").value;
    const taskPriority = document.getElementById("activity-priority").value;

    if (taskTitle && taskTime) {
        const newTask = document.createElement("li");
        newTask.innerHTML = `
            <i class="far fa-circle co" data="realizado"></i>
            <p class="tex">${taskTitle} - <span class="task-time">${taskTime}</span></p>
            <i class="fas fa-trash de" data="eliminado"></i>
        `;

        // Agregar la tarea a la lista de acuerdo a la prioridad
        document.getElementById(`lista-${taskPriority}`).querySelector("ul").appendChild(newTask);

        // Limpiar los campos después de agregar la tarea
        document.getElementById("input").value = "";
        document.getElementById("activity-time").value = "";
    } else {
        alert("Por favor, escribe un título y selecciona una hora para la actividad.");
    }
});

// Borrar tarea al hacer clic en el icono de la papelera
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("de")) {
        event.target.parentElement.remove();
    }
});
