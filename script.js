document.addEventListener('DOMContentLoaded', () => {
    const botonesReservar = document.querySelectorAll('.boton-reservar');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarritoElement = document.getElementById('total-carrito');
    const finalizarReservaBtn = document.getElementById('finalizar-reserva-btn');
    const formularioReserva = document.getElementById('formulario-reserva');
    const productosReservaLista = document.getElementById('productos-reserva');
    const totalReservaElement = document.getElementById('total-reserva');
    const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
    const numeroReservaElement = document.getElementById('numero-reserva');
    const navCarrito = document.querySelector('nav a[href="#carrito"]');

    let carrito = [];

    function actualizarCarritoVisual() {
        listaCarrito.innerHTML = '';
        let total = 0;
        carrito.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.nombre} x ${item.cantidad} - S/ ${(item.precio * item.cantidad).toFixed(2)}`;
            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList.add('eliminar-item');
            botonEliminar.dataset.id = item.id;
            botonEliminar.addEventListener('click', eliminarDelCarrito);
            listItem.appendChild(botonEliminar);
            listaCarrito.appendChild(listItem);
            total += item.precio * item.cantidad;
        });
        totalCarritoElement.textContent = `Total: S/ ${total.toFixed(2)}`;
        navCarrito.textContent = `Carrito (${carrito.reduce((sum, item) => sum + item.cantidad, 0)})`;
        finalizarReservaBtn.disabled = carrito.length === 0;
    }

    function agregarAlCarrito(evento) {
        const boton = evento.target;
        const id = boton.dataset.id;
        const nombre = boton.dataset.nombre;
        const precio = parseFloat(boton.dataset.precio);
        const productoExistente = carrito.find(item => item.id === id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ id, nombre, precio, cantidad: 1 });
        }
        actualizarCarritoVisual();
    }

    function eliminarDelCarrito(evento) {
        const id = evento.target.dataset.id;
        carrito = carrito.filter(item => item.id !== id);
        actualizarCarritoVisual();
    }

    botonesReservar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    finalizarReservaBtn.addEventListener('click', () => {
        // Mostrar la sección de finalizar reserva
        document.getElementById('reservar').style.display = 'block';
        // Llenar el resumen del pedido
        productosReservaLista.innerHTML = '';
        let totalReserva = 0;
        carrito.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.nombre} x ${item.cantidad} - S/ ${(item.precio * item.cantidad).toFixed(2)}`;
            productosReservaLista.appendChild(listItem);
            totalReserva += item.precio * item.cantidad;
        });
        totalReservaElement.textContent = `Total a pagar: S/ ${totalReserva.toFixed(2)}`;
    });

    formularioReserva.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const horario = document.getElementById('horario').value;

        if (carrito.length > 0 && nombre && horario) {
            // Aquí se enviaría la información del carrito y del formulario al servidor
            // Para guardar la reserva en una base de datos.

            // Simulación de confirmación
            const numeroAleatorio = Math.floor(Math.random() * 10000);
            numeroReservaElement.textContent = numeroAleatorio;
            mensajeConfirmacion.style.display = 'block';
            formularioReserva.style.display = 'none';
            carrito = [];
            actualizarCarritoVisual();
            setTimeout(() => {
                mensajeConfirmacion.style.display = 'none';
                formularioReserva.style.display = 'block';
                formularioReserva.reset();
                document.getElementById('reservar').style.display = 'none';
            }, 5000);
        } else {
            alert('Por favor, añade productos al carrito y selecciona un horario.');
        }
    });

    // Ocultar la sección de finalizar reserva al cargar la página
    document.getElementById('reservar').style.display = 'none';

    // Inicializar el carrito visual
    actualizarCarritoVisual();
});