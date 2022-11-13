const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = `https://japceibal.github.io/emercado-api/cats_products/`;
const CAR_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json'
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


const logOut = document.getElementById('log-out')

const dropDown = document.getElementById('options_btn')

const avatarNavProfile = document.querySelector('.avatar-nav-profile')

logOut.addEventListener('click', ()=>{
  localStorage.removeItem('email')
  localStorage.removeItem('userSettings')
})

if (localStorage.getItem('email')){
  dropDown.innerHTML = localStorage.getItem('email')
} else {
  window.location = 'index.html'
}

if(localStorage.getItem('userSettings')){
  let avatar = JSON.parse(localStorage.getItem('userSettings')).avatar

  avatar !== '' ? avatarNavProfile.src = `data:image/png;base64,${avatar}` : avatarNavProfile.src = '../img/img_profile.png'

  
}

// Bootstrap tooltips

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))