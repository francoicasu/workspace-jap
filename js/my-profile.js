const firstName = document.getElementById('first-name')
const secondName = document.getElementById('second-name')
const firstLastName = document.getElementById('first-lastname')
const secondLastName = document.getElementById('second-lastname')
const email = document.getElementById('email')
const phoneNumber = document.getElementById('phone-number')
const saveSettingsBtn = document.getElementById('save-settings')
const changeImage = document.getElementById('inputFile')

let userData = []
let user = {
    firstName: '',
    secondName: '',
    firstLastName: '',
    secondLastName: '',
    email: localStorage.getItem('email'),
    phoneNumber: '',
    avatar: '',
}

if(!localStorage.getItem('userSettings')){
    localStorage.setItem('userSettings', JSON.stringify(user))

}

const avatar = document.querySelector('.label-input')
const avatarName = document.getElementById('avatar-name')
let avatarChose = ''
function changeImages(){
    const files = changeImage.files[0]
    const reader = new FileReader()

    reader.onloadend = () =>{
        const toBase64 = reader.result.replace('data:', '').replace(/^.+,/, '')

        avatar.style.background = `url(data:image/png;base64,${toBase64}) no-repeat center/100%`

        avatarChose = toBase64
    }
    reader.readAsDataURL(files)
}

changeImage.addEventListener('change', ()=>{
    changeImages()
    avatarName.innerText = changeImage.files[0].name
})

const settingsForm = document.getElementById('form')

function changeUserSettings(){

    settingsForm.addEventListener('submit', (e)=>{
        if(!settingsForm.checkValidity()){
            e.preventDefault()
            showErrorAlert('Los campos requeridos no deben estar vacios')
        } else {
            e.preventDefault()
            
            showSuccessAlert('Los datos se han guardado con exito, espera mientras actualizamos tu informacion')

            user = {
                firstName: firstName.value,
                secondName: secondName.value,
                firstLastName: firstLastName.value,
                secondLastName: secondLastName.value,
                email: email.value,
                phoneNumber: phoneNumber.value,
                avatar: avatarChose
            }
    
            if(changeImage.files[0] == undefined){
                user.avatar = JSON.parse(localStorage.getItem('userSettings')).avatar
            }

            localStorage.setItem('email', email.value)
            localStorage.setItem('userSettings', JSON.stringify(user))

            setTimeout(()=> {
                window.location = 'my-profile.html'
            }, 3000)
        }

    })

}

function showChanges(arr){

    if(arr !== undefined){
        firstName.value = arr.firstName
        secondName.value = arr.secondName
        firstLastName.value = arr.firstLastName
        secondLastName.value = arr.secondLastName
        email.value = arr.email
        phoneNumber.value = arr.phoneNumber

        if (arr.avatar !== ''){
            avatar.style.background = `url(data:image/png;base64,${arr.avatar})  no-repeat center/100%`
        } else{
            avatar.style.background = `url('../img/img_perfil.png')  no-repeat center/100%` 
        }
        
    }

}

document.addEventListener('DOMContentLoaded', ()=>{
    changeUserSettings()

    if(localStorage.getItem('userSettings')){
        userData = JSON.parse(localStorage.getItem('userSettings'))

        showChanges(userData)
    }
})