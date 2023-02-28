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
    setTimeout(() => {
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
    setTimeout(() => {
        window.location.replace("/productos");
    }, 6000);
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