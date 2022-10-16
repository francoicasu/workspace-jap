const cartContainer = document.getElementById('cart-container')
const tableContainer = document.getElementById('table-container')
const newTableContainer = document.getElementById('new-table-container')
const finalizeCard = document.getElementById('finalize-card')
let cartProductList = []
let newProductsArr = []

// modal variable
const addAdress = document.getElementById('address-btn')
const modal = document.getElementById('modal-background')
const modalConfirmBtn = document.getElementById('modal-confirm')
const modalCancelBtn = document.getElementById('modal-cancel')
const modalForm = document.getElementById('modal_form')
const modalInputs = document.querySelectorAll('.modal_item')
const modalContainerInputs = document.querySelectorAll('.form-modal-item')

function showProductsCart(arr){
  let appendToHtml = ''
  
  for(const products of arr){
    appendToHtml = `
      <div class="container cart-product-container">
        <div class="product-title">
          <h2>${products.name}</h2>
        </div>
        <div class="product-table-content">
          <div class="product-image">
            <img class="w-100" src="${products.image}">
          </div>

          <div class="product-price">
            <p>costo: ${products.currency} ${products.unitCost}</p>
          </div>

          <div class="counter-container">
            <div class="counter-btn-container minus" onclick="decrease()" id="minus">
              <span class="fas fa-minus"></span>
            </div>

            <div class="counter" id="counter">${products.count}</div>

            <div class="counter-btn-container plus" onclick="increase()" id="plus">
              <span class="fas fa-plus"></span>
            </div>

          </div>

          <div class="subtotal">
            <p>
              subtotal:
            </p>
            <p id="subtotal">
              ${products.currency} ${products.unitCost}
            </p>
          </div> 
        </div>
        <div class="cart-product-action-buttons">
            <span class="fas fa-trash"></span>
            Eliminar
        </div>
      </div>
    `
  }

  tableContainer.innerHTML = appendToHtml
}

function showNewProductsCart(arr){
  let appendToHtml = ''
  for (const products of arr){
    appendToHtml += `
    <div class="container cart-product-container">
      <div class="product-title">
        <h2>${products.name}</h2>
      </div>
      <div class="product-table-content">
        <div class="product-image">
          <img class="w-100" src="${products.image}">
        </div>
  
        <div class="product-price">
          <p>costo: ${products.currency} ${products.unitCost}</p>
        </div>
  
        <div class="counter-container">
          <div class="counter-btn-container minus" onclick="newDecreased(${products.id})" id="minus">
            <span class="fas fa-minus"></span>
          </div>
  
          <div class="counter" id="counter">${products.count}</div>
  
          <div class="counter-btn-container plus" onclick="newIncrease(${products.id})" id="plus">
            <span class="fas fa-plus"></span>
          </div>
  
        </div>
  
        <div class="subtotal">
          <p>
            subtotal:
          </p>
          <p id="new-subtotal">
            ${products.currency} ${products.unitCost * products.count}
          </p>
        </div> 
      </div>
      <div class="cart-product-action-buttons" onclick="deleteProduct(${products.id})">
          <span class="fas fa-trash"></span>
          Eliminar
      </div>
    </div>
    `
  }


  newTableContainer.innerHTML = appendToHtml
}

// Alert

const ALERT = document.getElementById('alert')

function showErrorAlert(message){
    ALERT.classList.add('show')
    
    ALERT.innerText = message

    setTimeout(()=>{
      ALERT.classList.remove('show')
    }, 3000)
}

const ALERT_SUCCESS = document.getElementById('successAlert')

function showSuccessAlert(message){
  ALERT_SUCCESS.classList.add('show')
    
  ALERT_SUCCESS.innerText = message

    setTimeout(()=>{
      ALERT_SUCCESS.classList.remove('show')
    }, 3000)
}



// Modal of address
function showTheModal(){
  modal.classList.add('show')
}

function showAddress(){
  const newAddress = document.getElementById('new-address')
  let appendToHtml = ''
  if(!localStorage.getItem('address')){
    return newAddress.innerHTML = 'Aun no hay dirección'
  }

  let address = JSON.parse(localStorage.getItem('address'))
  appendToHtml = `
    <p>${address.street}, ${address.number} esq. ${address.corner} <span class="fas fa-trash m-1 delete-address" onclick="deleteAddress()"></span></p>
  `
  newAddress.innerHTML = appendToHtml
  
}

