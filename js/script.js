// Botón de agregar tarea
document.getElementById("save-task").addEventListener("click", function () {
    agregarTarea();
});

const tareasActuales = localStorage.getItem('tareas') ? JSON.parse(localStorage.getItem('tareas')) : []

let tareasGuardadas = []

/**
 * Esta funcion se encarga de establecer el formato de la fecha con la informacion actual
 *  
 */

function descriptionFecha(date) {
    let descripcion = new Date(date).toLocaleDateString('es-CO', { weekday: "long", year: "numeric", month: "short", day: "numeric" })
    return String(descripcion).charAt(0).toUpperCase() + String(descripcion).slice(1);
}

document.getElementById('fecha').innerText = descriptionFecha(new Date())

// Función para agregar tarea
function agregarTarea() {
    const taskTitle = document.getElementById("activity-name").value.trim();
    const taskDescription = document.getElementById("activity-description").value.trim();
    const taskPriority = document.getElementById("activity-priority").value;

    // Obtener valores del formulario
    const fechaCreacion = document.getElementById("fecha-creacion").value;
    const fechaVencimiento = document.getElementById("fecha-vencimiento").value;

    // Crear la tarea
    const tarea = {
        id: Date.now(), // Usamos el timestamp como id único
        titulo: taskTitle,
        descripcion: taskDescription, // Puedes obtener esto de otro campo si es necesario
        fechaCreacion: fechaCreacion,
        estado: "pendiente",
        fechaVencimiento: fechaVencimiento,
        prioridad: taskPriority
    };

    // Verificar que los campos no estén vacíos
    if (taskTitle) {
        tareasActuales.push(tarea)
        localStorage.setItem('tareas', JSON.stringify(tareasActuales))
        mostrarTarea(tarea)

        // Limpiar campos de entrada
        document.getElementById("activity-name").value = "";
        document.getElementById("activity-description").value = "";
    } else {
        alert("Por favor, escribe un título y una hora para la actividad.");
    }

}

function mostrarTarea(tarea) {
    const newTask = document.createElement("div");
    newTask.setAttribute('class', 'card mb-1')
    newTask.setAttribute('id', tarea.id)

    // Insertar tarea en el HTML
    newTask.innerHTML = `
            <div class="card-body">
                <h5 class="card-title"><i class="fas fa-edit"></i> ${tarea.titulo}</h5>
                <p class="card-text">${tarea.descripcion}</p>
            </div>
            <div class="card-footer bg-transparent fw-bold text-center"> - ${descriptionFecha(tarea.fechaVencimiento)} -</div>
        `;

    // Agregar la tarea a la columna con el estado correspondiente
    const taskList = document.getElementById(`section-${tarea.estado}`);
    taskList.appendChild(newTask);
}

function cargarTareas(tareas) {
    tareas.forEach((tarea) => {
        mostrarTarea(tarea)
    })
}

cargarTareas(tareasActuales)

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
tutorialBtn.onclick = function () {
    tutorialModal.style.display = 'block';
};

// Función para cerrar el modal al hacer clic en el botón de cierre
closeBtn.onclick = function () {
    tutorialModal.style.display = 'none';
    const video = document.getElementById('tutorial-video');
    video.src = video.src;
};

// Función para cerrar el modal al hacer clic fuera del contenido
window.onclick = function (event) {
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

// Función para clonar la tarea con una nueva fecha de vencimiento
function clonarTarea(tarea, nuevaFecha) {
    return {
        ...tarea, // Copia todas las propiedades de la tarea original
        fechaVencimiento: nuevaFecha // Solo cambiamos la fecha de vencimiento
    };
}
