

// return an alert with the message that you put in the parameters
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