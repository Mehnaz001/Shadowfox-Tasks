// Cart functionality
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.href.includes('cart.html')) {
        displayCart();
        setupCartEventListeners();
    }
});

// Display cart items
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items');
    const totalContainer = document.querySelector('.cart-total');
    
    if (!cartContainer || !totalContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalContainer.innerHTML = '<p>Total: $0.00</p>';
        return;
    }

    let total = 0;
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = createCartItemElement(item);
        cartContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    totalContainer.innerHTML = `
        <p>Subtotal: $${total.toFixed(2)}</p>
        <p>Shipping: $5.99</p>
        <p class="total">Total: $${(total + 5.99).toFixed(2)}</p>
        <button class="btn-primary checkout-btn">Proceed to Checkout</button>
    `;
}

// Create cart item element
function createCartItemElement(item) {
    const element = document.createElement('div');
    element.className = 'cart-item';
    element.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.category}', 'decrease')">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.category}', 'increase')">+</button>
            </div>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.id}, '${item.category}')">
            <i class="fas fa-trash"></i>
        </button>
    `;
    return element;
}

// Update item quantity
function updateQuantity(productId, category, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId && item.category === category);

    if (itemIndex === -1) return;

    if (action === 'increase') {
        cart[itemIndex].quantity += 1;
    } else if (action === 'decrease') {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Remove item from cart
function removeFromCart(productId, category) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => !(item.id === productId && item.category === category));
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

// Setup cart event listeners
function setupCartEventListeners() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
}

// Handle checkout
function handleCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    // In a real application, you would redirect to a payment gateway
    alert('Proceeding to checkout...');
    // Clear cart after successful checkout
    localStorage.removeItem('cart');
    displayCart();
    updateCartCount();
    window.location.href = 'index.html';
} 