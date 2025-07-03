// Function to perform search
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        showNotification('Please enter a search term', 'error');
        return;
    }

    // Filter products based on search term
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    // Display search results
    displaySearchResults(filteredProducts);
}

// Function to display search results
function displaySearchResults(results) {
    const productsGrid = document.querySelector('.products-grid');
    const pageInfo = document.querySelector('.page-info');
    
    if (results.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
            </div>
        `;
        pageInfo.textContent = 'Page 1 of 1';
        return;
    }

    // Create product cards
    productsGrid.innerHTML = results.map(product => createProductCard(product)).join('');
    pageInfo.textContent = `Page 1 of ${Math.ceil(results.length / 12)}`;
}

// Function to sort results
function sortResults(sortBy) {
    const productsGrid = document.querySelector('.products-grid');
    const currentProducts = Array.from(productsGrid.children).map(card => {
        const id = parseInt(card.dataset.id);
        return products.find(p => p.id === id);
    });

    let sortedProducts;
    switch (sortBy) {
        case 'price-low':
            sortedProducts = [...currentProducts].sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts = [...currentProducts].sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts = [...currentProducts].sort((a, b) => b.rating - a.rating);
            break;
        default:
            sortedProducts = currentProducts;
    }

    productsGrid.innerHTML = sortedProducts.map(product => createProductCard(product)).join('');
}

// Function to show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize search page
document.addEventListener('DOMContentLoaded', () => {
    // Load initial products
    loadProducts();

    // Add event listener for search input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Add event listener for price slider
    const priceSlider = document.querySelector('.price-slider');
    priceSlider.addEventListener('input', (e) => {
        document.querySelector('.price-values span:last-child').textContent = `$${e.target.value}`;
    });
}); 