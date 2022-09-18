const container = document.getElementById('product-info-container')
const COMMENT_CONTAINER = document.getElementById('comments')
const NEW_COMMENT_CONTAINER = document.getElementById('newComments')
const commentArea = document.getElementById('comment-msg')
const textAreaDiv = document.getElementById('text-area-div')
const selectContainer = document.getElementById('select-form-div')
const cancel_btn = document.getElementById('cancel-btn')
let currentSelectProduct = []
let currentComments = []
let newComment = []



// this is for show the product in the HTML
function showProduct(arr){
    let product = arr
    let image = `<div class="carousel-item active">
    <img src="${arr.images[0]}" class="d-block w-100" alt="...">
  </div>`
    for (let img of arr.images.slice(1, arr.images.length)){
        image += `
        <div class="carousel-item">
            <img src="${img}" class="d-block w-100" alt="...">
        </div>
        `
    }

    let appendToHtml = `
            <div class="container">
                <div class="mb-4 mt-4">
                    <h2>${product.name}</h2>      
                </div>
                <div class="mt-5 line"></div>
            </div>
            <div class="col m-auto d-flex mb-4 mt-4 w-100" id="product-info">
                <div id="carouselExampleControls" class="carousel slide w-100" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${image}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" id="carusel-control-prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" id="carusel-control-next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                
                <div class="row d-flex align-items-center justify-content-center w-50">
                    <div class="mb-4 mt-4">
                        <h5 class="fw-bold">Precio</h5>
                        ${product.currency} ${product.cost}
                    </div>
                    <div class="mb-4 mt-4">
                        <h5 class="fw-bold">Categoria</h5>
                        ${product.category}
                    </div>
                    <div class="mb-4 mt-4">
                        <h5 class="fw-bold">Cantidad de vendidos</h5>
                        ${product.soldCount}
                    </div>
                </div>
            </div>

            <div class="mb-4 mt-4">
                <h3 class="fw-bold">Descripción</h3>
                ${product.description}
            </div>
          
        


    `

    container.innerHTML = appendToHtml
}

function appendCommentToHtml(arr){
    let appendToHtml = ''
    for (let i = 0; i < arr.length; i++){
        let comment = arr[i]
        if (comment.product == localStorage.getItem('prod_id')){
        let result = ''
        // Si j es menor a el score que le pasemos, result va a ser igual a una estrella con la clase 'checked'. Si no le pasamos la estrella sin la class 'Checked'
        for (let j = 0; j < 5; j++){
            if (j < comment.score){
                result += '<span class="fa fa-star checked"></span>'
            } else {
                result += '<span class="fa fa-star"></span>'
            }
        }

        appendToHtml += `
        <div class="mb-1 mt-1 comment-content">
            <p>
                <span class="fw-bold">${comment.user}</span> 
                - ${comment.dateTime} - 
                
                ${result}
            </p>
            <p>
                ${comment.description}
            </p>
        </div>
        `
        }
        
    }

    return appendToHtml
}
// this show the comments what is in an external json
function showComments(arr){
    COMMENT_CONTAINER.innerHTML = appendCommentToHtml(arr)
}

// this function show the new comments 
function showNewComments(arr){
    setNewComment()
    NEW_COMMENT_CONTAINER.innerHTML = appendCommentToHtml(arr)
}

const message = document.getElementById('comment-msg')
const score = document.getElementById('comment-score')

const commentBtn = document.getElementById('comment-btn')

// return a string with the full date
function FullDate(){
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const fullDate = year + '-' + month+ '-' + day + ' ' + hour + ':' + minutes + ':' + seconds

    return fullDate
}
// this function return an object and show it
function addComment(){
    
    let messageValue = message.value


    let messageContent = {
        dateTime: FullDate(),
        description: messageValue,
        product: localStorage.getItem('prod_id'),
        score: score.value,
        user: localStorage.getItem('email')
    }
    if (messageValue === '' || score.value === ''){
        showError()
    } else{
        newComment.push(messageContent)
        message.value = ''
        score.value = ''
        textAreaDiv.classList.remove('active')
        commentArea.classList.remove('active')
        selectContainer.classList.remove('active')
    }
    
    
    showNewComments(newComment)
    
}

const ALERT_ERROR = document.getElementById('alert')
const ERR_MSG = 'Por favor completa el formulario para enviar un comentario'

// this function show an error message for 3 seconds
function showError(){
    ALERT_ERROR.classList.add('show')
    
    ALERT_ERROR.innerText = ERR_MSG
    
    setTimeout(()=>{
        ALERT_ERROR.classList.remove('show')
    }, 3000)
}

// this function is for save the newComment array in the localStorage with the 'newComment' key
function setNewComment(){
    localStorage.setItem('newComment', JSON.stringify(newComment))    
}

function activeCommentArea(){
    textAreaDiv.classList.add('active')
    commentArea.classList.add('active')
    selectContainer.classList.add('active')
}

function removeActiveCommentArea(){
    textAreaDiv.classList.remove('active')
    commentArea.classList.remove('active')
    selectContainer.classList.remove('active')
}


document.addEventListener('DOMContentLoaded', ()=>{


    let id = localStorage.getItem('prod_id')
    // Fetch product by id
    getJSONData(PRODUCT_INFO_URL + id + EXT_TYPE)
     .then((resultObj => {
        if (resultObj.status === 'ok'){
            currentSelectProduct = resultObj.data

            showProduct(currentSelectProduct)
        }
     }))

     // Fetch comments
     getJSONData(PRODUCT_INFO_COMMENTS_URL + id + EXT_TYPE)
      .then(resultObj =>{
        if (resultObj.status === 'ok'){

            currentComments = resultObj.data

            if (localStorage.getItem('newComment')){
                newComment = JSON.parse(localStorage.getItem('newComment'))
                showNewComments(newComment)
            }
            
            showComments(currentComments)

            commentArea.addEventListener('click', ()=>{
                activeCommentArea()
            })

            cancel_btn.addEventListener('click', ()=>{
                removeActiveCommentArea()
                score.value = ''
                message.value = ''
            })

            commentBtn.addEventListener('click', (e)=>{
                e.preventDefault()
                addComment()
            })

            // commentBtn is disabled if the message is empty
            message.addEventListener('input', ()=>{
                if(message.value !== ''){
                    commentBtn.disabled = false
                } else {
                    commentBtn.disabled = true
                }
                
            })

        }
      })
})