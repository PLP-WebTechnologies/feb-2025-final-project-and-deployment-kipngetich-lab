// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');

// Sample product data for products page
const products = [
    {
        id: 1,
        name: 'Wireless Earbuds',
        price: 79.99,
        category: 'audio',
        image: "https://m.media-amazon.com/images/I/716VSEyG3VL._AC_UY218_.jpg"
    },
    {
        id: 2,
        name: 'Smart Watch',
        price: 149.99,
        category: 'wearables',
        image: 'https://m.media-amazon.com/images/I/71SZNup1qrL._AC_UY218_.jpg'
    },
    {
        id: 3,
        name: 'Bluetooth Speaker',
        price: 59.99,
        category: 'audio',
        image: 'https://m.media-amazon.com/images/I/81s8Li6reBL.__AC_SX300_SY300_QL70_FMwebp_.jpg'
    },
    {
        id: 4,
        name: 'Phone Stand',
        price: 19.99,
        category: 'accessories',
        image: 'https://m.media-amazon.com/images/I/61Hx1QqegeL._AC_UY218_.jpg'
    },
    {
        id: 5,
        name: 'Wireless Charger',
        price: 29.99,
        category: 'accessories',
        image: 'https://m.media-amazon.com/images/I/61VwfUI+-eL._AC_UY218_.jpg'
    },
    {
        id: 6,
        name: 'Fitness Tracker',
        price: 89.99,
        category: 'wearables',
        image: 'https://m.media-amazon.com/images/I/710qfzxfb7L._AC_UY218_.jpg'
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the app
function init() {
    setupEventListeners();
    updateCartCount();
    
    // Check if we're on the products page
    if (document.querySelector('.product-listing')) {
        renderProducts();
        setupProductFilters();
    }
    
    // Check if we're on the contact page
    if (document.getElementById('contactForm')) {
        setupContactForm();
    }
}

// Set up event listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Cart button click
if (cartBtn) {
    cartBtn.addEventListener('click', showCartItems);
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
}

// Toggle mobile menu
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
}

// Update cart count display
function updateCartCount() {
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Render products on products page
function renderProducts(filteredProducts = products) {
    const productGrid = document.getElementById('all-products');
    
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add product to cart
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show feedback
    alert(`${product.name} added to cart!`);
}

// Set up product filters
function setupProductFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    
    if (categoryFilter && priceFilter) {
        categoryFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);
    }
}

// Filter products based on selected filters
function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const price = document.getElementById('price-filter').value;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Filter by price
    if (price !== 'all') {
        const [min, max] = price.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => {
            return product.price >= min && (max ? product.price <= max : true);
        });
    }
    
    renderProducts(filteredProducts);
}

// Set up contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For this example, we'll just show a success message
            alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);