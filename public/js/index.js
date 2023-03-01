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

//Carga de la página
async function loadWebPage() {
    const userLog = await fetch("http://localhost:8080/users/me");
    loading.classList.remove('d-none');
    if (userLog.status === 200) {
        setTimeout(async () => {
            loading.classList.add('d-none');
            signinDiv.classList.add('d-none');
            signupDiv.classList.add('d-none');
            outAccount.classList.add('d-none');
            inAccount.classList.remove('d-none');
            linkProducts.classList.remove('d-none');
            linkChat.classList.remove('d-none');
        }, 1000);
    }
    else {
        setTimeout(async () => {
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
    let responseFetch = await fetch("http://localhost:8080/auth/sign-in", {
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataJSON.length
        },
        method: 'POST',
        body: dataJSON
    });
    if (responseFetch.status === 200) {
        window.location.replace("/productos");
    }
    else {
        signinDiv.classList.add('d-none');
    }
    emailSignin.value = '';
    passwordSignin.value = '';
});
//Formulario Registro
signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (passwordSignup.value === passwordToCompare.value) {
        const data = {
            email: emailSignup.value,
            password: passwordSignup.value,
            fullname: `${nameSignup.value} ${lastnameSignup.value}`,
            phone: phoneSignup.value,
        };
        const dataJSON = JSON.stringify(data);
        let responseFetch = await fetch("http://localhost:8080/auth/sign-up", {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': dataJSON.length
            },
            method: 'POST',
            body: dataJSON
        });
        if (responseFetch.status === 200) {
            let response = await responseFetch.json();
            /*             outputDiv.classList.remove('d-none');
                        outputDiv.classList.add('text-white'); */
            signupDiv.classList.add('d-none');
            signinDiv.classList.remove('d-none');
            /*             userOutput.innerText = response.message; */
        }
        else {
            signupDiv.classList.add('d-none');
        }
        nameSignup.value = '';
        lastnameSignup.value = '';
        phoneSignup.value = '';
        emailSignup.value = '';
        passwordSignup.value = '';
        passwordToCompare.value = '';
    } else {
        errorMessage.innerHTML = `<h5 style="color:red">Las contraseñas no coinciden<h5>`
        setTimeout(() => {

        }, 2000)
    }
});
