// Container where the products are displayed
const content = document.getElementById('list_car')

// const for filter
const ORDER_ASC_BY_COST = 'Asc.';
const ORDER_DESC_BY_COST = 'Desc.';
const ORDER_PROD_BY_REL = 'Rel.';
const ASC_COST_BTN = document.getElementById('sortAsc')
const DESC_COST_BTN = document.getElementById('sortDesc')
const REL_BTN = document.getElementById('sortByRel')
const CLEAR_BTN = document.getElementById('clearRangeFilter')

// const to search bar
const searchBar = document.getElementById('search')

// variable filter count
let minCount = undefined
let maxCount = undefined

// filter button
const FILTER_BTN = document.getElementById("rangeFilterCount")

let currentProductsArray = []

// filter function
function sortProducts(criteria, arr){
    let result = []
    if (criteria === ORDER_ASC_BY_COST){
        result = currentProductsArray.sort((a, b) => {
            return a.cost - b.cost
        })
    } else if (criteria === ORDER_DESC_BY_COST){
        result = currentProductsArray.sort((a, b) => {
            return b.cost - a.cost
        })
    } else if (criteria === ORDER_PROD_BY_REL){
        result = currentProductsArray.sort((a, b) => {
            return b.soldCount - a.soldCount
        })
    }

    return result
}

// function for search
function search(){

    let result = currentProductsArray
    let searchValue = searchBar.value

    if (searchValue !== ''){
        result = currentProductsArray.filter(products => {

            // Transform to lower case
            let nameLowerCase = products.name.toLowerCase()
            let descriptionLowerCase = products.description.toLowerCase()
            let searchValueLowerCase = searchValue.toLowerCase()

            if (nameLowerCase.includes(searchValueLowerCase) || descriptionLowerCase.includes(searchValueLowerCase)) {
                return currentProductsArray
            }
        })
    }

    return result
}

function clearCountFilter(){

    document.getElementById("rangeFilterCountMin").value = ''
    document.getElementById("rangeFilterCountMax").value = ''

    minCount = undefined
    maxCount = undefined
    
}

function btnFilter(){
    minCount = document.getElementById("rangeFilterCountMin").value
    maxCount = document.getElementById("rangeFilterCountMax").value

    if (minCount !== 0 && minCount !== ''){
        minCount = parseInt(minCount)
    } else{
        minCount = undefined;
    }

    if (maxCount !== 0 && maxCount !== ''){
        maxCount = parseInt(maxCount)
    } else{
        maxCount = undefined;
    }
}

function addProductIdToStorage(id){

    localStorage.setItem('prod_id', id)
    window.location = 'product-info.html'

}

function showProducts(data) {
    let appendToHtml = '';
    for (let i = 0; i < data.length; i++) {
            let products = data[i]
            
            if (((minCount === undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) && ((maxCount === undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){
                appendToHtml += `
                <div onclick="addProductIdToStorage(${products.id})" class="list-group-item list-group-item-action cursor-active product">
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

        }
        

        content.innerHTML = appendToHtml
}

document.addEventListener("DOMContentLoaded", function(e){
    let CAT_ID = localStorage.getItem('catID')
    getJSONData(PRODUCTS_URL + CAT_ID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products
            showProducts(currentProductsArray)
            

            // Show category name
            document.getElementById('products-desc').innerText = `Veras aqui todos los productos de la categoria 
            ${resultObj.data.catName}
            ` 

            searchBar.addEventListener('input', ()=>{
                showProducts(search())
                console.log(search())
            })

            ASC_COST_BTN.addEventListener('click', () => {
                sortProducts(ORDER_ASC_BY_COST)
                showProducts(currentProductsArray)
            })

            DESC_COST_BTN.addEventListener('click', () => {
                sortProducts(ORDER_DESC_BY_COST)
                showProducts(currentProductsArray)
            })

            REL_BTN.addEventListener('click', () => {
                sortProducts(ORDER_PROD_BY_REL)
                showProducts(currentProductsArray)
            })

            FILTER_BTN.addEventListener('click', ()=>{
                btnFilter()
                showProducts(currentProductsArray)
            })

            CLEAR_BTN.addEventListener('click' , ()=>{
                clearCountFilter()
                showProducts(currentProductsArray)
            })

        }
    })
})

