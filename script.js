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

// Función para agregar tarea
function agregarTarea() {
    const taskTitle = document.getElementById("input").value.trim();
    const taskTime = document.getElementById("activity-time").value.trim();
    const taskDescription = document.getElementById("task-description").value.trim();
    const taskPriority = document.getElementById("activity-priority").value;

    // Verificar que los campos no estén vacíos
    if (taskTitle && taskTime) {
        const taskId = Date.now(); // Generar un ID único
        const newTask = document.createElement("li");
        newTask.id = taskId;

        // Insertar tarea en el HTML
        newTask.innerHTML = `
            <i class="far fa-circle co" data="realizado"></i>
            <p class="tex">${taskTitle}</p>
            <span class="task-time">${taskTime}</span>
            <span class="descripcion">${taskDescription}</span>
            <i class="fas fa-trash de" data="eliminado"></i>
            <button class="edit-btn" onclick="abrirModalEditarTarea('${taskId}')">Editar</button>
        `;

        // Agregar la tarea a la lista correspondiente por prioridad
        const taskList = document.getElementById(`lista-${taskPriority}`);
        taskList.appendChild(newTask);

        // Limpiar campos de entrada
        document.getElementById("input").value = "";
        document.getElementById("activity-time").value = "";
        document.getElementById("task-description").value = "";
    } else {
        alert("Por favor, escribe un título y una hora para la actividad.");
    }
}

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

// Funciones del modal tutorial
const tutorialBtn = document.getElementById('tutorial-btn');
const tutorialModal = document.getElementById('tutorial-modal');
const closeBtn = document.querySelector('.close');

// Función para abrir el modal
tutorialBtn.onclick = function() {
    tutorialModal.style.display = 'block';
};

// Función para cerrar el modal al hacer clic en el botón de cierre
closeBtn.onclick = function() {
    tutorialModal.style.display = 'none';
    const video = document.getElementById('tutorial-video');
    video.src = video.src;
};

// Función para cerrar el modal al hacer clic fuera del contenido
window.onclick = function(event) {
    if (event.target == tutorialModal) {
        tutorialModal.style.display = 'none';
        const video = document.getElementById('tutorial-video');
        video.src = video.src;
    }
};

// Función para abrir el modal de edición de tarea
let tareaEnEdicion = null;

function abrirModalEditarTarea(taskId) {
    const tarea = document.getElementById(taskId);
    
    if (tarea) {
        tareaEnEdicion = {
            id: taskId,
            titulo: tarea.querySelector(".tex").textContent,
            descripcion: tarea.querySelector(".descripcion") ? tarea.querySelector(".descripcion").textContent : "",
            prioridad: tarea.querySelector(".prioridad") ? tarea.querySelector(".prioridad").textContent : "normal",
            estado: tarea.querySelector(".estado") ? tarea.querySelector(".estado").textContent : "pendiente"
        };

        // Llenar los campos del modal con los valores actuales de la tarea
        document.getElementById("titulo-editar").value = tareaEnEdicion.titulo;
        document.getElementById("descripcion-editar").value = tareaEnEdicion.descripcion;
        document.getElementById("prioridad-editar").value = tareaEnEdicion.prioridad; // Aquí se asigna la prioridad correctamente
        document.getElementById("estado-editar").value = tareaEnEdicion.estado;

        // Mostrar el modal
        document.getElementById("modal-editar-tarea").style.display = "block";
    } else {
        console.error('No se pudo encontrar la tarea con el id:', taskId);
    }
}


function guardarCambiosTarea() {
    if (!tareaEnEdicion) {
        console.error('No hay tarea en edición');
        return;
    }

    // Obtener los valores editados en el formulario del modal
    tareaEnEdicion.titulo = document.getElementById("titulo-editar").value;
    tareaEnEdicion.descripcion = document.getElementById("descripcion-editar").value;
    tareaEnEdicion.prioridad = document.getElementById("prioridad-editar").value; // Asegúrate de que la prioridad se está leyendo correctamente
    tareaEnEdicion.estado = document.getElementById("estado-editar").value;

    // Actualizar la vista de la tarea en la lista
    actualizarVistaTarea(tareaEnEdicion);

    // Mover la tarea a la lista correspondiente según la nueva prioridad
    moverTareaSegunPrioridad(tareaEnEdicion);

    // Cerrar el modal después de guardar los cambios
    cerrarModalEditarTarea();
}


// Función para actualizar la vista de la tarea después de la edición
function actualizarVistaTarea(tarea) {
    const tareaElement = document.getElementById(tarea.id);
    
    if (tareaElement) {
        tareaElement.querySelector(".tex").textContent = tarea.titulo;
        tareaElement.querySelector(".descripcion").textContent = tarea.descripcion;

        // Actualiza la prioridad visualmente en la vista
        const prioridadElement = tareaElement.querySelector(".prioridad"); 
        if (prioridadElement) {
            prioridadElement.textContent = tarea.prioridad;  // Actualiza la prioridad mostrada
        }

        tareaElement.querySelector(".estado").textContent = tarea.estado;
    } else {
        console.error('No se encontró la tarea en la lista con el id:', tarea.id);
    }
}




