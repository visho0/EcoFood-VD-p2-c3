// Simulation of user database
let users = JSON.parse(localStorage.getItem('ecofood_users')) || [];

// Función para guardar usuarios en localStorage
function saveUsers() {
    localStorage.setItem('ecofood_users', JSON.stringify(users));
}

// Manejo del formulario de registro
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validaciones
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        if (users.some(user => user.email === email)) {
            alert('Este correo ya está registrado');
            return;
        }
        
        // Registrar usuario
        users.push({ name, email, password });
        saveUsers();
        
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = 'login.html';
    });
}

// Manejo del formulario de login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const user = users.find(user => user.email === email && user.password === password);
        
        if (user) {
            // Guardar sesión (en un caso real usaríamos tokens/JWT)
            sessionStorage.setItem('ecofood_currentUser', JSON.stringify(user));
            alert('Inicio de sesión exitoso');
            window.location.href = '../index.html';
        } else {
            alert('Correo o contraseña incorrectos');
        }
    });
}

// Manejo del formulario de recuperación
if (document.getElementById('resetForm')) {
    document.getElementById('resetForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        
        if (users.some(user => user.email === email)) {
            alert('Se ha enviado un enlace de recuperación a tu correo (simulado)');
            window.location.href = 'login.html';
        } else {
            alert('Este correo no está registrado');
        }
    });
}

// Verificar sesión al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('ecofood_currentUser'));
    
    if (currentUser && document.querySelector('.auth-links')) {
        document.querySelector('.auth-links').innerHTML = `
            <a href="#" id="logout">Cerrar sesión</a>
            <span>Bienvenido, ${currentUser.name}</span>
        `;
        
        document.getElementById('logout').addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('ecofood_currentUser');
            window.location.reload();
        });
    }
});