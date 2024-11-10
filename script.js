let pName = document.getElementById("name")
let pModel = document.getElementById("model")
let pStorage = document.getElementById("storage")
let pPrice = document.getElementById("price")
let pColor = document.getElementById("color")
let pNumber = document.getElementById("number")
let sam = -1
let alert1 = `
    <div role="alert" class="alert alert-danger">
        There is an empty field.
    </div>
`
let alert2 = `
    <div role="alert" class="alert alert-danger">
        Please enter a value greater than 0.
    </div>
`
let array 

if(localStorage.getItem("samsung")== null){
    array=[]
}else{
    array = JSON.parse(localStorage.getItem("samsung"))
    viewTable()
}

function addProduct(){
    let product = {
        name : pName.value ,
        model : pModel.value ,
        storage : pStorage.value ,
        price : parseFloat (pPrice.value) ,
        color : pColor .value ,
        number : parseFloat(pNumber.value)
    }
    if( pName.value=='' || pModel==''||pStorage==''||pPrice==''||pNumber==''){
        document.getElementById("alert").innerHTML = alert1
    }
    else if( parseFloat(pNumber.value) <= 0){
        document.getElementById("alert").innerHTML = alert2
    }
    else{
        document.getElementById("alert").innerHTML = ''

        if(sam===-1){
            document.getElementById("save").innerHTML = 'save'
            array.push(product)
        }else{
            document.getElementById("save").innerHTML = 'save'
            array[sam] = product
            sam = -1
        }
        localStorage.setItem('samsung', JSON.stringify(array))
    }
    viewTable()
    clearInput()
    
}

function viewTable(){
    let s = ''
    for (let i = 0; i < array.length; i++) {
        s+= `
            <tr>
                        <th>${i+1}</th>
                        <th>${array[i].name}</th>
                        <th>${array[i].model}</th>
                        <th>${array[i].storage}</th>
                        <th>${array[i].price}</th>
                        <th>${array[i].color}</th>
                        <th>${array[i].number}</th>
                        <th><button id="" onclick="deleteRow(${i})" class="btn btn-danger">Delete</button></th>
                        <th><button id="" onclick="updateRow(${i})" class="btn btn-info">Update</button></th>
                    </tr>
        `
    }
    document.getElementById("tBody").innerHTML = s
}

function deleteAll(){
    array.splice(0)
    localStorage.setItem('samsung', JSON.stringify(array));
    viewTable()    
}

function deleteRow(i){
    if(array[i].number > 1 ){
        array[i].number -= 1
    }else{
        array.splice(i,1)
    }
    localStorage.setItem('samsung', JSON.stringify(array));
    viewTable()  
}

function clearInput(){
    pName.value =''
    pModel.value =''
    pStorage.value =''
    pPrice.value =''
    pColor .value =''
    pNumber.value =''
}

function updateRow(i){
    document.getElementById("save").innerHTML = 'edit'
    pName.value = array[i].name
    pModel.value = array[i].model
    pStorage.value = array[i].storage
    pPrice.value =array[i].price
    pColor .value =array[i].color
    pNumber.value = array[i].number

    sam = i
}

function searchBar(searchModel){
    let sung = ''
    for (let i = 0; i < array.length; i++) {
        if (array[i].model.toLowerCase().includes(searchModel.trim().toLowerCase())) {
            sung+= `
            <tr>
                <th>${i+1}</th>
                <th>${array[i].name}</th>
                <th>${array[i].model}</th>
                <th>${array[i].storage}</th>
                <th>${array[i].price}</th>
                <th>${array[i].color}</th>
                <th>${array[i].number}</th>
                <th><button id="" onclick="deleteRow(${i})" class="btn btn-danger">Delete</button></th>
                <th><button id="" onclick="updateRow(${i})" class="btn btn-info">Update</button></th>
            </tr>
            `
        }
    }
    document.getElementById("tBody").innerHTML = sung
}


