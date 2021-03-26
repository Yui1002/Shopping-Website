'use strict';

document.addEventListener('DOMContentLoaded', async () => {
    
    const url = window.location.href
    const subUrl = url.split('/')[5].split('=')[1]
    const productApiUrl = `/allproducts/products/json/${subUrl}`

    let response = await fetch(productApiUrl)
    let data = await response.json()
    console.log(data);

    renderCurrentProductHtml(subUrl, data)
});


function renderCurrentProductHtml(subUrl, data) {

    // Left Content
    const leftContent = document.createElement('div');
    leftContent.classList.add('left-content');
    
    // Right Content
    const rightContent = document.createElement('div');
    rightContent.classList.add('right-content');
    
    // Image
    const currentImg = document.createElement('img');
    currentImg.src = `/images/product-${subUrl}.jpg`;
    currentImg.classList.add('main-img');
    currentImg.setAttribute('id', `img${subUrl}`);
    
    // Product Name & Price
    const currentProductName = document.createElement('h3');
    currentProductName.textContent = `${data[0].name}`;
    currentProductName.setAttribute('id', `name${subUrl}`)
    const currentProductPrice = document.createElement('p');
    currentProductPrice.textContent = `$${data[0].price}.00`;
    currentProductPrice.setAttribute('id', `price${subUrl}`)

    // Select Size and Quantity
    const select = document.createElement('select');
    select.required = true;

    const selectSize = document.createElement('option');
    selectSize.textContent = 'Select Size';
    const option1 = document.createElement('option');
    option1.textContent = 'S';
    const option2 = document.createElement('option');
    option2.textContent = 'M';
    const option3 = document.createElement('option');
    option3.textContent = 'L'
    const option4 = document.createElement('option');
    option4.textContent = 'LL';

    const input = document.createElement('input');
    input.type = 'number';
    input.value = 1;
    input.setAttribute('min', 0);

    const alertLog = document.createElement('p');
    alertLog.classList.add('alert-log')

    const addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add('btn');
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.onclick = addToCart;
    
    // Append
    select.append(selectSize, option1, option2, option3, option4);
    leftContent.append(currentImg);
    rightContent.append(currentProductName, currentProductPrice, select, input, alertLog, addToCartBtn);

    const currentProductContainer = document.querySelector('.current-row');
    const mainImg = document.querySelector('.main-img');
    currentProductContainer.append(leftContent, rightContent);

}

async function addToCart() {

    const selectedValue = document.querySelector('select').selectedIndex;
    const selectedInput = document.querySelector('input').value;

    const url = window.location.href
    const subUrl = url.split('/')[5].split('=')[1]
    const routes = '/cart'

    const img = document.getElementById(`img${subUrl}`).src.split('/')[4]
    const name = document.getElementById(`name${subUrl}`).textContent;
    const price = document.getElementById(`price${subUrl}`).textContent;

    if(selectedValue === 0 || parseInt(selectedInput) <= 0) {
        document.querySelector('.alert-log').textContent = 'Please select size and quantity';
        return;
    }

    const obj = {
        "img" : img,
        "name" : name,
        "price" : price
    }

    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(obj)
    }
    
    let response = fetch('/cart', params)

    window.location.href = routes
}
