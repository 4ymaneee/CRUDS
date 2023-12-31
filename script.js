let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let create = document.getElementById('create')

let mood = 'create'
let tmp
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
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else {
    dataPro = []
}

create.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(title.value != '' && price.value != '' && category.value != '' && newPro.count <= 100){
        if(mood === 'create'){
            if(newPro.count > 1){
                for(let i =0; i < newPro.count; i++){
                    dataPro.push(newPro)
                }
            }else{
                dataPro.push(newPro)
            }
        }else{
            dataPro[tmp] = newPro
            mood = 'create'
            create.innerHTML = "create"
            count.style.display = "block"
        }
        clearData()

    }
    
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

// read products
function showData(){
      let table = ""
      for(let i = 0; i < dataPro.length; i++){
        table += `
    <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price} DH</td>
        <td>${dataPro[i].taxes} DH</td>
        <td>${dataPro[i].ads} DH</td>
        <td>${dataPro[i].discount} DH</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update"><i class='bx bxs-edit' ></i></button></td>
        <td><button onclick="deleteData(${i})" id="delete"><i class='bx bx-trash' ></i></button></td>
    </tr>
        `;
        
      }
    document.getElementById('tbody').innerHTML = table

    let btnDelete = document.getElementById('deleteAll')
    if(dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All</button>
        `
    }else{
        btnDelete.innerHTML = ''
    }
}
showData()

// delete
function deleteData(i){
    dataPro.splice(i,1)
    localStorage.product = JSON.stringify(dataPro)

    showData()
}

//delete all
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)

    showData()
}

// update
function updateData(i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    category.value = dataPro[i].category
    getTotal()
    count.style.display = "none"
    create.innerHTML = "Update"
    mood = 'update'
    tmp = i
    scroll({
        top:0,
        behavior:"smooth"
    })
}

// search
let searchMood = 'Title'

function getSearchMood(id){
    let search = document.getElementById('search')
    if(id == "searchTitle"){
        searchMood = "Title"
    }else{
        searchMood = "Category"
    }

    search.placeholder = "Search By " + searchMood;
    search.focus()
    search.value = ""
    showData()
}

function searchData(value){
    let table = ""
    if(searchMood == "Title"){
        for(let i = 0; i < dataPro.length; i ++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price} DH</td>
                <td>${dataPro[i].taxes} DH</td>
                <td>${dataPro[i].ads} DH</td>
                <td>${dataPro[i].discount} DH</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update"><i class='bx bxs-edit' ></i></button></td>
                <td><button onclick="deleteData(${i})" id="delete"><i class='bx bx-trash' ></i></button></td>
            </tr>
                `;
                
            }
        }
    }else{
        for(let i = 0; i < dataPro.length; i ++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price} DH</td>
                <td>${dataPro[i].taxes} DH</td>
                <td>${dataPro[i].ads} DH</td>
                <td>${dataPro[i].discount} DH</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update"><i class='bx bxs-edit' ></i></button></td>
                <td><button onclick="deleteData(${i})" id="delete"><i class='bx bx-trash' ></i></button></td>
            </tr>
                `;
                
            }
        }
    }

    document.getElementById('tbody').innerHTML = table
}
