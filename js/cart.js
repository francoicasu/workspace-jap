const cartContainer = document.getElementById('cart-container')
const tableContainer = document.getElementById('table-container')
const newTableContainer = document.getElementById('new-table-container')
const finalizeCard = document.getElementById('finalize-card')
const finalizeBuyBtn = document.getElementById('finish-buy-btn')
let cartProductList = []
let newProductsArr = []

// address modal
const addAdress = document.getElementById('address-btn')
const modal = document.getElementById('modal-background')
const modalContainer = document.getElementById('modal-container')
const modalConfirmBtn = document.getElementById('modal-confirm')
const modalCancelBtn = document.getElementById('modal-cancel')
const modalCloseBtn = document.getElementById('modal-close')
const modalForm = document.getElementById('modal_form')
const modalInputs = document.querySelectorAll('.modal_item')
const modalContainerInputs = document.querySelectorAll('.form-modal-item')
// payment modal
const paymentModal = document.getElementById('payment-modal-background')

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

// add the 'show' class to the element that you put in the paramters
function showTheModal(modal){
  modal.classList.add('show')
}

// remove the 'show' class to the element that you put in the paramters
function closeModal(modal){
  removeActiveClass()
  modal.classList.remove('show')
}

// this function show the address that is saved in localStorage if is empty, show 'aun no hay direccion'
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
// delete the address of localStorage
function deleteAddress(){
  localStorage.removeItem('address')
  showAddress()
}

// this function is for addEventlistener of modalContainerInputs, this function add the 'active' class to clicked container
function focusInputModal(){
  modalContainerInputs.forEach(item =>
    item.classList.remove('active'));
    this.classList.add('active')
}

// this function is for addEventlistener of modalContainerInputs, this function remove the 'active' class
function removeActiveClass(){
  modalContainerInputs.forEach(value =>{
    value.classList.remove('active')
  })
}

// save the addres in localStorage
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
  subTotalPlus()
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
  subTotalPlus()
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
  if(JSON.parse(localStorage.getItem('cartProduct')).length > 0){
    showNewProductsCart(currentCart)
  } else {
    showNoProducts()
  }
  
  subTotalPlus()
}

// sum of all subtotal's
const select = document.getElementById('select')
const priceTable = document.getElementById('price-table')

function subTotalPlus(){

  const subtotals = document.querySelectorAll('#new-subtotal')
  let UyuToDls;
  let arrToSum = []
  let appendToHtml = ''
  let sum;
  
  for (const result of subtotals){
    let num = parseInt(result.innerText.split(' ')[1])
    
    UyuToDls = num
    if(result.innerText.includes('UYU')){
      UyuToDls = num / 41.20
      arrToSum.push(parseFloat(UyuToDls.toFixed(2)))
    } else {
      arrToSum.push(num)
    }
    
  }

  if(arrToSum.length > 0) sum = arrToSum.reduce((total, value) => value + total)

  let tax = parseInt(select.value)
  let taxResult = sum * (tax + 100) / 100
  
  if (!isNaN(taxResult.toFixed(2))){
    appendToHtml = `
      <div class="price-content">
        <div class="price-text-container">
          <p class="price-title">Subtotal: </p>
          <p class="price-description">Costo unitaro del producto por cantidad</p>
        </div>
        <p>USD ${sum}</p>
      </div>

      <div class="price-content">
        <div class="price-text-container">
          <p class="price-title">Costo de envio: </p>
          <p class="price-description">Segun el tipo de envio</p>
        </div>
        <p>USD ${(tax * sum / 100).toFixed(2)}</p>
      </div>

      <div class="price-content total">
        <div class="price-text-container">
          <p class="price-title">Total($): </p>
        </div>
        <p class="prcie-total">USD ${taxResult.toFixed(2)}</p>
      </div>
    `
  }

  priceTable.innerHTML = appendToHtml
}

// disabled inputs
const creditCardCheck = document.getElementById('credit-card-check')
const accountNumberCheck = document.getElementById('account-number-check')
const formCreditCart = document.getElementById('modal_form-credit-card')
const accountNumberInput = document.getElementById('account-number')
const formAccountNumber = document.getElementById('modal-form-account-number')



function disabledInputs(){

  for (const child of formCreditCart.children){
    if(creditCardCheck.checked){
      child.children[1].disabled = false
      accountNumberCheck.checked = false
    } else {
      child.children[1].disabled = true
      accountNumberCheck.checked = true
    }
  }

}

function disabledInputAccountNumber(){

  if(accountNumberCheck.checked){
    accountNumberInput.disabled = false
    creditCardCheck.checked = false
  } else {
    creditCardCheck.checked = true
    accountNumberInput.disabled = true
  }

}

function finalizeBuy(){
  const textError = document.getElementById('text-error')
  
  // Conditional (ternary) operator
  !localStorage.getItem('address') ? textError.classList.add('show-error') :  textError.classList.remove('show-error')
  select.value === '0'? select.classList.add('is-invalid') : select.classList.remove('is-invalid')

  const paymentError = document.getElementById('payment-error')

  if(!formCreditCart.checkValidity()){
    paymentError.classList.add('show-error')
    
  }else if(!formAccountNumber.checkValidity()){
    paymentError.classList.add('show-error')

  } else {
    paymentError.classList.remove('show-error')

  }

  if((formCreditCart.checkValidity() && formAccountNumber.checkValidity()) && (localStorage.getItem('address') && select.value !== '0')){
    return showSuccessAlert('Su compra ha finalizado con exito')
  }
}

function goToCategory(){
  window.location = 'categories.html'
}

function showNoProducts(){
  cartContainer.innerHTML = `
  
    <div class="no-product">
      <div class="no-product-content">
        <h3>No hay ningun producto en el carrito <span class="fas fa-sad-tear"></span></h3>
        <p>Explora en las categorias y selecciona entre cualquiera de nuestros productos</p>
        <button onclick="goToCategory()" type="button" class="btn btn-primary">Explorar</button>
      </div>
    </div>
  
  `
}

// event Dom Contetn loaded
document.addEventListener('DOMContentLoaded', ()=>{
    let userId = '25801'

    getJSONData(CART_INFO_URL + userId + EXT_TYPE)
      .then(resultObj =>{
        if (resultObj.status === 'ok'){
            cartProductList = resultObj.data.articles
            newProductsArr = JSON.parse(localStorage.getItem('cartProduct'))
            if(newProductsArr.length > 0){
              showNewProductsCart(newProductsArr)
            } else {
              showNoProducts()
            }
            
            // address modal
            showAddress()
            saveAddres()
            subTotalPlus()

            // check inputs disabled
            disabledInputs()
            disabledInputAccountNumber()
            creditCardCheck.addEventListener('change', ()=>{
              disabledInputs()
              disabledInputAccountNumber()
            })
            accountNumberCheck.addEventListener('change', ()=>{
              disabledInputAccountNumber()
              disabledInputs()
            })

            select.addEventListener('change', ()=>{
              subTotalPlus()
            })

            // add the 'active' class to each of inputs of the modal  
            modalContainerInputs.forEach(element => {
              element.addEventListener('click', focusInputModal)
            });

            finalizeBuyBtn.addEventListener('click', ()=>{
              finalizeBuy()
            })
        }
    })
})