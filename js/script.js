let tareasActuales = localStorage.getItem('tareas') ? JSON.parse(localStorage.getItem('tareas')) : []
let formulario = null

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

// Funcion para limpiar la modal de creacion y edicion de tareas
function limpiarModal() {
    document.getElementById("activity-name").value = null
    document.getElementById("activity-description").value = null
    document.getElementById("activity-priority").value = null
    document.getElementById("activity-status").value = null
    document.getElementById("fecha-creacion").value = null
    document.getElementById("fecha-vencimiento").value = null
}

// Función para agregar tarea
function agregarTarea() {
    const esEdicion = formulario != null

    const taskTitle = document.getElementById("activity-name").value.trim();
    const taskDescription = document.getElementById("activity-description").value.trim();
    const taskPriority = document.getElementById("activity-priority").value;
    const taskStatus = document.getElementById("activity-status").value;
    // Obtener valores del formulario
    const fechaCreacion = document.getElementById("fecha-creacion").value;
    const fechaVencimiento = document.getElementById("fecha-vencimiento").value;
    // Crear la tarea
    formulario = {
        id: esEdicion ? formulario.id : Date.now(), // Usamos el timestamp como id único
        titulo: taskTitle,
        descripcion: taskDescription, // Puedes obtener esto de otro campo si es necesario
        fechaCreacion: fechaCreacion,
        estado: taskStatus,
        fechaVencimiento: fechaVencimiento,
        prioridad: taskPriority
    };

    // Verificar que los campos no estén vacíos
    if (formulario.titulo) {
        if (esEdicion) {
            tareasActuales = tareasActuales.map(tarea => {
                if (tarea.id == formulario.id) {
                    return formulario
                }
                return tarea
            })
        } else {
            tareasActuales.push(formulario)
        }
        localStorage.setItem('tareas', JSON.stringify(tareasActuales))
        limpiarTareas()
        cargarTareas(tareasActuales)
        formulario = null
    } else {
        alert("Por favor, escribe un título y una hora para la actividad.");
    }

}

function cargarDatos(tareaId) {
    const [tareaActual] = tareasActuales.filter(tarea => (tarea.id == tareaId))
    document.getElementById("activity-name").value = tareaActual.titulo
    document.getElementById("activity-description").value = tareaActual.descripcion
    document.getElementById("activity-priority").value = tareaActual.prioridad
    document.getElementById("activity-status").value = tareaActual.estado
    document.getElementById("fecha-creacion").value = tareaActual.fechaCreacion
    document.getElementById("fecha-vencimiento").value = tareaActual.fechaVencimiento
    formulario = tareaActual;
}

function limpiarTareas() {
    document.getElementById(`section-pendiente`).innerHTML = '';
    document.getElementById(`section-en-progreso`).innerHTML = '';
    document.getElementById(`section-terminada`).innerHTML = '';
    document.getElementById(`section-aplazada`).innerHTML = '';
}

function mostrarTarea(tarea) {
    const newTask = document.createElement("div");
    newTask.setAttribute('class', 'card mb-1')
    newTask.setAttribute('id', tarea.id)

    // Insertar tarea en el HTML
    newTask.innerHTML = `
            <div class="card-body">
                <h5 class="card-title"><i onclick="cargarDatos(${tarea.id})" class="fas fa-edit" data-bs-toggle="modal" data-bs-target="#modalCrearTarea"></i> ${tarea.titulo}</h5>
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

// Función para eliminar una tarea
function eliminarTarea() {
    if (formulario.id) {
        tareasActuales = tareasActuales.filter(tarea => (tarea.id != formulario.id))
        localStorage.setItem('tareas', JSON.stringify(tareasActuales))
        limpiarTareas()
        cargarTareas(tareasActuales)
        formulario = null
    }
}