function guardarCambiosTarea() {
    if (!tareaEnEdicion) {
        console.error('No hay tarea en edición');
        return;
    }

    // Obtener los valores editados en el formulario del modal
    tareaEnEdicion.titulo = document.getElementById("titulo-editar").value;
    tareaEnEdicion.descripcion = document.getElementById("descripcion-editar").value;
    tareaEnEdicion.prioridad = document.getElementById("prioridad-editar").value;
    tareaEnEdicion.estado = document.getElementById("estado-editar").value;

    // Actualizar la vista de la tarea en la lista
    actualizarVistaTarea(tareaEnEdicion);

    // Mover la tarea a la lista correspondiente según la nueva prioridad
    moverTareaSegunPrioridad(tareaEnEdicion);

    // Cerrar el modal después de guardar los cambios
    cerrarModalEditarTarea();
}

function moverTareaSegunPrioridad(tarea) {
    const tareaElement = document.getElementById(tarea.id);

    if (tareaElement) {
        // Obtener la lista correspondiente a la nueva prioridad
        const taskList = document.getElementById(`lista-${tarea.prioridad}`);
        
        // Solo agregar la tarea si no está ya en la lista correcta
        if (!taskList.contains(tareaElement)) {
            taskList.appendChild(tareaElement);
        }
    } else {
        console.error('No se encontró la tarea en la lista con el id:', tarea.id);
    }
}

function cerrarModalEditarTarea() {
    document.getElementById("modal-editar-tarea").style.display = "none";
    // Asegurarse de que la página no se reinicie ni cambie de vista
    event.stopPropagation();
}

const tarea = {
    id: 1,
    descripcion: "Tarea de ejemplo",
    fechaCreacion: new Date(), // Fecha de creación (actual)
    fechaVencimiento: new Date("2024-11-30T23:59:59"), // Fecha de vencimiento
    esRecurrente: false, // Si es recurrente
    frecuenciaRecurrente: null, // Puede ser 'diaria', 'semanal', 'mensual'
};

// Función para obtener los valores del formulario y guardar la tarea
document.getElementById("guardarTarea").addEventListener("click", function() {
    // Obtener valores del formulario
    const fechaCreacion = document.getElementById("fecha-creacion").value;
    const fechaVencimiento = document.getElementById("fecha-vencimiento").value;
    const recurrencia = document.getElementById("recurrencia").value;

    // Crear la tarea
    const tarea = {
        id: Date.now(), // Usamos el timestamp como id único
        descripcion: "Descripción de la tarea", // Puedes obtener esto de otro campo si es necesario
        fechaCreacion: new Date(fechaCreacion),
        fechaVencimiento: new Date(fechaVencimiento),
        esRecurrente: recurrencia !== "ninguna",
        frecuenciaRecurrente: recurrencia === "ninguna" ? null : recurrencia
    };

    // Si la tarea es recurrente, generamos las tareas recurrentes
    const tareasGuardadas = generacionRecurrente(tarea);

    // Mostrar las tareas generadas (puedes adaptarlo para tu vista)
    console.log(tareasGuardadas);
});

// Función para generar las tareas recurrentes
function generacionRecurrente(tarea) {
    const tareas = [];
    let fecha = new Date(tarea.fechaVencimiento);

    if (tarea.esRecurrente) {
        switch (tarea.frecuenciaRecurrente) {
            case "diaria":
                // Generar tareas diarias (por ejemplo, 30 días de recurrencia)
                for (let i = 1; i <= 30; i++) {
                    fecha.setDate(fecha.getDate() + 1); // Sumar 1 día
                    tareas.push(clonarTarea(tarea, fecha));
                }
                break;
            case "semanal":
                // Generar tareas semanales (por ejemplo, 12 semanas de recurrencia)
                for (let i = 1; i <= 12; i++) {
                    fecha.setDate(fecha.getDate() + 7); // Sumar 7 días
                    tareas.push(clonarTarea(tarea, fecha));
                }
                break;
            case "mensual":
                // Generar tareas mensuales (por ejemplo, 6 meses de recurrencia)
                for (let i = 1; i <= 6; i++) {
                    fecha.setMonth(fecha.getMonth() + 1); // Sumar 1 mes
                    tareas.push(clonarTarea(tarea, fecha));
                }
                break;
        }
    } else {
        tareas.push(tarea); // Si no es recurrente, simplemente guardamos la tarea original
    }

    return tareas;
}

// Función para clonar la tarea con una nueva fecha de vencimiento
function clonarTarea(tarea, nuevaFecha) {
    return {
        ...tarea, // Copia todas las propiedades de la tarea original
        fechaVencimiento: nuevaFecha // Solo cambiamos la fecha de vencimiento
    };
}


function mostrarTareas(tareas) {
    const contenedor = document.getElementById("tareas-container");
    contenedor.innerHTML = ""; // Limpiar el contenedor

    tareas.forEach(tarea => {
        const tareaElement = document.createElement("div");
        tareaElement.innerHTML = `
            <p>Descripción: ${tarea.descripcion}</p>
            <p>Fecha de Creación: ${tarea.fechaCreacion.toLocaleString()}</p>
            <p>Fecha de Vencimiento: ${tarea.fechaVencimiento.toLocaleString()}</p>
            <p>Frecuencia: ${tarea.frecuenciaRecurrente || "Ninguna"}</p>
        `;
        contenedor.appendChild(tareaElement);
    });
}

// Llamamos a la función para mostrar las tareas después de guardarlas
mostrarTareas(tareasGuardadas);