function deleteAddress(){
  localStorage.removeItem('address')
  showAddress()
}

function removeActiveClass(){
  modalContainerInputs.forEach(value =>{
    value.classList.remove('active')
  })
}

// save the addres in the localStorage
function saveAddres(){
  const street = document.getElementById('street')
  const number = document.getElementById('number')
  const corner = document.getElementById('corner')
  

  const address = {}

  const ERROR_MESSAGE = 'Completa todos los campos para poder agregar una direccion'
  const SUCCESS_MESSAGE = 'Se ha editado la direccion con exito'

  modalConfirmBtn.addEventListener('click', ()=>{
    if(!street.value || !number.value || !corner.value){
      showErrorAlert(ERROR_MESSAGE)
      
    } else{
      address.street = street.value
      address.number = number.value
      address.corner = corner.value
  
      localStorage.setItem('address', JSON.stringify(address))
      modal.classList.remove('show')
      showAddress()
      removeActiveClass()
      showSuccessAlert(SUCCESS_MESSAGE)
    }

  })
}


function closeModal(){
  modalCancelBtn.addEventListener('click', ()=>{
    removeActiveClass()
    modal.classList.remove('show')
  })
}

// this function is for addEventlistener of modalContainerInputs, this function add the 'active' class to clicked container
function focusInputModal(){
  modalContainerInputs.forEach(item =>
    item.classList.remove('active'));
    this.classList.add('active')
}

// Cart counter action buttons of default product
let counter = 1

// this function increase the counter variable and display the result
function increase(){
  updateDisplay(++counter)
}

// this function decrease the counter variable and display the result
function decrease(){
  const ERROR_MESSAGE = 'No se puede poner menos de un producto'
  if(counter <= 1){
    return showErrorAlert(ERROR_MESSAGE)
  }
  return updateDisplay(--counter)
}

// this function show the counter variable
function updateDisplay(num){
  const counterInput = document.getElementById('counter')
  counterInput.innerText = num
  subTotal(cartProductList)
}

//Cart counter action button of new cart products

function newIncrease(id){
  let currentCart = JSON.parse(localStorage.getItem('cartProduct'))

  for(const product of currentCart){
    if(product.id === id){
      product.count += 1
    }
  }

  localStorage.setItem('cartProduct', JSON.stringify(currentCart))
  
  showNewProductsCart(currentCart)
}

function newDecreased(id){
  let currentCart = JSON.parse(localStorage.getItem('cartProduct'))

  const ERROR_MESSAGE = 'No se puede poner menos de un producto'

  for(const product of currentCart){
    if(product.id === id){
      product.count <= 1 ? showErrorAlert(ERROR_MESSAGE) : product.count -= 1
    }
  }

  localStorage.setItem('cartProduct', JSON.stringify(currentCart))
  
  showNewProductsCart(currentCart)
}

// Subtotal multiply

function subTotal(arr){
  const subtotalContanier = document.getElementById('subtotal')

  let result = ''

  for(const products of arr){
    result = `${products.currency} ${parseInt(products.unitCost) * counter}`
  }

  subtotalContanier.innerText = result
}

function deleteProduct(id){
  let currentCart = JSON.parse(localStorage.getItem('cartProduct'))

  const SUCCESS_MESSAGE = 'Producto eliminado de tu carrito'

  for(let index in currentCart){
    if(currentCart[index].id === id){
      currentCart.splice(index, 1)
    }
  }

  localStorage.setItem('cartProduct', JSON.stringify(currentCart))
  showSuccessAlert(SUCCESS_MESSAGE)
  showNewProductsCart(currentCart)
}


document.addEventListener('DOMContentLoaded', ()=>{
    let userId = '25801'

    getJSONData(CART_INFO_URL + userId + EXT_TYPE)
      .then(resultObj =>{
        if (resultObj.status === 'ok'){
            cartProductList = resultObj.data.articles
            showProductsCart(cartProductList)

            if(localStorage.getItem('cartProduct')){
              newProductsArr = JSON.parse(localStorage.getItem('cartProduct'))
              showNewProductsCart(newProductsArr)
            }

            // address modal
            showAddress()
            saveAddres()
            closeModal()

            // add the 'active' class to each of inputs of the modal  
            modalContainerInputs.forEach(element => {
              element.addEventListener('click', focusInputModal)
            });
        }
    })
})