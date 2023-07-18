// Obtener las referencias a los elementos del formulario y la lista
var productForm = document.getElementById('productForm');
var cantidadInput = document.getElementById('cantidad');
var productoInput = document.getElementById('producto');
var valorInput = document.getElementById('valor');
var productosList = document.getElementById('productosList');

// Obtener los datos del LocalStorage (si existen)
var productos = JSON.parse(localStorage.getItem('productos')) || [];

// Función para mostrar los productos en la lista
function mostrarProductos() {
  productosList.innerHTML = '';

  // Recorrer los productos y crear los elementos de la lista
  productos.forEach(function(producto, index) {
    var li = document.createElement('li');
    li.className = 'list-group-item';

    var deleteBtn = document.createElement('span');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', function() {
      eliminarProducto(index);
    });

    li.innerHTML = `
      <strong> </strong>${index + 1}<br>
      <strong>Cantidad: </strong>${producto.cantidad}<br>
      <strong>Producto: </strong>${producto.producto}<br>
      <strong>Valor: </strong>${producto.valor}<br>
    `;

    li.appendChild(deleteBtn);
    productosList.appendChild(li);
  });
}

// Función para agregar un producto
function agregarProducto() {
  var cantidad = cantidadInput.value;
  var producto = productoInput.value;
  var valor = valorInput.value;

  // Crear el objeto de producto
  var nuevoProducto = {
    cantidad: cantidad,
    producto: producto,
    valor: valor
  };

  // Agregar el producto al arreglo
  productos.push(nuevoProducto);

  // Limpiar los campos del formulario
  cantidadInput.value = '';
  productoInput.value = '';
  valorInput.value = '';

  // Mostrar los productos actualizados
  mostrarProductos();

  // Guardar los datos en el LocalStorage
  guardarEnLocalStorage();
}

// Función para eliminar un producto
function eliminarProducto(index) {
  // Remover el producto del arreglo
  productos.splice(index, 1);

  // Mostrar los productos actualizados
  mostrarProductos();

  // Guardar los datos en el LocalStorage
  guardarEnLocalStorage();
}

// Función para guardar los datos en el LocalStorage
function guardarEnLocalStorage() {
  localStorage.setItem('productos', JSON.stringify(productos));
}

// Manejar el evento de envío del formulario
productForm.addEventListener('submit', function(event) {
  event.preventDefault();
  agregarProducto();
});

// Mostrar los productos al cargar la página
mostrarProductos();
