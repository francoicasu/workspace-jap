document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    if (!localStorage.getItem('visible')){
        const email = localStorage.getItem('email')

        const WELCOME = `Hola! bienvenido ${email}`
        showWelcome(WELCOME)
    }
});

function showWelcome(message){
    const ALERT_WELCOME = document.getElementById('alert')
    ALERT_WELCOME.classList.add('show')
    
    ALERT_WELCOME.innerText = message

    setTimeout(()=>{
        ALERT_WELCOME.classList.remove('show')
        ALERT_WELCOME.style.animation = 'fadeOut .9s ease both'
        localStorage.setItem('visible', 'visible')
    }, 3000)
}