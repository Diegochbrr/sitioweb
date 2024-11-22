// Función para mostrar una sección específica con animación
function mostrarSeccion(id) {
    const secciones = document.querySelectorAll('.seccion');
    
    secciones.forEach(seccion => {
        if (seccion.classList.contains('activa')) {
            seccion.classList.add('animate__animated', 'animate__bounceOutRight');
            seccion.addEventListener('animationend', () => {
                seccion.classList.remove('activa', 'animate__animated', 'animate__bounceOutRight');
                const nuevaSeccion = document.getElementById(id);
                nuevaSeccion.classList.add('activa', 'animate__animated', 'animate__bounceInRight'); // Aquí cambiamos a animate__bounceInRight
            }, { once: true });
        }
    });

    if (!document.querySelector('.seccion.activa')) {
        const nuevaSeccion = document.getElementById(id);
        nuevaSeccion.classList.add('activa', 'animate__animated', 'animate__bounceInRight');
    }
}

// Función para mostrar el mensaje de reserva
function mostrarMensaje() {
    alert("¡Gracias por tu interés en Fosforízate! Reserva tu mesa y disfruta del sabor del mar.");
}

// Carrusel de imágenes
let indiceImagen = 0;
function cambiarImagen(direccion) {
    const imagenes = document.querySelectorAll('.carousel img');
    imagenes[indiceImagen].classList.remove('imagen-activa');
    indiceImagen = (indiceImagen + direccion + imagenes.length) % imagenes.length;
    imagenes[indiceImagen].classList.add('imagen-activa');
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.carousel img').classList.add('imagen-activa');
});

// Contador regresivo para la promoción
function iniciarContador() {
    const fechaLimite = new Date('2024-12-31T23:59:59').getTime(); // Fecha límite de la promoción
    const contador = document.getElementById('contador');

    setInterval(function() {
        const ahora = new Date().getTime();
        const tiempoRestante = fechaLimite - ahora;

        if (tiempoRestante <= 0) {
            contador.innerHTML = "¡La promoción ha terminado!";
        } else {
            const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
            const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);
            contador.innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
        }
    }, 1000);
}

// Llamada para iniciar el contador
iniciarContador();

// Inicialización del mapa de ubicación
function initMap() {
    const ubicacion = { lat: 10.9685, lng: -74.7813 }; // Coordenadas de ejemplo (Barranquilla)
    const mapa = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 15,
        center: ubicacion
    });
    const marcador = new google.maps.Marker({
        position: ubicacion,
        map: mapa,
        title: 'Fosforízate Restaurante'
    });
}

// Cargar el mapa de Google
window.initMap = initMap;

// Función para reservar mesa
function mostrarReserva() {
    const mesas = [
        { id: 1, disponible: true },
        { id: 2, disponible: false },
        { id: 3, disponible: true },
        { id: 4, disponible: false },
        { id: 5, disponible: true },
        { id: 6, disponible: true }
    ];

    let mensaje = 'Selecciona tu mesa:\n';

    mesas.forEach(mesa => {
        mensaje += `Mesa ${mesa.id}: ${mesa.disponible ? 'Disponible' : 'No Disponible'}\n`;
    });

    const mesaSeleccionada = prompt(mensaje);

    if (mesaSeleccionada) {
        const mesa = mesas.find(m => m.id == mesaSeleccionada);
        if (mesa && mesa.disponible) {
            alert(`¡Has reservado la mesa ${mesaSeleccionada}!`);
        } else {
            alert('Lo siento, esa mesa no está disponible.');
        }
    }
}

// Lógica del Carrito de Compras
let carrito = [];

function actualizarCarrito() {
    const carritoList = document.getElementById('lista-carrito');
    const total = document.getElementById('total');
    carritoList.innerHTML = '';

    let totalPrecio = 0;
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio.toLocaleString()} COP`;
        carritoList.appendChild(li);
        totalPrecio += item.precio;
    });

    total.textContent = `Total: $${totalPrecio.toLocaleString()} COP`;
}

document.querySelectorAll('.agregar-carrito').forEach(boton => {
    boton.addEventListener('click', (e) => {
        const nombre = e.target.getAttribute('data-plato');
        const precio = parseInt(e.target.getAttribute('data-precio'));
        carrito.push({ nombre, precio });
        actualizarCarrito();
    });
});

document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});

// Función para hacer pedido
document.getElementById('hacer-pedido').addEventListener('click', hacerPedido);

function hacerPedido() {
    const nombre = prompt('Por favor, ingresa tu nombre para hacer el pedido');
    if (nombre) {
        alert(`Gracias ${nombre}! Tu pedido ha sido recibido.`);
        carrito = []; // Vaciar el carrito
        actualizarCarrito(); // Actualizar la vista del carrito
    }
}

