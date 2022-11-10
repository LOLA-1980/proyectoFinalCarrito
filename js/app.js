//Todos los elementos del DOM que voy a necesitar para crear las tarjetas de productos
const contTarjetas = document.getElementById('tarjetas');

//---------FETCH-----------
document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch('productos.json')
        const data = await res.json()
        //console.log(data)
        mostrarInfoMascota(data);
        addToCarritoItem(data);
    } catch (error) {
        console.log(error)
    }
}


//Creo HTML dinámico para mostrar la información de los productos para mascotas a partir del array fake DB
function mostrarInfoMascota(data) {
    contTarjetas.innerHTML = ''
    data.forEach(element => {
        let html = `<div class="col d-flex justify-content-center mb-4">
        <div class="card shadow mb-1 rounded" style="width: 20rem;">
            <h5 class="card-title pt-2 text-center text-primary">${element.titulo}</h5>
            <img src="${element.img}" class="card-img-top" alt="${element.alt}">
            <div class="card-body">
                <p class="card-text text-white-50 description">${element.descripcion}</p>
                <h5 class="text-primary">Precio: <span class="precio">${element.precio}</span></h5>
                <div class="d-grid gap-2">
                    <button class="btn btn-primary button" onclick="addToCarritoItem(${element.id})">Añadir a Carrito</button>
                </div>
            </div>
        </div>
        </div>`;
        contTarjetas.innerHTML += html;
    });

}


//-------CARRITO DE COMPRAS-------------
const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(data) {//2
    let producto = data.find(item => item.id === id);
    console.log(producto);
    //addItemCarrito(producto)
}

/*function addToCarritoItem(data) {
    const Clickbutton = document.querySelectorAll('.button')
    //console.log(Clickbutton);
    Clickbutton.forEach(btn => {
        btn.addEventListener('click', addToCarritoItem => {
            console.log(btn.id)
        })

    })
}*/



/*function addItemCarrito(newItem) {
    carrito.push(newItem);
    console.log(carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    //renderCarrito()

}*/


/*function renderCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    console.log(carrito);
    const tabla_carrito = document.getElementById("tabla_carrito");
    tabla_carrito.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')

        tr.classList.add('ItemCarrito')

        const content = `
        <th scope="row">${item.id}</th>
        <td class="tabla__productos">
            <img src=${item.img} alt="">
            <h6 class="title">${item.titulo}</h6>
        </td>
        <td class="tabla__price">
            <p>${item.precio}</p>
        </td>
        <td class="tabla__cantidad">
            <input class="input__elemento" type="number" min="1" value=${item.cantidad}>
            <button class="delete btn btn-danger">x</button>
        </td>
    `
        tr.innerHTML = content;
        tabla_carrito.append(tr)
    })

    document.getElementById("total_carrito").innerHTML = "$" + precioTotal();
    //precioTotal()
}

function precioTotal() {
    let carritos = JSON.parse(localStorage.getItem("carrito"));


    let carr = (carritos.reduce((total, item) => (total += item.precio, 0)));
    return carr

}*/



















/*function addToCarritoItem(e) {
    const button = e.target
    const item = button('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newItem)
}


function addItemCarrito(newItem) {

    const alert = document.querySelector('.alert')

    setTimeout(function () {
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')

    const InputElemento = tbody.getElementsByClassName('input__elemento')
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === newItem.title.trim()) {
            carrito[i].cantidad++;
            const inputValue = InputElemento[i]
            inputValue.value++;
            CarritoTotal()
            return null;
        }
    }

    carrito.push(newItem)

    renderCarrito()
}


function renderCarrito() {
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('ItemCarrito')
        const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
        tr.innerHTML = Content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()
}

function CarritoTotal() {
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio * item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()
}

function removeItemCarrito(e) {
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for (let i = 0; i < carrito.length; i++) {

        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }

    const alert = document.querySelector('.remove')

    setTimeout(function () {
        alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')

    tr.remove()
    CarritoTotal()
}

function sumaCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
        if (item.title.trim() === title) {
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            CarritoTotal()
        }
    })
}

function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if (storage) {
        carrito = storage;
        renderCarrito()
    }
}*/