const socket = io();

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
//LOGIN
const signinDiv = document.getElementById('signin-div');
const signinForm = document.getElementById('signin-form');
const emailSignin = document.getElementById('inputEmail');
const passwordSignin = document.getElementById('inputPassword');
//REGISTER
const signupDiv = document.getElementById('signup-div');
const signupForm = document.getElementById('signup-form');
const nameSignup = document.getElementById('inputName');
const lastnameSignup = document.getElementById('inputLastname');
const phoneSignup = document.getElementById('inputPhone');
const emailSignup = document.getElementById('inputEmail1');
const passwordSignup = document.getElementById('inputPassword1');
const passwordToCompare = document.getElementById('inputPassword2');
const errorMessage = document.getElementById('text-error-register');
let token;
//SECCIONES APP WEB
const indexSection = document.getElementById('index-section');
const productsSection = document.getElementById('products-section');
const chatSection = document.getElementById('chat-section');
const cartSection = document.getElementById('cart-section');
//PRODUCTOS
const productsTable = document.getElementById('products-table'); //Por ahora no se utiliza en nada
const tableProducts = document.getElementById("tableProducts");
//CARRITO
const cartDiv = document.getElementById('cart-div');
const cartProducts = document.getElementById('table-cart-products');
const buttonsCart = document.getElementById('buttons-cart');
const messageCart = document.getElementById('message-cart');
//CENTRO DE MENSAJES - CHAT
const message = document.getElementById("messages");
const formChat = document.getElementById("form");
const inputMessage = document.getElementById("msg_input");

