// Iniciar sesión y cambiar pantalla
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    document.querySelector(".login-container").style.display = "none"; // Ocultar la pantalla de login
    document.getElementById("task-container").style.display = "block"; // Mostrar la pantalla de tareas
});

// Función para agregar una tarea
document.getElementById("boton-enter").addEventListener("click", function() {
    const inputElement = document.getElementById("input");
    const taskText = inputElement.value.trim();

    if (taskText) {
        const taskTime = prompt("¿A qué hora deseas hacer esta tarea? (Formato: HH:MM)", "12:00");

        // Crear un nuevo elemento de lista para la tarea
        const newTask = document.createElement("li");

        // Agregar íconos, hora y texto de la tarea
        newTask.innerHTML = `
            <i class="far fa-circle co" data="realizado"></i>
            <p class="tex">${taskText} <span class="hora">${taskTime}</span></p>
            <i class="fas fa-trash de" data="eliminado"></i>
        `;

        // Agregar la funcionalidad para borrar la tarea
        newTask.querySelector(".de").addEventListener("click", function() {
            newTask.remove();
        });

        // Agregar la tarea a la lista de tareas
        document.getElementById("lista").appendChild(newTask);

        // Limpiar el campo de entrada
        inputElement.value = "";
    } else {
        alert("Por favor, escribe una tarea para agregarla.");
    }
});
