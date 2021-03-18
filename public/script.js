'use strict';

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/getAll')
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        if(location.href === "http://localhost:5000/products.html") {
            renderAllProductsHtml(data);
        }
    });
});

function renderAllProductsHtml(data) {
    let arr = [];
    for(let i = 0; i < data.Product.length; i++) {
        const productContainer = document.createElement('div');
        productContainer.classList.add('image-1');
        
        arr.push(productContainer);
    }
    
    let i = 0;
    let customId = 1;
    const allProductContainer = document.querySelector('.allproducts-img');
    arr.forEach(e => {
        const img = document.createElement('img');
        img.src = `../images/product-${data.Product[i].id}.jpg`;
        img.classList.add('image');
        const productName = document.createElement('h3');
        productName.textContent = `${data.Product[i].name}`;
        const productPrice = document.createElement('p');
        productPrice.textContent = `$${data.Product[i].price}.00`;
        e.append(img, productName, productPrice);
        e.setAttribute('id', 'id_'+customId);

        allProductContainer.append(e);
        e.onclick = customIdClick;
        i++;
        customId++;
    })
};

function customIdClick(e) {

    // ユーザがクリックした製品のIDを取得
    const id = document.getElementById(this.id);
    const idElem = id.id;
    const idElemSplit = idElem.split('_');
    const idElemSplit1 = idElemSplit[1];
    console.log(idElemSplit1);

    window.location.href = `product_detail.html?id=${idElemSplit1}`;
}


