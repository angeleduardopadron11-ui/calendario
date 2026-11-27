export function iniciarMenu() {

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

}
