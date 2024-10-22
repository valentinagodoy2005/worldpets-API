document.addEventListener('DOMContentLoaded', function() {
    const productosContainer = document.getElementById('productos-container');
    // Función para obtener productos
    function obtenerProductos() {
        fetch('productos.json')
            .then(response => response.json())
            .then(data => {
                mostrarProductos(data);
            })
    }

    // Función para mostrar productos en la página
    function mostrarProductos(productos) {
        productosContainer.innerHTML = '';
        productos.forEach(producto => {
            const productoElement = document.createElement('div');
            productoElement.className = 'product';
            productoElement.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h4>${producto.nombre}</h4>
                <p>$${producto.precio.toFixed(2)}</p>
                <p>${producto.descripcion}</p>
                <button>Agregar al Carrito</button>
            `;
            productosContainer.appendChild(productoElement);
        });
    }

    // Cargar productos cuando la página esté lista
    obtenerProductos();
});
