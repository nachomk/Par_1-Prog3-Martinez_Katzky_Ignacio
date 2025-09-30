const productos = [
    {id:1, nombre:"Anana", precio: 15, img: "/img/anana.jpg"},
    {id:2, nombre:"Arandano", precio: 35, img: "/img/arandano.jpg"},
    {id:3, nombre:"Banana", precio: 25, img: "/img/banana.jpg"},
    {id:4, nombre:"Frambuesa", precio: 5, img: "/img/frambuesa.png"},
    {id:5, nombre:"Frutilla", precio: 5, img: "/img/frutilla.jpg"},
    {id:6, nombre:"Kiwi", precio: 98, img: "/img/kiwi.jpg"},
    {id:7, nombre:"Mandarina", precio: 15, img: "/img/mandarina.jpg"},
    {id:8, nombre:"Manzana", precio: 35, img: "/img/manzana.jpg"},
    {id:9, nombre:"Pera", precio: 25, img: "/img/pera.jpg"},
    {id:10, nombre:"Pomelo Amarillo", precio: 5, img: "/img/pomelo-amarillo.jpg"},
    {id:11, nombre:"Pomelo Rojo", precio: 50, img: "/img/pomelo-rojo.jpg"},
    {id:12, nombre:"Sandia", precio: 15, img: "/img/sandia.jpg"}
];

const datosAlumno = {
    dni: 45128499, 
    nombre: "Ignacio",
    apellido: "Martinez Katzky" 
}

// variables de acceso al dom y datos totales finales
let carrito = [];
let htmlCarrito = "";
let precioTotal = 0;

// getters de elementos en cart.html
const barraBusqueda = document.getElementById("barra-busqueda");
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("contenedor-carrito");
const contenedorDatosAlumno = document.getElementById("datos-alumno");
const carritosDatos = document.getElementById("carritos-datos");



// escuchador de eventos
barraBusqueda.addEventListener("input", filtrarProducto)

// funcion que creara una card para cada uno de los productos que hay en el array de productos
function mostrarLista(array) {
    let htmlProductos = "";
    array.forEach(producto=>{ 
        htmlProductos += `
        <div class="card-producto">
            <img src="${producto.img}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}$</p>
            <button onclick="agregarACarrito(${producto.id})">Agregar al carrito</button>
        </div>
        `
    })
    contenedorProductos.innerHTML = htmlProductos;
}

// funcion para buscar productos especificos en el input de busqueda
function filtrarProducto() {
    let valorBusqueda = barraBusqueda.value.toLowerCase();

    let productosFiltrados = productos.filter(producto => {
        return producto.nombre.toLowerCase().includes(valorBusqueda)
    })


    mostrarLista(productosFiltrados);
}

// funcion para agregar un elemento al carrito
function agregarACarrito(idProducto) {
    carrito.push(productos.find(producto => producto.id == idProducto));
    mostrarCarrito();
    actualizarCarrito();
}

// funcion que enlistara los productos agregados al carrito
function mostrarCarrito(){
    console.log("Productos en el carrito debajo")
    console.log(carrito)
    precioTotal = carrito.reduce((acc, producto) => acc + producto.precio, 0)
    htmlCarrito = "<ul>";
       carrito.forEach( (producto, index) => {
        htmlCarrito += 
        `
        <li class="bloque-item">
            <p class="nombre-item">${producto.nombre} - ${producto.precio}</p>
            <button class="boton-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar Producto</button>
        </li>   
        `;
    })
    htmlCarrito += 
    `
        </ul>
        <div style="display: flex; align-items: center; justify-content: space-between;"> 
            <button id="vaciar-carrito" onclick="vaciarCarrito()">Vaciar carrito</button>
            <p style="font-weight: 700; font-size: 1.2rem;"> Total: $${precioTotal} </p>
        </div>
    `;
    if (carritosDatos) {
        carritosDatos.textContent = `Carrito: ${carrito.length} productos.`;
    }
    contenedorCarrito.innerHTML = htmlCarrito;
}

// funcion que eliminara un producto seleccionado (en caso de que se quisiera) de la lista del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
    actualizarCarrito();
}

// funcion para vaciar todo el carrito (sin importar la cantidad de productos dentro del mismo)
function vaciarCarrito(){
    carrito = [];
    mostrarCarrito();
    vaciarCarritoLocalStorage();
}

// para mantener los elementos siempre, esta funcion los guarda en el localStorage para que en caso de cerrase la pestaña o algun caso parecido, se guardara los datos del carrito
function cargarCarrito() {
    let textoCarritoLeido = localStorage.getItem("carrito");

    if (!textoCarritoLeido) {
        mostrarCarrito();
    } else {
        console.log("SE INTENTA PARSEAR EL CARRITO");
        carrito = JSON.parse(textoCarritoLeido);
        mostrarCarrito();
    }
}

// funcion que actualiza el estado del carrito
function actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// funcion para vaciar la variable de carrito dentro del localStorage
function vaciarCarritoLocalStorage() {
    localStorage.removeItem("carrito");
}

// funcion de inicializacion para la aplicacion
function init() {
    mostrarLista(productos);
    mostrarCarrito();
    cargarCarrito();
    cargarDatosAlumno();
}

function cargarDatosAlumno() {
    console.log("DATOS DEL ALUMNO")
    console.log(datosAlumno)
    let datosAlumnoHTML = '';
    datosAlumnoHTML += `
        <p>${datosAlumno.nombre} ${datosAlumno.apellido}</p>
    `
    contenedorDatosAlumno.innerHTML = datosAlumnoHTML;
}

init()