'use strict';

// When DOM is prepared, get all product data
document.addEventListener('DOMContentLoaded', () => {

    const res = fetch('http://localhost:5000/addToCart')
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        renderPurchaseProduct(data);
        calc();
    })
});

function renderPurchaseProduct(data) {
    let customId = 1;
    let numId = 1;
    let priceId = 1;
    let totalId = 1;
    for(let i = 0; i < data.Product.length; i++) {
        const purchaseContent = document.createElement('div');
        purchaseContent.classList.add('purchase-content');
        
        const purchaseImg = document.createElement('img');
        purchaseImg.src = `${data.Product[i].image}`;
        purchaseImg.classList.add('purchase-img');
    
        const purchaseProduct = document.createElement('div');
        purchaseProduct.classList.add('purchase-product');
    
        const productName = document.createElement('h4');
        productName.textContent = `${data.Product[i].name}`;
        const productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.setAttribute('id', 'priceId_'+priceId++)
        productPrice.textContent = `${data.Product[i].price}`;
        const removeBtn = document.createElement('p');
        removeBtn.textContent = 'remove';
        removeBtn.classList.add('remove');
        removeBtn.dataset.index = customId++;
        removeBtn.onclick = removeBtnClick;
        purchaseProduct.append(productName, productPrice, removeBtn);

        const sizeInfo = document.createElement('select');
        sizeInfo.classList.add('.size-info');
        sizeInfo.required = true;
        // sizeInfo.defaultSelected = `${data.Product[i].size}`
        // sizeInfo.options[`${data.Product[i].size}`].defaultSelected = true;
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
        sizeInfo.append(selectSize, option1, option2, option3, option4);

        const purchaseInfo = document.createElement('div');
        purchaseInfo.classList.add('.purchase-info');
        const productQuantity = document.createElement('input');
        productQuantity.type = 'number';
        productQuantity.value = 0;
        productQuantity.setAttribute('min', 0);
        productQuantity.setAttribute('id', 'numId_'+numId++);
        productQuantity.onchange = calc;
        purchaseInfo.append(productQuantity);
    
        const subtotalInfo = document.createElement('div');
        subtotalInfo.classList.add('purchase-subtotal');
        const productSubtotal = document.createElement('p');
        productSubtotal.classList.add('sub-total');
        productSubtotal.setAttribute('id', 'totalId_'+totalId++)
        const productCalc = `${data.Product[i].price}`;
        // const productCalc = productQuantity.value * productPrice;
        productSubtotal.textContent = productCalc;
        
        subtotalInfo.append(productSubtotal);
    
        purchaseContent.append(purchaseImg, purchaseProduct, sizeInfo, purchaseInfo, subtotalInfo);
    
        const allContainer = document.querySelector('.main-container');
        allContainer.append(purchaseContent);

    }
    renderQuantity(data);
    renderSize(data);
}

function renderSize(data) {
    let i = 0;
    const select = document.querySelectorAll('select');
    select.forEach(e => {
        e.selectedIndex = `${data.Product[i].size}`;
        i++;
    })
}

function renderQuantity(data) {
    let i = 0;
    const input = document.querySelectorAll('input');
    input.forEach(e => {
        e.value = `${data.Product[i].quantity}`;
        i++;
    })
}

function calc() {
    const totalProduct = document.querySelectorAll('.purchase-content');
    for(let i = 1; i <= totalProduct.length; i++) {
        const quantity = document.getElementById(`numId_${i}`).value;

        const priceElem = document.getElementById(`priceId_${i}`).textContent;
        const strPriceElem = priceElem.substring(1);
        const price = parseFloat(strPriceElem);

        const total = document.getElementById(`totalId_${i}`);
        total.textContent = '$' + (price * quantity) + '.00';
    }
    sum();
}

function sum() {
    const totalElem = document.querySelector('.total');
    const totalProduct = document.querySelectorAll('.purchase-content');
    let result = 0;
    for(let i = 1; i <= totalProduct.length; i++) {
        const total = document.getElementById(`totalId_${i}`);
        const x = (total.textContent).substring(1);
        const numX = parseInt(x);
        result = result + numX;
    }

    totalElem.textContent = '$' + result + '.00';

    isEmpty();
}

function isEmpty() {
    const totalElem = document.querySelector('.total');
    const totalProduct = document.querySelectorAll('.purchase-content');
    const proceedBtn = document.querySelector('.btn');
    const noCart = document.querySelector('.no-cart');
    const hr = document.querySelector('hr');

    if(totalProduct.length === 0) {
        totalElem.textContent = '';
        proceedBtn.style.display = 'none';
        hr.style.display = 'none';
        noCart.textContent = 'No product in your cart';
    }
}


function removeBtnClick(e) {
    const removeBtn = document.getElementsByClassName('remove');
    const clickedRemoveIndex = e.currentTarget.dataset['index'];
    const getclickedRemoveBtn = document.querySelector(`[data-index='${clickedRemoveIndex}']`);
    const removedProduct = getclickedRemoveBtn.previousSibling.previousSibling.textContent;

    for(let i = 0; i < removeBtn.length; i++) {
        let button = removeBtn[i];
        button.addEventListener('click', (e) => {
            const btnClicked = e.target;
            btnClicked.parentElement.parentElement.remove();
            isEmpty();
        });
    }

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/addToCart', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        // console.log(this.responseText);
    };
    xhr.send(`name=${removedProduct}`);

}