//Carga de la página
async function loadWebPage() {
    token = localStorage.getItem('token');
    const userLog = await fetch("https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/users/me", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'GET',
    });

    loading.classList.remove('d-none');

    if (userLog.status === 200) {
        const user = await userLog.json();
        const cartLog = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/${user.email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Beared ${token}`
            },
            method: 'GET',
        });
        const cart = await cartLog.json();
        const productLog = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/productos`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Beared ${token}`
            },
            method: 'GET',
        });
        const products = await productLog.json();
        setTimeout(async () => {
            productsSection.classList.remove('d-none');
            products.forEach((prod) => {
                showProducts(prod);
            });
            indexSection.classList.add('d-none');
            chatSection.classList.add('d-none');
            cartSection.classList.add('d-none');
            loading.classList.add('d-none');
            signinDiv.classList.add('d-none');
            signupDiv.classList.add('d-none');
            outAccount.classList.add('d-none');
            inAccount.classList.remove('d-none');
            linkProducts.classList.remove('d-none');
            linkChat.classList.remove('d-none');
            if (!cart) {
                cartButton.classList.add('d-none');
            } else {
                cartButton.classList.remove('d-none');
                /*                 cart.products.forEach((prod) => {
                                    showProductsCart(prod);
                                });
                                addExtrasCart(); */
            }
        }, 1000);
    }
    else {
        setTimeout(() => {
            localStorage.removeItem('token');
            productsSection.classList.add('d-none');
            indexSection.classList.remove('d-none');
            chatSection.classList.add('d-none');
            cartSection.classList.add('d-none');
            loading.classList.add('d-none');
            signinDiv.classList.remove('d-none');
            signupDiv.classList.add('d-none');
            outAccount.classList.remove('d-none');
            inAccount.classList.add('d-none');
            linkProducts.classList.add('d-none');
            linkChat.classList.add('d-none');
        }, 1000);
    }
}

loadWebPage()

//Botón Login
selectSignInButton.addEventListener('click', async () => {
    signinDiv.classList.remove('d-none');
    signupDiv.classList.add('d-none');
})
//Botón Registro
selectSignUpButton.addEventListener('click', async () => {
    signupDiv.classList.remove('d-none');
    signinDiv.classList.add('d-none');
})
//Formulario Login
signinForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
        email: emailSignin.value,
        password: passwordSignin.value
    };
    const dataJSON = JSON.stringify(data);
    let responseFetch = await fetch("https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/auth/sign-in", {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataJSON.length
        },
        method: 'POST',
        body: dataJSON
    });
    if (responseFetch.status === 200) {
        const data = await responseFetch.json();
        const token = data.token;
        localStorage.setItem('token', token);
        const userLog = await fetch("https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/users/me", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Beared ${token}`
            },
            method: 'GET',
        });
        const user = await userLog.json();
        const cartLog = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/${user.email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Beared ${token}`
            },
            method: 'GET',
        });
        const cart = await cartLog.json();
        const productLog = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/productos`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Beared ${token}`
            },
            method: 'GET',
        });
        const products = await productLog.json();
        resetProducts();
        productsSection.classList.remove('d-none');
        products.forEach((prod) => {
            showProducts(prod);
        });
        indexSection.classList.add('d-none');
        chatSection.classList.add('d-none');
        cartSection.classList.add('d-none');
        loading.classList.add('d-none');
        signinDiv.classList.add('d-none');
        signupDiv.classList.add('d-none');
        outAccount.classList.add('d-none');
        inAccount.classList.remove('d-none');
        linkProducts.classList.remove('d-none');
        linkChat.classList.remove('d-none');
        if (!cart) {
            cartButton.classList.add('d-none');
        } else {
            cartButton.classList.remove('d-none');
        }
    } else {
        //poner mensaje de que algo está mal
    }
    emailSignin.value = '';
    passwordSignin.value = '';
});
//Formulario Registro
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (passwordSignup.value === passwordToCompare.value) {
        errorMessage.innerHTML = '<h5>Procesando registro...</h5>';
        const data = {
            email: emailSignup.value,
            password: passwordSignup.value,
            fullname: `${nameSignup.value} ${lastnameSignup.value}`,
            phone: phoneSignup.value,
        };
        const dataJSON = JSON.stringify(data);
        let responseFetch = await fetch("https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/auth/sign-up", {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataJSON.length
            },
            method: 'POST',
            body: dataJSON
        });
        if (responseFetch.status === 200) {
            errorMessage.innerHTML = '<h5 style="color:green">Registro exitoso</h5>';
            await responseFetch.json(); //ver si se borra
            setTimeout(() => {
                signupDiv.classList.add('d-none');
                signinDiv.classList.remove('d-none');
                nameSignup.value = ''; //desde acá hasta abajo paso dentro del if xq estaba afuera y si va a else no debería resetearse el formulario.
                lastnameSignup.value = '';
                phoneSignup.value = '';
                emailSignup.value = '';
                passwordSignup.value = '';
                passwordToCompare.value = '';
                errorMessage.innerHTML = '';
            }, 1000);
        }
        else {
            errorMessage.innerHTML = '<h5 style="color:red">Algo salió mal: Registro no exitoso</h5>';
            setTimeout(() => {
                errorMessage.innerHTML = '';
            }, 2000);
        }
    } else {
        errorMessage.innerHTML = `<h5 style="color:red">Las contraseñas no coinciden<h5>`;
        setTimeout(() => {
            errorMessage.innerHTML = '';
        }, 2000)
    }
});

//Botón para Desconectarse de la sesión
signOutButton.addEventListener('click', async () => {
    const responseFetch = await fetch("https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/auth/sign-out", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    });
    if (responseFetch.status === 200) {
        localStorage.removeItem('token');
        productsSection.classList.add('d-none');
        indexSection.classList.remove('d-none');
        chatSection.classList.add('d-none');
        cartSection.classList.add('d-none');
        loading.classList.add('d-none');
        signinDiv.classList.remove('d-none');
        signupDiv.classList.add('d-none');
        outAccount.classList.remove('d-none');
        inAccount.classList.add('d-none');
        linkProducts.classList.add('d-none');
        linkChat.classList.add('d-none');
    }
});

//Boton para linkear a la vista de productos
linkProducts.addEventListener('click', async () => {
    token = localStorage.getItem('token');
    const productLog = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/productos`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'GET',
    });
    const products = await productLog.json();
    resetProducts();
    productsSection.classList.remove('d-none');
    products.forEach((prod) => {
        showProducts(prod);
    });
    indexSection.classList.add('d-none');
    chatSection.classList.add('d-none');
    cartSection.classList.add('d-none');
});

//Boton para linkear a la vista de chat
linkChat.addEventListener('click', async () => {
    productsSection.classList.add('d-none');
    indexSection.classList.add('d-none');
    chatSection.classList.remove('d-none');
    cartSection.classList.add('d-none');
});

//PRODUCTOS
//resetear productos en tabla de productos
async function resetProducts() {
    tableProducts.innerHTML = "<tr><th>Nombre</th><th>Precio [$]</th><th>Imagen</th><th>Agregar al carrito</th></tr>"
}

