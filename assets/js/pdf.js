
/* =================================
   GENERACIÓN DE REPORTES PDF
================================= */

export function iniciarPDF(obtenerDatosReporte) {

    // Seleccionar el botón
    const botonExportarPDF = document.querySelector("#exportar-pdf");

    if (!botonExportarPDF) {
        return;
    }

    botonExportarPDF.addEventListener("click", () => {

        // Obtener los datos actuales del calendario
        const {
            eventos,
            tipoVista,
            fechaSeleccionada,
            obtenerInicioSemana
        } = obtenerDatosReporte();


        // Comprobar biblioteca
        if (typeof html2pdf === "undefined") {

            alert("No se pudo cargar la biblioteca PDF.");
            return;

        }


        //* Determinar el período del reporte */

        let fechaInicio;
        let fechaFin;

        if (tipoVista === "mensual") {

            fechaInicio = new Date(
                fechaSeleccionada.getFullYear(),
                fechaSeleccionada.getMonth(),
                1
            );

            fechaFin = new Date(
                fechaSeleccionada.getFullYear(),
                fechaSeleccionada.getMonth() + 1,
                0
            );

        } else {

            fechaInicio = obtenerInicioSemana(fechaSeleccionada);

            fechaFin = new Date(fechaInicio);

            fechaFin.setDate(fechaInicio.getDate() + 6);

        }


        //* Obtener eventos del período */

        const eventosReporte = eventos.filter(evento => {

            const [año, mes, dia] = evento.fecha.split("-").map(Number);

            const fechaEvento = new Date(año, mes - 1, dia);

            return fechaEvento >= fechaInicio &&
                fechaEvento <= fechaFin &&
                evento.estado !== "Cancelada";

        });


        //* Ordenar los eventos */

        eventosReporte.sort((a, b) => {

            if (a.fecha !== b.fecha) {

                return a.fecha.localeCompare(b.fecha);

            }

            return a.hora.localeCompare(b.hora);

        });


        //* Crear contenedor del PDF */

        const contenidoPDF = document.createElement("div");

        contenidoPDF.style.padding = "20px";
        contenidoPDF.style.fontFamily = "Arial, sans-serif";
        contenidoPDF.style.color = "#292723";


        //* Crear encabezado */

        const encabezado = document.createElement("div");

        encabezado.style.textAlign = "center";
        encabezado.style.marginBottom = "20px";

        const titulo = document.createElement("h1");

        titulo.textContent = "BDN CALENDAR";

        titulo.style.color = "#806448";

        const subtitulo = document.createElement("h2");

        subtitulo.textContent =
            "Reporte de reservas y servicios de limpieza";

        const ubicacion = document.createElement("p");

        ubicacion.textContent = "Badalona, España";

        const periodo = document.createElement("p");

        const formatoFecha = fecha => {

            return new Intl.DateTimeFormat("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }).format(fecha);

        };

        periodo.textContent =
            `Período: ${formatoFecha(fechaInicio)} - ${formatoFecha(fechaFin)}`;

        encabezado.appendChild(titulo);
        encabezado.appendChild(subtitulo);
        encabezado.appendChild(ubicacion);
        encabezado.appendChild(periodo);

        contenidoPDF.appendChild(encabezado);


        //* Crear tabla */

        const tabla = document.createElement("table");

        tabla.style.width = "100%";
        tabla.style.borderCollapse = "collapse";
        tabla.style.fontSize = "10px";


        //* Crear encabezados de tabla */

        const encabezados = [
            "Día",
            "Fecha",
            "Tipo",
            "Código",
            "Inmueble",
            "Apartamento",
            "Ubicación",
            "Horario",
            "Entrada",
            "Salida",
            "Personal",
            "Estado"
        ];

        const filaEncabezado = document.createElement("tr");

        encabezados.forEach(texto => {

            const th = document.createElement("th");

            th.textContent = texto;

            th.style.backgroundColor = "#AF8D6A";
            th.style.color = "#FFFFFF";
            th.style.padding = "8px";
            th.style.border = "1px solid #D5C5B5";

            filaEncabezado.appendChild(th);

        });

        tabla.appendChild(filaEncabezado);


        //* Crear filas con eventos */

        eventosReporte.forEach(evento => {

            const fila = document.createElement("tr");

            const [año, mes, dia] = evento.fecha.split("-").map(Number);

            const fechaEvento = new Date(año, mes - 1, dia);

            const diaSemana = new Intl.DateTimeFormat("es-ES", {
                weekday: "long"
            }).format(fechaEvento);

            const fechaTexto = formatoFecha(fechaEvento);

            const datos = [

                diaSemana,
                fechaTexto,
                evento.tipo === "reserva" ? "Reserva" : "Limpieza",
                evento.codigo,
                evento.inmueble.nombre,
                evento.inmueble.numero,
                evento.inmueble.ubicacion,
                evento.hora,
                evento.tipo === "reserva" ? evento.entrada : "-",
                evento.tipo === "reserva" ? evento.salida : "-",
                evento.tipo === "limpieza" ? evento.empleado : "-",
                evento.estado

            ];

            datos.forEach(valor => {

                const td = document.createElement("td");

                td.textContent = valor ?? "-";

                td.style.padding = "6px";
                td.style.border = "1px solid #D5C5B5";
                td.style.textAlign = "center";

                fila.appendChild(td);

            });

            tabla.appendChild(fila);

        });

        contenidoPDF.appendChild(tabla);


        //* Mensaje si no existen eventos */

        if (eventosReporte.length === 0) {

            const mensaje = document.createElement("p");

            mensaje.textContent =
                "No existen eventos registrados para este período.";

            mensaje.style.textAlign = "center";

            contenidoPDF.appendChild(mensaje);

        }


        //* Configuración del PDF */

        const opciones = {

            margin: 8,

            filename: `BDN_Calendar_${tipoVista}_${fechaInicio.toISOString().slice(0,10)}.pdf`,

            image: {
                type: "jpeg",
                quality: 0.98
            },

            html2canvas: {
                scale: 2,
                useCORS: true
            },

            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "landscape"
            }

        };


        //* Generar PDF */

        html2pdf()
            .set(opciones)
            .from(contenidoPDF)
            .save();

    });

}
