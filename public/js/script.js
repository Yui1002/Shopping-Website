'use strict';

document.addEventListener('DOMContentLoaded', async () => {
    const allProductsUrl = '/allproducts/json'

    let response = await fetch(allProductsUrl)
    let data = await response.json()

    getAllProducts(data)
});

function getAllProducts(data) {
    let arr = [];
    for(let i = 0; i < data.length; i++) {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item');
        
        arr.push(itemContainer);
    }
    
    let i = 0;
    let customId = 1;
    const allitemContainer = document.querySelector('.allproducts-img');
    arr.forEach(e => {
        const img = document.createElement('img');
        img.src = `../images/product-${data[i].id}.jpg`;
        img.classList.add('image');
        const productName = document.createElement('h3');
        productName.textContent = `${data[i].name}`;
        const productPrice = document.createElement('p');
        productPrice.textContent = `$${data[i].price}.00`;
        e.append(img, productName, productPrice);
        e.setAttribute('id', 'id_'+customId);

        allitemContainer.append(e);
        e.onclick = customIdClick;
        i++;
        customId++;
    })
};

async function customIdClick(e) {

    const id = document.getElementById(this.id);
    const idElem = id.id;
    const idElemSplit = idElem.split('_');
    const idElemSplit1 = idElemSplit[1];

    const productUrl = `allproducts/products/id=${idElemSplit1}`
    console.log(productUrl);

    window.location.href = productUrl;

    // Moving to products.js
}


