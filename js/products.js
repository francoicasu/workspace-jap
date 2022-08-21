const content = document.getElementById('list_car')

let currentProductsArray = []

function showProducts() {
    let appendToHtml = '';
    for (let i = 0; i < currentProductsArray.length; i++) {
            let products = currentProductsArray[i]
            
            appendToHtml += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${products.image}" alt="${products.name}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${products.name}</h4>
                            <small class="text-muted">${products.soldCount} Vendidos</small>
                        </div>
                        <p class="mb-1">${products.description}</p>
                        <p class="mb-1">${products.cost} ${products.currency}</p>
                    </div>
                </div>
            </div>
            `
        }

        content.innerHTML = appendToHtml
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CAR_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products
            showProducts()
        }
    })
})