let cart = [];
let total = 0;
let tripleTapCount = 0;
let tripleTapTimer;
const password = '0427';

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((cartItem, index) => {
        const li = document.createElement('li');
        li.textContent = `${cartItem.item} - $${cartItem.price.toFixed(2)}`;
        li.onclick = () => removeFromCart(index);
        cartItems.appendChild(li);
    });
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    renderCart();
}

function checkout() {
    alert('Спасибо за заказ!');
    cart = [];
    total = 0;
    renderCart();
}

function enterFullscreen() {
    const kiosk = document.getElementById('kiosk');
    if (kiosk.requestFullscreen) {
        kiosk.requestFullscreen();
    } else if (kiosk.mozRequestFullScreen) {
        kiosk.mozRequestFullScreen();
    } else if (kiosk.webkitRequestFullscreen) {
        kiosk.webkitRequestFullscreen();
    } else if (kiosk.msRequestFullscreen) {
        kiosk.msRequestFullscreen();
    }
    document.getElementById('fullscreenButton').style.display = 'none';
}

function handleTripleTap() {
    tripleTapCount++;
    if (tripleTapCount === 3) {
        clearTimeout(tripleTapTimer);
        tripleTapCount = 0;
        showModal();
    } else {
        clearTimeout(tripleTapTimer);
        tripleTapTimer = setTimeout(() => {
            tripleTapCount = 0;
        }, 1000);
    }
}

function showModal() {
    document.getElementById('passwordModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('passwordModal').style.display = 'none';
}

function checkPassword() {
    const inputPassword = document.getElementById('passwordInput').value;
    if (inputPassword === password) {
        alert('Access granted');
        closeModal();
        // Дополнительная логика для открытия настроек
    } else {
        alert('Incorrect password');
    }
}

document.addEventListener('touchstart', function (e) {
    if (e.touches.length === 3) {
        handleTripleTap();
    }
});
