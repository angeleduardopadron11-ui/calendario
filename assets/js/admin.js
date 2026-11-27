/* =================================
   ARCHIVO PRINCIPAL DEL ADMINISTRADOR
================================= */

// Importar módulos
import { iniciarMenu } from "./menu.js";

import { iniciarModales } from "./modales.js";

import {
    obtenerDatosReporte,
    conectarModales
} from "./calendario.js";

import { iniciarPDF } from "./pdf.js";


// Iniciar menú
iniciarMenu();

// Iniciar ventanas modales
const { abrirModal, abrirListaEventos } = iniciarModales();

// Conectar modales con el calendario
conectarModales({
    abrirModal,
    abrirListaEventos
});

// Iniciar generación de PDF
iniciarPDF(obtenerDatosReporte);