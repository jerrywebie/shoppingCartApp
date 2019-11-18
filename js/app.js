const navTabs = document.querySelector('#nav-tabs');
const categoryTabs = document.querySelector('#category-tabs');

const panels = document.querySelectorAll('.panel');
const subPanels = document.querySelectorAll('.sub-panel');

navTabs.addEventListener('click', displayNavContent);
function displayNavContent(event) {

    if (event.target.tagName === 'LI') {
        let selectedPanel = event.target.dataset.target;
        selectedPanel = selectedPanel.substr(1);

        panels.forEach(function (panel) {

            if (panel.id === selectedPanel) {
                panel.classList.add('active');
            }
            else {
                panel.classList.remove('active');
            }
        });
    }
}

categoryTabs.addEventListener('click', displayCategoryContent);
function displayCategoryContent(event) {
    if (event.target.tagName === 'LI') {
        let selectedSubPanel = event.target.dataset.subtarget;
        selectedSubPanel = selectedSubPanel.substr(1);

        subPanels.forEach(function (subpanel) {

            if (subpanel.id === selectedSubPanel) {
                subpanel.classList.add('active');
            }
            else {
                subpanel.classList.remove('active');
            }
        });
    }
}

// go to home page
document.querySelector('.fa-home').addEventListener('click', goIndexPage);
function goIndexPage() {
    location.reload();
}

// go to cart summary 
document.querySelector('#cart-btn').addEventListener('click', cartSummary);
function cartSummary() {
    document.querySelector('.cart-summary').style.display = "block";
    document.querySelector('.checkout-summary').style.display = "none";
    document.querySelector('.payment-summary').style.display = 'none';
}

// go to order summary 
document.querySelector('#checkout-btn').addEventListener('click', checkOutSummary);
function checkOutSummary() {
    document.querySelector('.checkout-summary').style.display = "block";
    document.querySelector('.cart-summary').style.display = "none";
    document.querySelector('.payment-summary').style.display = 'none';
}

// go to ship summary
document.querySelector('#ship-btn').addEventListener('click', shipSummary);
function shipSummary() {
    document.querySelector('.ship-summary').style.display = 'block';
    document.querySelector('.checkout-summary').style.display = "none";
    document.querySelector('.cart-summary').style.display = "none";
    document.querySelector('.payment-summary').style.display = 'none';
}

// go to payment summary
document.querySelector('#pay-btn').addEventListener('click', paymentSummary);
function paymentSummary() {
    document.querySelector('.payment-summary').style.display = 'block';
    document.querySelector('.checkout-summary').style.display = "none";
    document.querySelector('.cart-summary').style.display = "none";
    document.querySelector('.ship-summary').style.display = 'none';
}

// clear cart button

document.querySelector('#clear-cart-btn').addEventListener('click', clearCart);
function clearCart() {
    console.log("clear cart");
}
