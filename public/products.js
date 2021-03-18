'use strict';

document.addEventListener('DOMContentLoaded', (data) => {
    let queryString = window.location.search;

    if(queryString) {
        queryString = queryString.substring(4);
    }
    const idElemSplit1 = queryString;
    
    fetch(`http://localhost:5000/getCurrent/${idElemSplit1}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        renderCurrentProductHtml(idElemSplit1, data)
    });
});


function renderCurrentProductHtml(idElemSplit1, data) {

    // Left Content
    const leftContent = document.createElement('div');
    leftContent.classList.add('left-content');
    
    // Right Content
    const rightContent = document.createElement('div');
    rightContent.classList.add('right-content');
    
    // Image
    const currentImg = document.createElement('img');
    currentImg.src = `../images/product-${idElemSplit1}.jpg`;
    currentImg.classList.add('main-img');
    currentImg.setAttribute('id', `img${idElemSplit1}`);
    
    // Product Name & Price
    const currentProductName = document.createElement('h3');
    currentProductName.textContent = `${data.Product[0].name}`;
    currentProductName.setAttribute('id', `name${idElemSplit1}`)
    const currentProductPrice = document.createElement('p');
    currentProductPrice.textContent = `$${data.Product[0].price}.00`;
    currentProductPrice.setAttribute('id', `price${idElemSplit1}`)

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

function addToCart() {
    const selectedValue = document.querySelector('select').selectedIndex;
    const selectedInput = document.querySelector('input').value;
    console.log(selectedInput);
    if(selectedValue === 0 || parseInt(selectedInput) <= 0) {
        document.querySelector('.alert-log').textContent = 'Please select size and quantity';
        return;
    }

    let queryString = window.location.search;
    if(queryString) {
        queryString = queryString.substring(4);
    }

    const idElemSplit1 = queryString;
    const img = document.getElementById(`img${idElemSplit1}`).src;
    const name = document.getElementById(`name${idElemSplit1}`).textContent;
    const price = document.getElementById(`price${idElemSplit1}`).textContent;
    // const size = document.getElementById(`size${idElemSplit1}`)

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/addToCart', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        // do something to response
        console.log(this.responseText);
    };
    xhr.send(`image=${img}&name=${name}&price=${price}&size=${selectedValue}&quantity=${selectedInput}`);

    window.location.href = `payment.html?id=${idElemSplit1}`;
}
