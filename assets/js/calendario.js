//funciones de las ventanas modales
let abrirModal;
let abrirListaEventos;
export function conectarModales(funcionesModales) {

    abrirModal = funcionesModales.abrirModal;
    abrirListaEventos = funcionesModales.abrirListaEventos;
}

//calendario
const calendario = document.querySelector("#calendario");
const fechaActual = document.querySelector("#fecha-actual");

const anterior = document.querySelector("#anterior");
const siguiente = document.querySelector("#siguiente");
const botonHoy = document.querySelector("#hoy");

// FECHA INICIAL
const hoy = new Date();

let fechaSeleccionada = new Date(
    hoy.getFullYear(),
    hoy.getMonth(),
    1
);

// Formatear una fecha como AAAA-MM-DD
function fechaClave(fecha) {
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    return `${año}-${mes}-${dia}`;
}


// Convertir una fecha DD/MM/AAAA en un objeto Date
function convertirFecha(fechaTexto) {

    const [dia, mes, año] = fechaTexto.split("/");

    return new Date(
        Number(año),
        Number(mes) - 1,
        Number(dia)
    );
}


// Datos de prueba
const eventos = [
    {
        id: 1,
        tipo: "reserva",
        codigo: "R-001",
        fecha: fechaClave(hoy),

        inmueble: {
            nombre: "Edificio Mar",
            numero: "Apartamento 01",
            ubicacion: "Badalona, España"
        },

        entrada: "20/11/2026",
        salida: "23/11/2026",
        hora: "11:00",
        estado: "Confirmada"
    },

    {
        fecha: "2026-11-23",

        inmueble: {
            nombre: "Edificio Mar",
            numero: "Apartamento 01",
            ubicacion: "Badalona, España"
        },

        hora: "12:00",
        empleado: "Clara",
        estado: "Pendiente"
    },

    {
        id: 3,
        tipo: "reserva",
        codigo: "R-002",
        fecha: fechaClave(new Date(
            hoy.getFullYear(),
            hoy.getMonth(),
            hoy.getDate() + 1
        )),

        inmueble: {
            nombre: "Residencial Sol",
            numero: "Apartamento 02",
            ubicacion: "Badalona, España"
        },

        entrada: "23/11/2026",
        salida: "24/11/2026",
        hora: "10:00",
        estado: "Confirmada"
    },
    
    {
    id: 4,
    tipo: "reserva",
    codigo: "R-004",
    fecha: fechaClave(hoy),

    inmueble: {
        nombre: "Edificio Luna",
        numero: "Apartamento 03",
        ubicacion: "Badalona, España"
    },

    entrada: "24/11/2026",
    salida: "26/11/2026",
    hora: "13:00",
    estado: "Confirmada"
},

{
    fecha: "2026-11-24",

    inmueble: {
        nombre: "Residencial Sol",
        numero: "Apartamento 02",
        ubicacion: "Badalona, España"
    },

    hora: "15:00",
    empleado: "Rosa",
    estado: "Pendiente"
},
];

