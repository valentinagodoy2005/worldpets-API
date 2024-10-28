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

  // Variables para el carrito
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

      // Mostrar mensaje de éxito
      const message = document.getElementById('message');
      message.style.display = 'block';
      setTimeout(() => {
          message.style.display = 'none';
      }, 2000);

      // Actualizar contador de productos en el icono
      updateCartCount();

      // Mostrar los productos en el carrito
      renderCart();
  }

  // Función para incrementar la cantidad de un producto
  function incrementQuantity(index) {
      cart[index].quantity += 1;
      cart[index].totalPrice += cart[index].price;
      renderCart();
  }

  // Función para disminuir la cantidad de un producto
  function decrementQuantity(index) {
      if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
          cart[index].totalPrice -= cart[index].price;
      } else {
          cart.splice(index, 1);  // Eliminar el producto si la cantidad es 1
      }
      renderCart();
      updateCartCount();
  }

  // Función para eliminar todos los productos del carrito
  function clearCart() {
      cart = [];
      renderCart();
      updateCartCount();
  }

  // Función para realizar la compra
  function buyProducts() {
      if (cart.length === 0) {
          alert("No tienes productos en el carrito.");
          return;
      }

      alert("¡Compra realizada con éxito!");
      clearCart();  // Limpiar el carrito después de la compra
  }

  // Función para mostrar los productos en el carrito
  function renderCart() {
      const cartItemsContainer = document.getElementById('cart-items');
      cartItemsContainer.innerHTML = ''; // Limpiar contenido previo

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

  // Función para actualizar el contador de productos en el icono del carrito
  function updateCartCount() {
      const cartCount = document.getElementById('cart-count');
      cartCount.textContent = cart.length;
  }

  // Función para mostrar/ocultar el carrito
  function toggleCart() {
      const cartPopup = document.getElementById('cart-popup');
      cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
  }