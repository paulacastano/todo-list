// Iniciar sesión y cambiar pantalla
document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const localUser = document.getElementById('username').value
    const localPass = document.getElementById('password').value
    const { username, password } = JSON.parse(localStorage.getItem('user'))
    if (localUser == username && localPass == password) {
        document.location.assign('./main.html')
    } else {
        document.location.assign('./index.html')
    }
});