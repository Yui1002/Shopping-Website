'use strict';

document.addEventListener('DOMContentLoaded', async () => {

    const allProductsUrl = '/allproducts/json'
    
    let response = await fetch(allProductsUrl)
    let data = await response.json()
    console.log(data);

    renderAllProductsHtml(data)
});

function renderAllProductsHtml(data) {
    let arr = [];
    for(let i = 0; i < data.length; i++) {
        const productContainer = document.createElement('div');
        productContainer.classList.add('image-1');
        
        arr.push(productContainer);
    }
    
    let i = 0;
    let customId = 1;
    const allProductContainer = document.querySelector('.allproducts-img');
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

        allProductContainer.append(e);
        e.onclick = customIdClick;
        i++;
        customId++;
    })
};

async function customIdClick(e) {

    // // ユーザがクリックした製品のIDを取得
    const id = document.getElementById(this.id);
    const idElem = id.id;
    const idElemSplit = idElem.split('_');
    const idElemSplit1 = idElemSplit[1];

    const productUrl = `allproducts/products/id=${idElemSplit1}`
    console.log(productUrl);

    window.location.href = productUrl;

    // Moving to products.js
}


