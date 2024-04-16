document.addEventListener('DOMContentLoaded', function () {
    const contenidoSections = document.querySelectorAll('.contenido');
    const buttons = document.querySelectorAll('.buttons-nosotros li a');
    const botonesAntSigs = document.querySelectorAll('.botones-ant-sig button');

    // Mostrar por defecto el contenido y botón activo
    contenidoSections[0].classList.add('active');
    buttons[0].parentElement.classList.add('active');

    // Función para mostrar la sección correspondiente al botón clicado
    function mostrarContenido(targetIndex) {
        // Oculta todos los contenidos y desactiva todos los botones
        contenidoSections.forEach(contenido => contenido.classList.remove('active'));
        buttons.forEach(boton => boton.parentElement.classList.remove('active'));

        // Muestra el contenido y activa el botón correspondiente al botón clicado
        contenidoSections[targetIndex].classList.add('active');
        buttons[targetIndex].parentElement.classList.add('active');
    }

    // Añadir oyentes de clic a los botones "Nosotros"
    buttons.forEach((button, index) => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetIndex = Array.from(contenidoSections).findIndex(section => section.id === targetId);
            mostrarContenido(targetIndex);
        });
    });

    // Añadir oyentes de clic a los botones "anterior" y "siguiente"
    botonesAntSigs.forEach(boton => {
        boton.addEventListener('click', function () {
            const currentSection = document.querySelector('.contenido.active');
            const indiceActual = Array.from(contenidoSections).indexOf(currentSection);
            let nuevoIndice;

            if (this.id.includes('anteriorBtn')) {
                nuevoIndice = (indiceActual - 1 + contenidoSections.length) % contenidoSections.length;
            } else if (this.id.includes('siguienteBtn')) {
                nuevoIndice = (indiceActual + 1) % contenidoSections.length;
            }

            mostrarContenido(nuevoIndice);
        });
    });

    // Función para mostrar la sección correspondiente al enlace clicado en el footer
    function mostrarSeccion(targetId) {
        // Oculta todos los contenidos
        contenidoSections.forEach(contenido => contenido.classList.remove('active'));

        // Muestra la sección correspondiente al enlace clicado
        const seccion = document.getElementById(targetId);
        if (seccion) {
            seccion.classList.add('active');
        }

        // Actualizar el botón activo correspondiente al enlace clicado
        const buttonIndex = Array.from(buttons).findIndex(button => button.getAttribute('href').substring(1) === targetId);
        if (buttonIndex !== -1) {
            buttons.forEach(boton => boton.parentElement.classList.remove('active'));
            buttons[buttonIndex].parentElement.classList.add('active');
        }
    }

    // Obtener el fragmento de la URL para activar la sección correspondiente
    const fragmentoURL = window.location.hash.substring(1);
    if (fragmentoURL) {
        mostrarSeccion(fragmentoURL);
    }

    // Añadir oyentes de clic a los enlaces del footer
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            // Redireccionar a la pestaña "Nosotros" y activar la sección correspondiente
            mostrarContenido(0); // Mostrar la pestaña "Nosotros"
            mostrarSeccion(targetId); // Activar la sección correspondiente
        });
    });
});
