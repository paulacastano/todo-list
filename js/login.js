// Iniciar sesión y cambiar pantalla
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelector(".login-container").style.display = "none";
    document.location.assign('./index.html')
});