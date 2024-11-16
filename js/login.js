// Iniciar sesión y cambiar pantalla
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    document.querySelector(".login-container").style.display = "none";
    if (username == 'admin' && password == '123') {
        document.location.assign('./main.html')
    } else {
        document.location.assign('./index.html')
    }
});