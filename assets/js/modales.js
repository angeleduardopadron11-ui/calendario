// ventanas modales

export function iniciarModales() {

    const modal = document.querySelector("#modal-evento");
    const cerrarModal = document.querySelector("#cerrar-modal");

    const modalTitulo = document.querySelector("#modal-titulo");
    const modalCodigo = document.querySelector("#modal-codigo");
    const modalContenido = document.querySelector("#modal-contenido");

    const modalListaEventos = document.querySelector("#modal-lista-eventos");
    const cerrarListaEventos = document.querySelector("#cerrar-lista-eventos");

    const fechaListaEventos = document.querySelector("#fecha-lista-eventos");
    const contenidoListaEventos = document.querySelector("#contenido-lista-eventos");


// abre la ventana modal de los detalles

    function abrirModal(evento) {

        modalTitulo.textContent =
            evento.tipo === "reserva"
            ? "Detalles de la reserva"
            : "Detalles de la limpieza";

        modalCodigo.textContent = evento.codigo;

        modalContenido.innerHTML = "";

        const detalles = [
            ["Inmueble", evento.inmueble.nombre],
            ["Apartamento", evento.inmueble.numero],
            ["Ubicación", evento.inmueble.ubicacion]
        ];

        if (evento.tipo === "reserva") {

            detalles.push(
                ["Fecha de entrada", evento.entrada],
                ["Fecha de salida", evento.salida],
                ["Hora de salida", evento.hora],
                ["Estado", evento.estado]
            );

        } else {

            detalles.push(
                ["Horario", evento.hora],
                ["Empleado asignado", evento.empleado],
                ["Estado", evento.estado]
            );

        }

        detalles.forEach(([etiqueta, valor]) => {

            const detalle = document.createElement("div");
            detalle.classList.add("detalle-evento");

            const texto = document.createElement("p");
            texto.textContent = `${etiqueta}: ${valor}`;

            detalle.appendChild(texto);
            modalContenido.appendChild(detalle);

        });

        modal.showModal();

    }


    // ventana modal que muestra los eventos

    function abrirListaEventos(fecha, eventosDelDia) {

        fechaListaEventos.textContent =
            new Intl.DateTimeFormat("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric"
            }).format(fecha);

        contenidoListaEventos.innerHTML = "";

        eventosDelDia.forEach(evento => {

            const elemento = document.createElement("div");

            elemento.classList.add("evento");
            elemento.classList.add(`evento-${evento.tipo}`);
            elemento.classList.add("evento-lista");

            const titulo = document.createElement("strong");

            titulo.textContent =
                `${evento.tipo === "reserva" ? "Reserva" : "Limpieza"} · ${evento.codigo}`;

            const propiedad = document.createElement("small");

            propiedad.textContent =
                `${evento.inmueble.nombre} - ${evento.inmueble.numero}`;

            const hora = document.createElement("small");
            hora.textContent = evento.hora;

            elemento.appendChild(titulo);
            elemento.appendChild(propiedad);
            elemento.appendChild(hora);

            elemento.style.cursor = "pointer";

            elemento.addEventListener("click", () => {

                modalListaEventos.close();
                abrirModal(evento);

            });

            contenidoListaEventos.appendChild(elemento);

        });

        modalListaEventos.showModal();

    }


    //cierra las ventanas modales

    cerrarModal.addEventListener("click", () => {
        modal.close();
    });

    cerrarListaEventos.addEventListener("click", () => {
        modalListaEventos.close();
    });


    //permite que funcione para otros archivos
    return {
        abrirModal,
        abrirListaEventos
    };

}
