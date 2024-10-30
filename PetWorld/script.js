document.addEventListener('DOMContentLoaded', function() { 
    const productosContainer = document.getElementById('productos-container');

    function obtenerProductos() {
        fetch('productos.json')
            .then(response => response.json())
            .then(data => {
                mostrarProductos(data);
            });
    }

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
                <button onclick="addToCart('${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
            `;
            productosContainer.appendChild(productoElement);
        });
    }

    obtenerProductos();
});


document.addEventListener('DOMContentLoaded', function() {
    const productosContainer = document.getElementById('productos-container');

    // Función para obtener productos
    function obtenerProductos() {
        fetch('productos.json')
            .then(response => response.json())
            .then(data => {
                mostrarProductos(data);
            });
    }

    // Función para mostrar productos en la página
    function mostrarProductos(productos) {
        productosContainer.innerHTML = '';
        productos.forEach((producto, index) => {
            const productoElement = document.createElement('div');
            productoElement.className = 'product';
            productoElement.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h4>${producto.nombre}</h4>
                <p>$${producto.precio.toFixed(2)}</p>
                <p>${producto.descripcion}</p>
                <button onclick="addToCart('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
            `;
            productosContainer.appendChild(productoElement);
        });
    }

    // Cargar productos cuando la página esté lista
    obtenerProductos();
});




// Carrito
let cart = [];

// Función para agregar productos al carrito
function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice += productPrice;
    } else {
        const newProduct = { name: productName, price: productPrice, quantity: 1, totalPrice: productPrice };
        cart.push(newProduct);
    }

    // Actualizar contador de productos en el icono
    updateCartCount();

    // Mostrar los productos en el carrito
    renderCart();
}

// Resto de las funciones del carrito
function incrementQuantity(index) {
    cart[index].quantity += 1;
    cart[index].totalPrice += cart[index].price;
    renderCart();
}

function decrementQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        cart[index].totalPrice -= cart[index].price;
    } else {
        cart.splice(index, 1);
    }
    renderCart();
    updateCartCount();
}

function clearCart() {
    cart = [];
    renderCart();
    updateCartCount();
}

function buyProducts() {
    if (cart.length === 0) {
        alert("No tienes productos en el carrito.");
        return;
    }

    alert("¡Compra realizada con éxito!");
    clearCart();
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        total += item.totalPrice;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.name} - $${item.totalPrice.toFixed(2)} (x${item.quantity})</span>
            <div class="cart-quantity">
                <button onclick="decrementQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="incrementQuantity(${index})">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function toggleCart() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
}


// formulario de compra
function openForm() {
    document.getElementById("paymentForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("paymentForm").style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.querySelector("#paymentForm form");
    paymentForm.addEventListener("submit", processPurchase);
});

function processPurchase(event) {
    event.preventDefault();  // Evita el envío real del formulario
    alert("¡Compra realizada con éxito!");
    closeForm();
    clearCart();
}
