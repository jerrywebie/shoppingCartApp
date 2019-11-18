// tbody container in cart
let cartList = document.getElementById('cart-item-list');

// tbody container in checkout
let checkoutList = document.getElementById('checkout-item-list');


let upQtyBtnList = document.getElementsByClassName("qty-up-btn");
let downQtyBtnList = document.getElementsByClassName("qty-down-btn");

navTabs.addEventListener('click', displayCart);

let cart = [];
// add each item to cart
let itemList = document.querySelectorAll('.item');
itemList.forEach(function (item) {
    item.addEventListener('click', addItemToCart);
});

function addItemToCart(event) {
    event.preventDefault();
    // select item
    if (event.target.tagName === 'BUTTON') {

        //get title and price of selected item
        const targetElement = event.target.parentElement.parentElement;
        const itemTitle = targetElement.children[1].textContent;
        const itemQuantity = 1;
        let itemPrice = targetElement.children[2].textContent;
        itemPrice = itemPrice.substring(0, itemPrice.length - 1);

        // create seleted item object
        let newItem = {
            title: itemTitle,
            price: itemPrice,
            quantity: itemQuantity
        }
        cart.push(newItem);
        document.querySelector('.total-item').textContent = cart.length;
        addToStorage();
    }
}

function addToStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart(event) {

    let t;
    if (event.target.className === 'fa fa-shopping-cart') {

        cart.forEach(displayCartInfo);

        function displayCartInfo(item, index) {
            let selectedItem = item;

            dataRow = `<tr>
                    <td>${index + 1}</td>
                    <td>${selectedItem.title}</td>
                    <td>${selectedItem.price}</td>
                    <td>
                    <span class="qty-up-btn">+</span>
                    <span class="qty">${selectedItem.quantity}</span>
                    <span class="qty-down-btn">-</span>
                    </td>
                    <td>${selectedItem.price * selectedItem.quantity}</td>
                    <td class="changedQty">1</td>
                    </tr>`;

            cartList.innerHTML += dataRow;
        }

        let cartCopy = Array.from(cartList.children);
        cartList.addEventListener('click', upQuantity);
        cartList.addEventListener('click', downQuantity);
        getTotal(t);

        function upQuantity(event) {
            if (event.target.className === 'qty-up-btn') {
                let inputQty = event.target.nextElementSibling;
                inputQty.textContent++;
                let q = inputQty.textContent;
                event.target.parentElement.parentElement.children[5].innerHTML = q;
                let p = inputQty.parentElement.previousElementSibling.textContent;
                event.target.parentElement.parentElement.children[4].innerHTML = Math.round(q * p);
                getTotal(t);
            }
        }

        function downQuantity(event) {
            if (event.target.className === 'qty-down-btn') {
                let inputQty = event.target.previousElementSibling;
                if (inputQty.textContent <= 0) { inputQty.textContent = 1; }
                inputQty.textContent--;
                let q = inputQty.textContent;
                event.target.parentElement.parentElement.children[5].innerHTML = q;
                let p = inputQty.parentElement.previousElementSibling.textContent;
                event.target.parentElement.parentElement.children[4].innerHTML = Math.round(q * p);
                reduceTotal(t);
            }
        }

        function getTotal(t) {
            t = cartCopy.map(element => element.children[4].innerHTML);
            function getSum(total, num) {
                return total + Math.round(num);
            }
            let x = t.reduce(getSum, 0);
            document.querySelector('#cart-total').innerHTML = t.reduce(getSum, 0);
            document.querySelector('#checkout-total').innerHTML = x;
            checkoutList.innerHTML = '';
            updatedCart(cartList.children);
        }

        function reduceTotal(t) {
            t = cartCopy.map(element => element.children[4].innerHTML);
            console.log(t);
            function getSubstract(total, num) {
                return total - Math.round(-num);
            }
            let x = t.reduce(getSubstract, 0);
            document.querySelector('#cart-total').innerHTML = t.reduce(getSubstract, 0);
            document.querySelector('#checkout-total').innerHTML = x;
            checkoutList.innerHTML = '';
            updatedCart(cartList.children);
        }

        function updatedCart(c) {
            for (let i = 0; i <= c.length - 1; i++) {
                dataRow = `<tr>                   
                                <td>${c[i].cells[1].innerText}</td>
                                <td>${c[i].cells[5].innerText}</td>
                                <td>${c[i].cells[4].innerText}</td>
                                </tr>`;
                checkoutList.innerHTML += dataRow;
            }
        }

    }

}