function generarCalendario(){

    // Obtenemos el año y el mes
    const año = fechaSeleccionada.getFullYear();
    const mes = fechaSeleccionada.getMonth();

    // Mostramos el nombre del mes y el año
    const nombreMes = new Intl.DateTimeFormat("es-ES", {
        month: "long",
        year: "numeric"
    }).format(fechaSeleccionada);

    fechaActual.textContent =
        nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);

    // Obtenemos el primer día del mes
    const primerDia = new Date(año, mes, 1);

    // Obtenemos la cantidad de días del mes
    const cantidadDias = new Date(año, mes + 1, 0).getDate();

    // Ajustamos la semana para comenzar el lunes
    const espacioInicial = (primerDia.getDay() + 6) % 7;

    // Limpiamos el calendario
    calendario.innerHTML = "";

    // Nombres de los días
    const diasSemana = [
        "Lun", "Mar", "Mié", "Jue",
        "Vie", "Sáb", "Dom"
    ];

    // Creamos los encabezados
    diasSemana.forEach(dia => {

        const encabezado = document.createElement("div");

        encabezado.classList.add("dia-semana");

        encabezado.textContent = dia;

        calendario.appendChild(encabezado);

    });

    // Creamos los espacios vacíos
    for(let i = 0; i < espacioInicial; i++){

        const espacio = document.createElement("div");

        espacio.classList.add("dia-vacio");

        calendario.appendChild(espacio);

    }

    // Creamos los días del mes
    for(let dia = 1; dia <= cantidadDias; dia++){

        const casilla = document.createElement("div");

        casilla.classList.add("dia");

        const numeroDia = document.createElement("div");
        numeroDia.classList.add("dia-numero");
        numeroDia.textContent = dia;

casilla.appendChild(numeroDia);

        // Identificamos el día actual
        if(
            dia === hoy.getDate() &&
            mes === hoy.getMonth() &&
            año === hoy.getFullYear()
        ){

            casilla.classList.add("dia-hoy");

        }
        mostrarEventos(casilla, new Date(año, mes, dia));
        calendario.appendChild(casilla);

    }

}
//* BOTÓN ANTERIOR *

anterior.addEventListener("click", () => {

    if(tipoVista === "mensual"){

        fechaSeleccionada.setMonth(
            fechaSeleccionada.getMonth() - 1
        );

        generarCalendario();

    } else {

        fechaSeleccionada.setDate(
            fechaSeleccionada.getDate() - 7
        );

        generarVistaSemanal();

    }

});


//* BOTÓN SIGUIENTE *

siguiente.addEventListener("click", () => {

    if(tipoVista === "mensual"){

        fechaSeleccionada.setMonth(
            fechaSeleccionada.getMonth() + 1
        );

        generarCalendario();

    } else {

        fechaSeleccionada.setDate(
            fechaSeleccionada.getDate() + 7
        );

        generarVistaSemanal();

    }

});

//* BOTÓN HOY *

botonHoy.addEventListener("click", () => {

    fechaSeleccionada = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        hoy.getDate()
    );

    if(tipoVista === "mensual"){

        generarCalendario();

    } else if(tipoVista === "semanal"){

        generarVistaSemanal();

    }

});


// BOTONES DE VISTA
const vistaMensual = document.querySelector("#vista-mensual");
const vistaSemanal = document.querySelector("#vista-semanal");

// VISTA ACTUAL
let tipoVista = "mensual";
// OBTENER LOS DÍAS DE LA SEMANA

function obtenerInicioSemana(fecha){

    const inicio = new Date(fecha);

    const diaSemana = inicio.getDay();

    const diferencia = (diaSemana + 6) % 7;

    inicio.setDate(inicio.getDate() - diferencia);

    return inicio;
}

/* =================================
   DATOS PARA GENERAR EL REPORTE PDF
================================= */

export function obtenerDatosReporte() {

    return {
        eventos,
        tipoVista,
        fechaSeleccionada: new Date(fechaSeleccionada),
        obtenerInicioSemana
    };

}

function generarVistaSemanal(){

    // Obtenemos el lunes de la semana seleccionada
    const inicioSemana = obtenerInicioSemana(fechaSeleccionada);

    // Limpiamos el calendario
    calendario.innerHTML = "";

    // Nombres de los días
    const diasSemana = [
        "Lun", "Mar", "Mié", "Jue",
        "Vie", "Sáb", "Dom"
    ];

    // Generamos los siete días
    for(let i = 0; i < 7; i++){

        // Calculamos la fecha correspondiente
        const fecha = new Date(inicioSemana);

        fecha.setDate(inicioSemana.getDate() + i);

        // Creamos la casilla
        const casilla = document.createElement("div");

        casilla.classList.add("dia");

        // Creamos el encabezado del día
        const encabezado = document.createElement("div");

        encabezado.classList.add("dia-semana");

        encabezado.textContent =
            diasSemana[i] + " " + fecha.getDate();

        casilla.appendChild(encabezado);

        // Identificamos el día actual
        if(
            fecha.getDate() === hoy.getDate() &&
            fecha.getMonth() === hoy.getMonth() &&
            fecha.getFullYear() === hoy.getFullYear()
        ){

            casilla.classList.add("dia-hoy");

        }

        mostrarEventos(casilla, fecha);

        calendario.appendChild(casilla);

    }

    // Mostramos el rango de la semana
    const finSemana = new Date(inicioSemana);

    finSemana.setDate(inicioSemana.getDate() + 6);

    const formatoFecha = new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long"
    });

    fechaActual.textContent =
        formatoFecha.format(inicioSemana) +
        " - " +
        formatoFecha.format(finSemana);

}

