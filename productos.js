

// Fetch products from API
fetch('https://products-foniuhqsba-uc.a.run.app/TVs')
  .then((response) => response.json())
  .then((data) => {
    allProducts = data;
    renderProducts(data);
  })
  .catch((error) => console.error('Error al obtener los datos de la API:', error));

// Renderizar productos
function renderProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = ''; // Limpiar productos anteriores
  const template = document.getElementById("product-card-template");


  products.forEach((product) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("img").src = product.image || 'https://via.placeholder.com/150';
    clone.querySelector("h3").textContent = product.title || 'Producto sin título';
    clone.querySelector("p.text-sm").textContent = `Lanzado: ${product.date || 'N/A'}`;
    clone.querySelector(".text-yellow-500 + span").textContent = product.rating || 'N/A';
    clone.querySelector("p.text-blue-600").textContent = product.price || 'N/A';


    // Asignar evento para mostrar detalles
    clone.querySelector("button").addEventListener("click", () => {
      showProductDetail(product);
    });


    container.appendChild(clone);  
  });
}






// Mostrar detalles del producto
function showProductDetail(product) {
  document.getElementById("detail-image").src = product.image || 'https://via.placeholder.com/150';
  document.getElementById("detail-title").textContent = product.title || 'Producto sin título';
  document.getElementById("detail-description").textContent = product.description || 'Sin descripción disponible.';
  document.getElementById("detail-price").textContent = product.price || 'N/A';


  const featuresList = document.getElementById("detail-features");
  featuresList.innerHTML = '';
  (product.features || []).forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = `${feature.type}: ${feature.value}`;
    featuresList.appendChild(li);
  });


  document.getElementById("product-detail").classList.remove("hidden");
  document.getElementById("product-container").classList.add("hidden");
}


// Volver al catálogo
document.getElementById("back-to-catalog").addEventListener("click", () => {
  document.getElementById("product-container").classList.remove("hidden");
  document.getElementById("product-detail").classList.add("hidden");
});


// Toggle Cart
function toggleCart() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.classList.toggle("hidden");
}


// Actualizar el carrito
function addToCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const totalPrice = document.getElementById("total-price");


  const productDetail = document.getElementById("detail-title").textContent;
  const productPrice = parseFloat(document.getElementById("detail-price").textContent.replace('$', ''));


  const li = document.createElement("li");
  li.textContent = productDetail + ' - $' + productPrice;
  //eliminar
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Eliminar";
  removeBtn.className = "ml-4 text-red-600 underline cursor-pointer";
  removeBtn.addEventListener("click", () => {
    const currentTotal = parseFloat(totalPrice.textContent.replace('$', ''));
    totalPrice.textContent = `$${(currentTotal - productPrice).toFixed(2)}`;
    cartItems.removeChild(li);
    cartCount.textContent = cartItems.children.length;
  });

  li.appendChild(removeBtn);
  cartItems.appendChild(li);


  cartCount.textContent = cartItems.children.length;
  const currentTotal = parseFloat(totalPrice.textContent.replace('$', ''));
  totalPrice.textContent = `$${(currentTotal + productPrice).toFixed(2)}`;
}

function checkout() {
 
  alert('La compra ha sido realizada con éxito.');
  document.getElementById("cart-items").innerHTML = '';
  document.getElementById("cart-count").textContent = '0';
  document.getElementById("total-price").textContent = '$0.00';
}

function searchProducts() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );
  renderProducts(filteredProducts);
}

function notificacion () {
  alert('No hay notificaciones nuevas');
}
