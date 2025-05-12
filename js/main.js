// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const featuredProducts = document.getElementById('featured-products');

// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "https://m.media-amazon.com/images/I/716VSEyG3VL._AC_UY218_.jpg"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "https://m.media-amazon.com/images/I/71SZNup1qrL._AC_UY218_.jpg"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "https://m.media-amazon.com/images/I/81s8Li6reBL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 49.99,
        image: "https://m.media-amazon.com/images/I/41JEk625CEL._AC_SR250,250_QL65_.jpg"
    }
];

let cart = [];

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Display featured products
function displayFeaturedProducts() {
    featuredProducts.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Add event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart function
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    updateCartCount();
    showCartNotification(product.name);
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show cart notification
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${productName} added to cart!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// Display cart items
function showCartItems() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Create a modal for better UX
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    
    let cartContent = '<div class="cart-content"><h2>Your Cart</h2><ul class="cart-list">';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartContent += `
            <li class="cart-item">
                <div class="cart-item-info">
                    <span>${item.name} x${item.quantity}</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                </div>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            </li>
        `;
        total += itemTotal;
    });
    
    cartContent += `</ul><div class="cart-total">Total: $${total.toFixed(2)}</div></div>`;
    
    modal.innerHTML = cartContent;
    document.body.appendChild(modal);
    
    // Add click event to close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Add event listeners to all remove buttons
    modal.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Remove item from cart
function removeFromCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        // Remove the item completely
        cart.splice(itemIndex, 1);
        updateCartCount();
        
        // Close and reopen cart to refresh the view
        document.querySelector('.cart-modal')?.remove();
        showCartItems();
        
        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedProducts();
    
    // Check for cart in localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
    
    // Save cart to localStorage before unload
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    });

    // Add click event to cart button
    cartBtn.addEventListener('click', showCartItems);
});