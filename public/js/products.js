//NAVBAR
const linkProducts = document.getElementById('products-link-button');
const linkChat = document.getElementById('chat-link-button');
const outAccount = document.getElementById('out-account');
const selectSignInButton = document.getElementById('nav-signin');
const selectSignUpButton = document.getElementById('nav-signup');
const inAccount = document.getElementById('in-account');
const cartButton = document.getElementById('nav-cart');
const signOutButton = document.getElementById('nav-signout');
const loading = document.getElementById('loading-icon');

async function loadWebPage() {
    const cartLog = await fetch("http://localhost:8080/carrito/carritos");
    const cart = await cartLog.json();
    loading.classList.remove('d-none');
    setTimeout(async () => {
        loading.classList.add('d-none');
        outAccount.classList.add('d-none');
        inAccount.classList.remove('d-none');
        linkProducts.classList.remove('d-none');
        linkChat.classList.remove('d-none');
        if (!cart.length) {
            cartButton.classList.add('d-none');
        } else {
            cartButton.classList.remove('d-none');
        }
    }, 1000);
}

loadWebPage()

//Botón para Desconectarse de la sesión
signOutButton.addEventListener('click', async () => {
    const responseFetch = await fetch("http://localhost:8080/auth/sign-out", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    });
    if (responseFetch.status === 200) {
        window.location.replace("/");
    }
});

//Boton para linkear a la vista de productos
linkProducts.addEventListener('click', async () => {
    window.location.replace("/productos");
});

//Boton para linkear a la vista de chat
linkChat.addEventListener('click', async () => {
    window.location.replace("/chat");
});

//PRODUCTOS
const productsTable = document.getElementById('products-table');
const tableProducts = document.getElementById("tableProducts");

//crear carrito o añadir un producto al carrito si ya está creado
async function addProductToCart(id) {
    const cartLog = await fetch("http://localhost:8080/carrito/carritos");
    const cart = await cartLog.json();
    const productToAddLog = await fetch(`http://localhost:8080/productos/${id}`);
    let productToAdd = await productToAddLog.json();
    if (!cart.length) {
        productToAdd = { ...productToAdd, quantity: 1 };
        console.log('se agrega el producto: ', productToAdd);
        let responseFetch = await fetch("http://localhost:8080/carrito", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        const newCart = await responseFetch.json();
        alert(`Se crea nuevo carrito con el Id: ${newCart}`);
        const dataJSON = JSON.stringify(productToAdd);
        let addProductFetch = await fetch(`http://localhost:8080/carrito/${newCart}`, {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataJSON.length
            },
            method: 'POST',
            body: dataJSON
        });
        if (addProductFetch.status === 200) {
            cartButton.classList.remove('d-none');
        }
    } else {
        const cartLog = await fetch("http://localhost:8080/carrito/carritos");
        const cart = await cartLog.json();
        let productIndex = cart[0].products.findIndex(prod => prod._id === productToAdd._id);
        if (productIndex !== -1) {
            cart[0].products[productIndex].quantity += 1;
            productToAdd = cart[0].products[productIndex];
            const dataJSON = JSON.stringify(productToAdd);
            await fetch(`http://localhost:8080/carrito/${cart[0]._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': dataJSON.length
                },
                method: 'PUT',
                body: dataJSON
            });
        } else {
            productToAdd.quantity = 1;
            const dataJSON = JSON.stringify(productToAdd);
            await fetch(`http://localhost:8080/carrito/${cart[0]._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': dataJSON.length
                },
                method: 'POST',
                body: dataJSON
            });
        }
        alert(`Nuevo producto '${productToAdd.title}' agregado al carrito`);
    }
}

cartButton.addEventListener('click', async () => {
    window.location.replace("/carrito");
});