//imprimir productos en tabla
function showProducts(data) {
    const item = document.createElement("tr")
    item.innerHTML +=
        `<td>${data.title}</td>
        <td>${data.price}</td>
        <td>
        <a href="/api/productos/images/${data._id}"><img src="../${data.thumbnail}" alt="imagen ${data.title}" width="100px" /></a>
        </td>
        <td>
            <button id='addProduct${data._id}' onclick="addProductToCart('${data._id}')" class='btn btn-outline-success'>+</button>
        </td>`;
    tableProducts.appendChild(item);
}

//crear carrito o añadir un producto al carrito si ya está creado
async function addProductToCart(id) {
    token = localStorage.getItem('token');
    const userLog = await fetch("https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/users/me", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'GET',
    });
    const user = await userLog.json();
    const cartLog = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/${user.email}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'GET',
    });
    const cart = await cartLog.json();
    const productToAddLog = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/productos/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'GET',
    });
    let productToAdd = await productToAddLog.json();
    if (!cart) {
        productToAdd = { ...productToAdd, quantity: 1 };
        const emailUser = { email: user.email };
        const emailUserJSON = JSON.stringify(emailUser);
        let responseFetch = await fetch("https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito", {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': emailUserJSON.length,
                'Authorization': `Beared ${token}`
            },
            method: 'POST',
            body: emailUserJSON
        });
        const newCart = await responseFetch.json();
        alert(`Se crea nuevo carrito con el Id: ${newCart}`);
        const dataJSON = JSON.stringify(productToAdd);
        let addProductFetch = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/${newCart}`, {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataJSON.length,
                'Authorization': `Beared ${token}`
            },
            method: 'POST',
            body: dataJSON
        });
        if (addProductFetch.status === 200) {
            cartButton.classList.remove('d-none');
        }
    } else {
        let productIndex = cart.products.findIndex(prod => prod._id === productToAdd._id);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
            productToAdd = cart.products[productIndex];
            const dataJSON = JSON.stringify(productToAdd);
            await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/${cart._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': dataJSON.length,
                    'Authorization': `Beared ${token}`
                },
                method: 'PUT',
                body: dataJSON
            });
        } else {
            productToAdd.quantity = 1;
            const dataJSON = JSON.stringify(productToAdd);
            await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/${cart._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': dataJSON.length,
                    'Authorization': `Beared ${token}`
                },
                method: 'POST',
                body: dataJSON
            });
        }
        alert(`Nuevo producto '${productToAdd.title}' agregado al carrito`);
    }
}


//CARRITO
//botón para dirigir al carrito
cartButton.addEventListener('click', async () => {
    token = localStorage.getItem('token');
    const userLog = await fetch("https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/users/me", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'GET',
    });
    const user = await userLog.json();
    const cartLog = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/${user.email}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'GET',
    });
    const cart = await cartLog.json();
    productsSection.classList.add('d-none');
    indexSection.classList.add('d-none');
    chatSection.classList.add('d-none');
    resetCart();
    cartSection.classList.remove('d-none');
    cart.products.forEach((prod) => {
        showProductsCart(prod);
    });
    addExtrasCart();
});

//resetear productos en carrito
async function resetCart() {
    cartProducts.innerHTML = "<tr><th>Nombre</th><th>Precio [$]</th><th>Imagen</th><th>Cantidad</th><th style='color:gray'>Eliminar Producto</th></tr>"
}

//imprimir total y botones en carrito
async function addExtrasCart() {
    token = localStorage.getItem('token');
    const userLog = await fetch("https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/users/me", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'GET',
    });
    const user = await userLog.json();
    const cartLog = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/${user.email}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'GET',
    });
    const cart = await cartLog.json();
    let total = 0;
    cart.products.forEach((prod) => {
        total = total + prod.price * prod.quantity;
    });
    cartProducts.innerHTML += `<td colspan="4"></td><td class="fw-bold">Total: $${total} </td>`;
    buttonsCart.innerHTML = `<button id='delete-cart-button' onclick="deleteCart('${cart._id}')" class='btn btn-danger'>Eliminar Carrito</button>
    <button id='buy-cart-button' onclick="buyCart('${cart._id}', '${user._id}')" class='btn btn-success'>Comprar</button>`;
}

//imprimir productos en carrito
function showProductsCart(data) {
    const item = document.createElement("tr")
    item.innerHTML +=
        `<td>${data.title}</td>
        <td>${data.price}</td>
        <td>
          <img src="../${data.thumbnail}" alt="imagen ${data.title}" width="100px" />
        </td>
        <td>${data.quantity}</td>
        <td>
            <button id='deleteProduct${data._id}' onclick="deleteProductCart('${data._id}')" class='btn btn-outline-danger'>X</button>
        </td>`;
    cartProducts.appendChild(item);
}

async function deleteProductCart(product_id) {
    token = localStorage.getItem('token');
    const userLog = await fetch("https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/users/me", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'GET',
    });
    const user = await userLog.json();
    const cartLog = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/${user.email}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'GET',
    });
    const cart = await cartLog.json();
    let responseFetch = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/${cart._id}/${product_id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'DELETE'
    });
    if (responseFetch.status === 200) {
        const cartLog = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/${user.email}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Beared ${token}`
            },
            method: 'GET',
        });
        const cart = await cartLog.json();
        if (!cart.products.length) {
            deleteCart(cart._id);
            const productLog = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/productos`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Beared ${token}`
                },
                method: 'GET',
            });
            const products = await productLog.json();
            resetProducts();
            productsSection.classList.remove('d-none');
            products.forEach((prod) => {
                showProducts(prod);
            });
            indexSection.classList.add('d-none');
            chatSection.classList.add('d-none');
            cartSection.classList.add('d-none');
        } else {
            console.log(`se borra el producto con id ${product_id}`);
            resetCart();
            cart.products.forEach((prod) => {
                showProductsCart(prod);
            });
            addExtrasCart();
        }
    }
}

