//NAVBAR
const linkProducts = document.getElementById('products-link-button');
const outAccount = document.getElementById('out-account');
const selectSignInButton = document.getElementById('nav-signin');
const selectSignUpButton = document.getElementById('nav-signup');
const inAccount = document.getElementById('in-account');
const cartButton = document.getElementById('nav-cart');
const signOutButton = document.getElementById('nav-signout');
const loading = document.getElementById('loading-icon');

async function loadWebPage() {
    const cookie = await fetch("http://localhost:8080/auth/cookie");
    let options;
    if (cookie.status === 200) {
        const token = await cookie.json();
        options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.cookies}`
            }
        }
    }
    const userLog = await fetch("http://localhost:8080/users/me", options);
    loading.classList.remove('d-none');
    if (userLog.status === 200) {
        setTimeout(async () => {
            loading.classList.add('d-none');
            outAccount.classList.add('d-none');
            inAccount.classList.remove('d-none');
            linkProducts.classList.remove('d-none');
        }, 1000);
    }
    else {
        setTimeout(async () => {
            loading.classList.add('d-none');
            outAccount.classList.remove('d-none');
            inAccount.classList.add('d-none');
            linkProducts.classList.add('d-none');
        }, 1000);
    }
}

loadWebPage()