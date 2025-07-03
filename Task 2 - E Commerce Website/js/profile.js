// Profile Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    
    // Initialize profile sections
    const sections = document.querySelectorAll('.profile-section');
    const navLinks = document.querySelectorAll('.profile-nav a');
    
    // Show personal info section by default
    showSection('personal-info');
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            // Update active state
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Function to show selected section
    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }
    
    // Populate user data in the form
    if (userData) {
        document.getElementById('name').value = userData.name || '';
        document.getElementById('email').value = userData.email || '';
        document.getElementById('phone').value = userData.phone || '';
    }
    
    // Handle form submission
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            };
            
            // Update user data in localStorage
            localStorage.setItem('userData', JSON.stringify(formData));
            
            // Show success message
            showNotification('Profile updated successfully!');
        });
    }
    
    // Handle password change
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (newPassword !== confirmPassword) {
                showNotification('New passwords do not match!', 'error');
                return;
            }
            
            // In a real application, you would send this to the server
            showNotification('Password changed successfully!');
            passwordForm.reset();
        });
    }
    
    // Handle logout
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Clear user data from localStorage
            localStorage.removeItem('userData');
            localStorage.removeItem('cart');
            
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }
    
    // Function to show notifications
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Load order history
    loadOrderHistory();
    
    // Load saved addresses
    loadAddresses();
    
    // Load wishlist
    loadWishlist();
});

// Function to load order history
function loadOrderHistory() {
    const ordersList = document.querySelector('.orders-list');
    if (!ordersList) return;
    
    // Sample order data (in a real app, this would come from a server)
    const orders = [
        {
            id: 'ORD001',
            date: '2024-03-15',
            total: 299.99,
            status: 'completed',
            items: [
                { name: 'Men\'s Casual T-Shirt', quantity: 2, price: 29.99 },
                { name: 'Women\'s Summer Dress', quantity: 1, price: 49.99 }
            ]
        },
        {
            id: 'ORD002',
            date: '2024-03-10',
            total: 999.99,
            status: 'pending',
            items: [
                { name: 'iPhone 13 Pro', quantity: 1, price: 999.99 }
            ]
        }
    ];
    
    // Clear existing orders
    ordersList.innerHTML = '';
    
    // Add orders to the list
    orders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        orderItem.innerHTML = `
            <div class="order-header">
                <div>
                    <h4>Order #${order.id}</h4>
                    <p>Date: ${order.date}</p>
                </div>
                <span class="order-status status-${order.status}">
                    ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item-detail">
                        <span>${item.name}</span>
                        <span>${item.quantity} x $${item.price}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                <strong>Total: $${order.total}</strong>
            </div>
        `;
        
        ordersList.appendChild(orderItem);
    });
}

// Function to load saved addresses
function loadAddresses() {
    const addressesList = document.querySelector('.addresses-list');
    if (!addressesList) return;
    
    // Sample address data (in a real app, this would come from a server)
    const addresses = [
        {
            id: 1,
            name: 'Home',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'USA',
            isDefault: true
        },
        {
            id: 2,
            name: 'Office',
            street: '456 Business Ave',
            city: 'New York',
            state: 'NY',
            zip: '10002',
            country: 'USA',
            isDefault: false
        }
    ];
    
    // Clear existing addresses
    addressesList.innerHTML = '';
    
    // Add addresses to the list
    addresses.forEach(address => {
        const addressCard = document.createElement('div');
        addressCard.className = 'address-card';
        
        addressCard.innerHTML = `
            <h4>${address.name} ${address.isDefault ? '(Default)' : ''}</h4>
            <p>${address.street}</p>
            <p>${address.city}, ${address.state} ${address.zip}</p>
            <p>${address.country}</p>
            <div class="address-actions">
                <button class="btn-edit">Edit</button>
                <button class="btn-delete">Delete</button>
                ${!address.isDefault ? '<button class="btn-set-default">Set as Default</button>' : ''}
            </div>
        `;
        
        addressesList.appendChild(addressCard);
    });
}

// Function to load wishlist
function loadWishlist() {
    const wishlistGrid = document.querySelector('.wishlist-grid');
    if (!wishlistGrid) return;
    
    // Sample wishlist data (in a real app, this would come from a server)
    const wishlistItems = [
        {
            id: 1,
            name: 'Men\'s Casual T-Shirt',
            price: 29.99,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'
        },
        {
            id: 2,
            name: 'Women\'s Summer Dress',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=500&fit=crop'
        }
    ];
    
    // Clear existing wishlist items
    wishlistGrid.innerHTML = '';
    
    // Add items to the wishlist
    wishlistItems.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        
        wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="wishlist-image">
            <h4>${item.name}</h4>
            <p>$${item.price}</p>
            <div class="wishlist-actions">
                <button class="btn-add-to-cart">Add to Cart</button>
                <button class="btn-remove">Remove</button>
            </div>
        `;
        
        wishlistGrid.appendChild(wishlistItem);
    });
} 