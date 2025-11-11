// Product Data with real images from the internet
const products = [
    { 
        id: 1, 
        name: "Fresh Tomatoes", 
        price: 2.99, 
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 2, 
        name: "Ripe Bananas", 
        price: 1.49, 
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 3, 
        name: "Red Apples", 
        price: 3.49, 
        image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 4, 
        name: "Organic Carrots", 
        price: 2.29, 
        image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 5, 
        name: "Green Lettuce", 
        price: 1.99, 
        image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 6, 
        name: "Fresh Oranges", 
        price: 4.49, 
        image: "https://images.unsplash.com/photo-1547514701-42782101795e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 7, 
        name: "Potatoes", 
        price: 3.99, 
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
    },
    { 
        id: 8, 
        name: "Onions", 
        price: 1.99, 
        image: "https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
    }
];

// Cart State
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const featuredProductsGrid = document.getElementById('featuredProductsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTax = document.getElementById('cartTax');
const cartDiscount = document.getElementById('cartDiscount');
const cartTotal = document.getElementById('cartTotal');
const discountRow = document.getElementById('discountRow');
const checkoutBtn = document.getElementById('checkoutBtn');
const overlay = document.getElementById('overlay');
const toast = document.getElementById('toast');
const orderSummaryPage = document.getElementById('orderSummaryPage');
const orderItems = document.getElementById('orderItems');
const orderSubtotal = document.getElementById('orderSubtotal');
const orderTax = document.getElementById('orderTax');
const orderDiscount = document.getElementById('orderDiscount');
const orderTotal = document.getElementById('orderTotal');
const orderDiscountRow = document.getElementById('orderDiscountRow');
const confirmOrderBtn = document.getElementById('confirmOrderBtn');
const homePage = document.getElementById('homePage');
const productsPage = document.getElementById('productsPage');
const aboutPage = document.getElementById('aboutPage');
const contactPage = document.getElementById('contactPage');
const navLinks = document.querySelectorAll('.nav-links a');
const shopNowBtn = document.getElementById('shopNowBtn');
const learnMoreBtn = document.getElementById('learnMoreBtn');
const viewAllProductsBtn = document.getElementById('viewAllProductsBtn');
const footerLinks = document.querySelectorAll('.footer-section a');

// Initialize the application
function init() {
    renderProducts();
    renderFeaturedProducts();
    loadCartFromStorage();
    updateCartUI();
    setupEventListeners();
    setupNavigation();
}

// Render products to the products page
function renderProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Render featured products to the home page
function renderFeaturedProducts() {
    featuredProductsGrid.innerHTML = '';
    // Show only first 4 products as featured
    const featuredProducts = products.slice(0, 4);
    
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart-btn" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
        featuredProductsGrid.appendChild(productCard);
    });
}

// Animate products when page is shown
function animateProducts() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        card.classList.add('animate');
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Show specific page and hide others
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the selected page
    document.getElementById(pageId).classList.add('active');
    
    // Special handling for products page
    if (pageId === 'productsPage') {
        animateProducts();
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Setup navigation between pages
function setupNavigation() {
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show the selected page
            showPage(page + 'Page');
        });
    });

    // Footer links
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('data-page')) {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                document.querySelector(`.nav-links a[data-page="${page}"]`).classList.add('active');
                
                // Show the selected page
                showPage(page + 'Page');
            }
        });
    });

    // Hero buttons functionality
    shopNowBtn.addEventListener('click', function() {
        // Navigate to products page
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('.nav-links a[data-page="products"]').classList.add('active');
        
        showPage('productsPage');
    });

    learnMoreBtn.addEventListener('click', function() {
        // Navigate to about page
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('.nav-links a[data-page="about"]').classList.add('active');
        
        showPage('aboutPage');
    });

    // View all products button
    viewAllProductsBtn.addEventListener('click', function() {
        // Navigate to products page
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('.nav-links a[data-page="products"]').classList.add('active');
        
        showPage('productsPage');
    });
}

// Setup event listeners
function setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    // Cart icon click
    cartIcon.addEventListener('click', openCart);

    // Close cart
    closeCart.addEventListener('click', closeCartModal);
    overlay.addEventListener('click', closeCartModal);

    // Checkout button
    checkoutBtn.addEventListener('click', goToCheckout);

    // Confirm order button
    confirmOrderBtn.addEventListener('click', confirmOrder);
}

// Cart functions
function addToCart(productId) {
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
            image: product.image,
            quantity: 1
        });
    }

    updateCartUI();
    saveCartToStorage();
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
        saveCartToStorage();
    }
}

function calculateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05;
    let discount = 0;
    
    // Apply 10% discount if subtotal > $50
    if (subtotal > 50) {
        discount = subtotal * 0.1;
    }
    
    const total = subtotal + tax - discount;
    
    return {
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        discount: discount.toFixed(2),
        total: total.toFixed(2),
        hasDiscount: discount > 0
    };
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart to see them here</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">$${item.price.toFixed(2)}</div>
                    <div class="item-controls">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }

    // Update cart totals
    const totals = calculateCartTotals();
    cartSubtotal.textContent = `$${totals.subtotal}`;
    cartTax.textContent = `$${totals.tax}`;
    cartTotal.textContent = `$${totals.total}`;
    
    if (totals.hasDiscount) {
        discountRow.style.display = 'flex';
        cartDiscount.textContent = `-$${totals.discount}`;
    } else {
        discountRow.style.display = 'none';
    }

    // Add event listeners to cart item buttons
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            if (item) {
                updateQuantity(id, item.quantity - 1);
            }
        });
    });

    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            if (item) {
                updateQuantity(id, item.quantity + 1);
            }
        });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

function openCart() {
    cartModal.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    cartModal.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showToast(message) {
    toast.querySelector('span').textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function goToCheckout() {
    if (cart.length === 0) {
        showToast("Your cart is empty. Add some products first!");
        return;
    }
    
    closeCartModal();
    showPage('orderSummaryPage');
    updateOrderSummary();
}

function updateOrderSummary() {
    orderItems.innerHTML = '';
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div>
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <div>$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        orderItems.appendChild(orderItem);
    });

    const totals = calculateCartTotals();
    orderSubtotal.textContent = `$${totals.subtotal}`;
    orderTax.textContent = `$${totals.tax}`;
    orderTotal.textContent = `$${totals.total}`;
    
    if (totals.hasDiscount) {
        orderDiscountRow.style.display = 'flex';
        orderDiscount.textContent = `-$${totals.discount}`;
    } else {
        orderDiscountRow.style.display = 'none';
    }
}

function confirmOrder() {
    if (cart.length === 0) {
        showToast("Your cart is empty. Add some products first!");
        return;
    }
    
    // Show alert confirmation
    alert("Order Confirmed (Demo)\n\nThank you for your order! Your items will be processed shortly. This is a demo confirmation.");
    
    // In a real application, this would send the order to a backend
    cart = [];
    updateCartUI();
    saveCartToStorage();
    
    // Return to home page
    showPage('homePage');
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('.nav-links a[data-page="home"]').classList.add('active');
}

// Storage functions
function saveCartToStorage() {
    localStorage.setItem('hamimarket-cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('hamimarket-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Initialize the app
init();