async function deleteCart(cart_id) {
    token = localStorage.getItem('token');
    let responseFetch = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/${cart_id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'DELETE'
    });
    if (responseFetch.status === 200) {
        const productLog = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/productos`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Beared ${token}`
            },
            method: 'GET',
        });
        const products = await productLog.json();
        resetProducts();
        productsSection.classList.remove('d-none');
        products.forEach((prod) => {
            showProducts(prod);
        });
        cartButton.classList.add('d-none');
        indexSection.classList.add('d-none');
        chatSection.classList.add('d-none');
        cartSection.classList.add('d-none');
    }
}

async function buyCart(cart_id, user_id) {
    token = localStorage.getItem('token');
    const userLog = await fetch("https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/users/me", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'GET',
    });
    const user = await userLog.json();
    const cartLog = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/${user.email}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'GET',
    });
    const cart = await cartLog.json();
    let message = '';
    await cart.products.forEach((prod) => {
        message += `<p>Producto: ${prod.title} | Cantidad: ${prod.quantity}</p>`;
    });
    const messageObject = { message };
    const dataJSON = JSON.stringify(messageObject);
    messageCart.innerText = 'Procesando compra...';
    let responseFetch = await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/${cart_id}/${user_id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataJSON.length,
            'Authorization': `Beared ${token}`
        },
        method: 'POST',
        body: dataJSON
    });
    if (responseFetch.status === 200) {
        const buyedOrder = {
            timestamp: new Date(),
            products: cart.products
        }
        const orderJSON = JSON.stringify(buyedOrder);
        await fetch(`https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/api/carrito/order/new/${cart_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataJSON.length,
                'Authorization': `Beared ${token}`
            },
            method: 'POST',
            body: orderJSON
        });
        console.log('Borrando Carrito por compra exitosa');
        messageCart.innerText = 'Gracias por tu compra! Sigue viendo el catálogo de nuestros productos';
        setTimeout(async () => {
            await deleteCart(cart_id);
        }, 3000);
    }
}

//CHAT
function showMessage(data) {
    message.innerHTML = '';
    data.messages.forEach(msg => {
        const item = document.createElement("li");
        item.className = "list-group-item text-start";
        item.innerHTML =
            `<strong style="color: blue">${msg.email}</strong> <font color="brown">${msg.timestamp}</font> : <i style="color: green">${msg.content}</i>`;
        message.appendChild(item);
    })
}

formChat.addEventListener("submit", async function (e) {
    e.preventDefault()
    token = localStorage.getItem('token');
    const userLog = await fetch("https://proyecto-final-backend-coderhouse-1786-dev.fl0.io/users/me", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Beared ${token}`
        },
        method: 'GET',
    });
    const user = await userLog.json();
    const data = {
        author: {
            email: user.email,
            name: user.fullname,
        },
        content: inputMessage.value,
        timestamp: new Date().toLocaleString()
    };
    socket.emit("chat message", data);
    inputMessage.value = "";
    inputMessage.focus();
});

socket.on("connect", () => {
    console.log("Conectados al servidor");
});

socket.on("history-messages", (data) => {
    showMessage(data);
});

socket.on("notification", (data) => {
    showMessage(data);
});