//* CAMBIAR ENTRE VISTAS *

function cambiarVista(vista){

    tipoVista = vista;

    if(tipoVista === "mensual"){

        calendario.classList.remove("vista-semanal");

        vistaMensual.classList.add("vista-activa");
        vistaSemanal.classList.remove("vista-activa");

        generarCalendario();

    } else {

        calendario.classList.add("vista-semanal");

        vistaSemanal.classList.add("vista-activa");
        vistaMensual.classList.remove("vista-activa");

        generarVistaSemanal();

    }

}

//* EVENTOS DE LOS BOTONES DE VISTA *

vistaMensual.addEventListener("click", () => {
    cambiarVista("mensual");
});

vistaSemanal.addEventListener("click", () => {
    cambiarVista("semanal");
});

//ventana modal para el "ver más"
function mostrarEventos(casilla, fecha) {

    const fechaBuscada = fechaClave(fecha);

    
const eventosDelDia = eventos.filter(evento => {

    // No mostrar reservas canceladas
    if (evento.estado === "Cancelada") {
        return false;
    }

    // Comprobar si la fecha está dentro de la estadía
    if (evento.tipo === "reserva") {

        const entrada = convertirFecha(evento.entrada);
        const salida = convertirFecha(evento.salida);

        const fechaActual = new Date(
            fecha.getFullYear(),
            fecha.getMonth(),
            fecha.getDate()
        );

        return fechaActual >= entrada && fechaActual <= salida;
    }

    // Las limpiezas aparecen en su fecha asignada
    return evento.fecha === fechaBuscada;

});


    const contenedor = document.createElement("div");
    contenedor.classList.add("dia-eventos");

    // Mostramos solamente los primeros 3 eventos
    const eventosVisibles = eventosDelDia.slice(0, 3);

    eventosVisibles.forEach(evento => {

        const elemento = document.createElement("div");

        elemento.classList.add("evento");
        elemento.classList.add(`evento-${evento.tipo}`);

        const titulo = document.createElement("strong");

        titulo.textContent =
            evento.tipo === "reserva" ? "Reserva" : "Limpieza";

        const propiedad = document.createElement("small");

        propiedad.textContent =
            `${evento.inmueble.nombre} - ${evento.inmueble.numero}`;

        const ubicacion = document.createElement("small");

        ubicacion.textContent = evento.inmueble.ubicacion;

        const hora = document.createElement("small");

        hora.textContent = evento.hora;

        elemento.appendChild(titulo);
        elemento.appendChild(propiedad);
        elemento.appendChild(ubicacion);
        elemento.appendChild(hora);

        elemento.style.cursor = "pointer";

        elemento.addEventListener("click", () => {
            abrirModal(evento);
        });

        contenedor.appendChild(elemento);

    });

    // Comprobamos si existen más de 3 eventos
    if (eventosDelDia.length > 3) {

        const botonVerMas = document.createElement("button");

        botonVerMas.type = "button";

        botonVerMas.classList.add("ver-mas-eventos");

        botonVerMas.textContent =
            `+ ${eventosDelDia.length - 3} eventos más`;

        botonVerMas.addEventListener("click", () => {
            abrirListaEventos(fecha, eventosDelDia);
        });

        contenedor.appendChild(botonVerMas);

    }

    casilla.appendChild(contenedor);

}

// GENERAR CALENDARIO INICIAL
generarCalendario();

