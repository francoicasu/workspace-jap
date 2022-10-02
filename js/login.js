const logBtn = document.getElementById('logBtn')

const inputs = document.getElementsByTagName('input')

const ALERT_ERROR = document.getElementById('alert')

function showError(message){
    ALERT_ERROR.classList.add('show')
    
    ALERT_ERROR.innerText = message

    setTimeout(()=>{
        ALERT_ERROR.classList.remove('show')
    }, 3000)
}

document.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem('email')){
        window.location = 'main.html'
    }
    localStorage.removeItem('visible')
})

const pass = document.getElementById('validationServer02')
const email = document.getElementById('validationServer01')

const MESSAGE_BOTH_ERROR = 'Rellena los campos faltantes!'
const MESSAGE_EMAIL_ERROR = 'Ingresa un email valido para continuar!'
const MESSAGE_PASS_ERROR = 'Rellena el campo Contraseña para poder continuar!'

function isValid(){

    if(pass.value === '' && email.value === ''){
        showError(MESSAGE_BOTH_ERROR)

        pass.classList.add('is-invalid')
        email.classList.add('is-invalid')

    } else if (email.value === '' || !email.value.includes('@')){

        showError(MESSAGE_EMAIL_ERROR)

        pass.classList.remove('is-invalid')
        email.classList.add('is-invalid')

    } else if(pass.value === ''){

        showError(MESSAGE_PASS_ERROR)

        email.classList.remove('is-invalid')
        pass.classList.add('is-invalid')

    } else{
        localStorage.setItem('email', email.value)
        email.classList.remove('is-invalid')
        pass.classList.remove('is-invalid')
        window.location = 'main.html'
    }
}

logBtn.addEventListener('click', ()=>{
    isValid()
})


function handleCredentialResponse(googleUser){
    let jwt = getParsedJwt(googleUser.credential)
    localStorage.setItem('email', jwt.email)
    window.location = 'main.html'
  }
  window.onload = function () {
      google.accounts.id.initialize({
      client_id: '1061486778092-iftngervmd8gvfa992jff253lotp3c17.apps.googleusercontent.com',
      callback: handleCredentialResponse
    });
    google.accounts.id.prompt();
  };

  function getParsedJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]))

    } catch (error) {
      return undefined

    }
  }