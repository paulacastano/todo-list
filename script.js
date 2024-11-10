document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    // Ocultar el formulario de inicio de sesión y mostrar la lista de tareas
    document.querySelector(".login-container").style.display = "none";
    document.getElementById("task-container").style.display = "block";
});
