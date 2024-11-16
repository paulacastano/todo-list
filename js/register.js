// Iniciar sesión y cambiar pantalla
document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const email = document.getElementById('correo').value
    const user = {
        username,
        password,
        email
    }
    localStorage.setItem('user', JSON.stringify(user))
    document.location.assign('./index.html')
});