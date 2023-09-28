let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let create = document.getElementById('create')

//console.log(title,price,taxes,ads,discount,total,count,category)

// get total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) 
         - discount.value
        total.innerHTML = result
        total.style.background = "#10af02"
    }else{
        total.style.background = "#fe1e00"
        total.innerHTML = ''
    }
}

// create product
let dataPro
if(localStorage.product != null ){
    dataPro = JSON.parse(localStorage.product)
}else {
    dataPro = []
}

create.onclick = function(){
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    dataPro.push(newPro)
    // save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro) )

    showData()
}

// clear inputs
function clearData(){
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    count.value = ""
    category.value = ""
    total.innerHTML = ""
    total.style.background = "#fe1e00"
}

// create products
function showData(){
    let table = ''
    for (let i = 0; i < dataPro.length; i ++){
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro.title}</td>
            <td>${dataPro.price} DH</td>
            <td>${dataPro.taxes} DH</td>
            <td>${dataPro.ads} DH</td>
            <td>${dataPro.discount} DH</td>
            <td>${dataPro.total}</td>
            <td>${dataPro.category}</td>
            <td><button id="update"><i class='bx bxs-edit' ></i></button></td>
            <td><button id="delete"><i class='bx bx-trash' ></i></button></td>
        </tr>`
    }
    document.getElementById('tbody').innerHTML = table
}
showData()
