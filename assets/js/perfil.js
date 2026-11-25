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


// Seleccionar elementos del modal
const modalContrasena = document.querySelector("#modal-contrasena");
const abrirModalContrasena = document.querySelector("#cambiar-contrasena");
const cerrarModalContrasena = document.querySelector("#cerrar-modal-contrasena");

// Abrir modal
if (modalContrasena && abrirModalContrasena && cerrarModalContrasena) {

    abrirModalContrasena.addEventListener("click", () => {
        modalContrasena.showModal();
    });

    // Cerrar modal
    cerrarModalContrasena.addEventListener("click", () => {
        modalContrasena.close();
    });

}

//envia una nota si las contraseñas no coinciden
// Seleccionar elementos del formulario
const formularioContrasena = document.querySelector("#form-contrasena");
const contrasenaNueva = document.querySelector("#contrasena-nueva");
const confirmarContrasena = document.querySelector("#confirmar-contrasena");
const mensajeContrasena = document.querySelector("#mensaje-contrasena");

// Validar que las contraseñas coincidan
if (formularioContrasena) {

    formularioContrasena.addEventListener("submit", (evento) => {

        evento.preventDefault();

        if (contrasenaNueva.value !== confirmarContrasena.value) {

            mensajeContrasena.textContent = "Las contraseñas no coinciden.";
            mensajeContrasena.style.color = "#B42318";

            return;
        }

        mensajeContrasena.textContent = "Las contraseñas coinciden.";
        mensajeContrasena.style.color = "#287A43";

    });

}