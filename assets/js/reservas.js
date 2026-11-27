// Importar e iniciar el menú de navegación
import { iniciarMenu } from "./menu.js";

iniciarMenu();

//datos de prueba
let reservas = [
    {
        codigo: "RES-001",
        inmueble: "Apartamento Barcelona 01",
        entrada: "2026-12-05",
        salida: "2026-12-10",
        estado: "Activa"
    }
];
//muestra las reservas
const listaReservas = document.querySelector("#lista-reservas");

function mostrarReservas() {

    listaReservas.innerHTML = "";

    reservas.forEach((reserva, indice) => {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("card-reserva");

        tarjeta.innerHTML = `
            <div class="reserva-encabezado">

                <span class="reserva-codigo">
                    ${reserva.codigo}
                </span>

                <span class="estado-reserva">
                    ${reserva.estado}
                </span>

            </div>

            <h3 class="reserva-inmueble">
                ${reserva.inmueble}
            </h3>

            <div class="reserva-detalles">

                <p>
                    <i class="bi bi-calendar-check"></i>
                    Entrada: ${reserva.entrada}
                </p>

                <p>
                    <i class="bi bi-calendar-x"></i>
                    Salida: ${reserva.salida}
                </p>

                <p>
                    <i class="bi bi-clock"></i>
                    Hora de salida: ${reserva.horaSalida}
                </p>

            </div>

            <div class="botones-reserva">

                <button class="btn-detalles">
                    <i class="bi bi-eye"></i>
                    Detalles
                </button>

                <button class="btn-editar">
                    <i class="bi bi-pencil"></i>
                    Editar
                </button>

                <button class="btn-cancelar">
                    <i class="bi bi-x-circle"></i>
                    Cancelar
                </button>

            </div>
        `;
        listaReservas.appendChild(tarjeta);

// Botón para editar la reserva
const botonEditar = tarjeta.querySelector(".btn-editar");

botonEditar.addEventListener("click", () => {

    indiceReservaEditando = indice;

    campoInmueble.value = reserva.inmueble;
    campoFechaEntrada.value = reserva.entrada;
    campoFechaSalida.value = reserva.salida;

    const [hora, minutos, periodo] = reserva.horaSalida.split(/[: ]/);

    campoHora.value = hora;
    campoMinutos.value = minutos;
    campoPeriodo.value = periodo;

    modalReserva.showModal();

});


// Botón para cancelar la reserva
const botonCancelar = tarjeta.querySelector(".btn-cancelar");

botonCancelar.addEventListener("click", () => {

    const confirmar = confirm(
        `¿Estás segura de que deseas cancelar la reserva ${reserva.codigo}?`
    );

    if (!confirmar) {
        return;
    }

    reservas[indice].estado = "Cancelada";

    mostrarReservas();

    alert("La reserva ha sido cancelada correctamente.");

});

}); // Cierre del forEach

} // Cierre de mostrarReservas()
//abrir y cerrar ventana modal

// Seleccionar elementos
const modalReserva = document.querySelector("#modal-reserva");
const botonNuevaReserva = document.querySelector("#nueva-reserva");
const botonCerrarModal = document.querySelector("#cerrar-modal");
const botonCancelarFormulario = document.querySelector("#cancelar-formulario");

// Seleccionar campos del formulario
const formularioReserva = document.querySelector("#form-reserva");
const campoInmueble = document.querySelector("#inmueble");
const campoFechaEntrada = document.querySelector("#fecha-entrada");
const campoFechaSalida = document.querySelector("#fecha-salida");
const campoHora = document.querySelector("#hora");
const campoMinutos = document.querySelector("#minutos");
const campoPeriodo = document.querySelector("#periodo");

/* =================================
   GENERAR HORAS Y MINUTOS
================================= */

// Generar horas del 1 al 12
for (let hora = 1; hora <= 12; hora++) {

    const opcion = document.createElement("option");

    opcion.value = String(hora).padStart(2, "0");
    opcion.textContent = String(hora).padStart(2, "0");

    campoHora.appendChild(opcion);

}

// Generar minutos
const minutosDisponibles = ["00", "15", "30", "45"];

minutosDisponibles.forEach(minuto => {

    const opcion = document.createElement("option");

    opcion.value = minuto;
    opcion.textContent = minuto;

    campoMinutos.appendChild(opcion);

});

// Guardar la posición de la reserva que se está editando
let indiceReservaEditando = null;

//abrir y cerrar ventana modal

// Abrir ventana modal para una nueva reserva
botonNuevaReserva.addEventListener("click", () => {

    // Indicar que estamos creando una nueva reserva
    indiceReservaEditando = null;

    // Limpiar los campos
    formularioReserva.reset();

    // Abrir el modal
    modalReserva.showModal();

});

// Cerrar desde la X
botonCerrarModal.addEventListener("click", () => {
    modalReserva.close();
});

// Cerrar desde el botón Cancelar
botonCancelarFormulario.addEventListener("click", () => {
    modalReserva.close();
});

//guardar nuevas reservas

formularioReserva.addEventListener("submit", (event) => {

    // Evitar que la página se recargue
    event.preventDefault();

    const inmueble = campoInmueble.value;
    const entrada = campoFechaEntrada.value;
    const salida = campoFechaSalida.value;

    // Obtener la hora de los tres selectores
    const horaSalida = `${campoHora.value}:${campoMinutos.value} ${campoPeriodo.value}`;

    // Validar que la salida sea posterior a la entrada
    if (salida <= entrada) {
        alert("La fecha de salida debe ser posterior a la fecha de entrada.");
        return;
    }

    // Crear el objeto con los datos actualizados
const reservaActualizada = {

    codigo: indiceReservaEditando !== null
        ? reservas[indiceReservaEditando].codigo
        : `RES-${String(reservas.length + 1).padStart(3, "0")}`,

    inmueble: inmueble,
    entrada: entrada,
    salida: salida,
    horaSalida: horaSalida,

    estado: indiceReservaEditando !== null
        ? reservas[indiceReservaEditando].estado
        : "Activa"

};

// Comprobar si estamos editando o creando
if (indiceReservaEditando !== null) {

    // Actualizar la reserva existente
    reservas[indiceReservaEditando] = reservaActualizada;

} else {

    // Registrar una reserva nueva
    reservas.push(reservaActualizada);

}

    // Actualizar las tarjetas
    mostrarReservas();

    // Restablecer el modo de edición
    indiceReservaEditando = null;

    // Limpiar el formulario
    formularioReserva.reset();

    // Cerrar la ventana modal
    modalReserva.close();

    alert("¡Reserva registrada correctamente!");

});

// Mostrar las reservas al cargar la página
mostrarReservas();