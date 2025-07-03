// Sample product data
const products = [
    {
        id: 1,
        name: "Premium Smartphone",
        price: 699.99,
        category: "electronics",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
        description: "Latest smartphone with advanced features"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 149.99,
        category: "electronics",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        description: "High-quality wireless headphones with noise cancellation"
    },
    {
        id: 3,
        name: "Designer Watch",
        price: 299.99,
        category: "fashion",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=500&fit=crop",
        description: "Luxury designer watch with premium materials"
    },
    {
        id: 4,
        name: "Smart TV",
        price: 899.99,
        category: "electronics",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop",
        description: "4K Smart TV with built-in streaming apps"
    },
    {
        id: 5,
        name: "Coffee Maker",
        price: 79.99,
        category: "home",
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&h=500&fit=crop",
        description: "Automatic coffee maker with timer"
    },
    {
        id: 6,
        name: "Running Shoes",
        price: 129.99,
        category: "fashion",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        description: "Comfortable running shoes with advanced cushioning"
    },
    {
        id: 7,
        name: "Blender",
        price: 49.99,
        category: "home",
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1581094794329-c8112c1f5a0a?w=500&h=500&fit=crop",
        description: "High-speed blender for smoothies and more"
    },
    {
        id: 8,
        name: "Gaming Laptop",
        price: 1299.99,
        category: "electronics",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
        description: "Powerful gaming laptop with high refresh rate display"
    }
];

// Function to create product card
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                    <span>(${product.rating})</span>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn-primary add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Function to load products
function loadProducts(filteredProducts = products) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

// Function to handle filtering
function applyFilters() {
    const categoryFilters = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(checkbox => checkbox.value);
    
    const ratingFilter = Array.from(document.querySelectorAll('input[name="rating"]:checked'))
        .map(checkbox => parseInt(checkbox.value));
    
    const priceFilter = parseInt(document.querySelector('.price-slider').value);

    let filteredProducts = products;

    // Apply category filter
    if (categoryFilters.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            categoryFilters.includes(product.category)
        );
    }

    // Apply rating filter
    if (ratingFilter.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            ratingFilter.includes(Math.floor(product.rating))
        );
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter(product => 
        product.price <= priceFilter
    );

    loadProducts(filteredProducts);
}

// Function to add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Function to update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Load initial products
    loadProducts();

    // Update cart count
    updateCartCount();

    // Add event listeners for filters
    document.querySelector('.apply-filters').addEventListener('click', applyFilters);
    
    // Add event listener for price slider
    document.querySelector('.price-slider').addEventListener('input', (e) => {
        document.querySelector('.price-values span:last-child').textContent = `$${e.target.value}`;
    });
}); 