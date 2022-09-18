const btnAdd = document.getElementById('agregar')
const container = document.getElementById('contenedor')
const item = document.getElementById('item')

let arrItem = []

const domLoaded = ()=> {
    window.addEventListener('DOMContentLoaded', ()=>{
        arrItem = JSON.parse(localStorage.getItem('item'))
        appendHtml() 
    })
}

if(localStorage.getItem('item')){
    domLoaded()
}

const addItem = ()=> {
    const itemValue = item.value

    if (itemValue === ''){
        const MSG_ERROR = 'Agrega un item'
        msgError(MSG_ERROR)
        return
    }

    arrItem.push(itemValue)

    appendHtml()
    
    item.value = ''
}

const appendHtml = ()=> {
    clearCont()

    if (arrItem.length > 0){
        arrItem.forEach(item => {
            container.innerHTML += `<li class='border-bottom border-2 p-2'>${item}</li>`
        })
    }

    addStorage()
}

const addStorage = ()=> localStorage.setItem('item', JSON.stringify(arrItem))

const msgError = (err)=> {
    const alert = document.querySelector('.alert')
    alert.innerText = err

    alert.style.animation = 'upToDown .9s ease both'

    setTimeout(()=>{
        alert.style.animation = 'vanishToUp .9s ease-in both'
    }, 3000)


}

const clearCont = ()=> container.innerHTML = ''

const clearAll = ()=> {
    if (localStorage.getItem('item')){
        localStorage.clear()
        arrItem = []
        clearCont()
    } else{
        const MSG_CLEAR = 'No hay nada que limpiar'
        msgError(MSG_CLEAR)
    }
}

btnAdd.addEventListener('click', ()=>{
    addItem()
})

item.addEventListener('keydown', (event)=>{
    if (event.key === 'Enter'){
        addItem()
    }
})

const clean = document.getElementById('limpiar')

clean.addEventListener('click', ()=>{
    clearAll()

})