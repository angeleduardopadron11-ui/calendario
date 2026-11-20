const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");


if (abrir && cerrar && nav) {
  // Abre el menú
    abrir.addEventListener("click", () => {
    nav.classList.add("nav-visible");
    });

  // Cierra el menú
    cerrar.addEventListener("click", () => {
    nav.classList.remove("nav-visible");
    });
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

        casilla.textContent = dia;

        // Identificamos el día actual
        if(
            dia === hoy.getDate() &&
            mes === hoy.getMonth() &&
            año === hoy.getFullYear()
        ){

            casilla.classList.add("dia-hoy");

        }

        calendario.appendChild(casilla);

    }

}

 // BOTÓN MES ANTERIOR
anterior.addEventListener("click", () => {

    fechaSeleccionada.setMonth(
        fechaSeleccionada.getMonth() - 1
    );

    generarCalendario();

});


// BOTÓN MES SIGUIENTE
siguiente.addEventListener("click", () => {

    fechaSeleccionada.setMonth(
        fechaSeleccionada.getMonth() + 1
    );

    generarCalendario();

});


// BOTÓN HOY
botonHoy.addEventListener("click", () => {

    fechaSeleccionada = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        1
    );

    generarCalendario();

});


// GENERAR CALENDARIO INICIAL
generarCalendario();
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

