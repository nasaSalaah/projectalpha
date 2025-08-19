// JijiClone Application - Main JavaScript File

// Global state management
const AppState = {
    currentUser: null,
    wishlist: [],
    searchFilters: {},
    currentPage: 1,
    loading: false
};

// Utility Functions
const Utils = {
    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(amount);
    },

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Yesterday';
        if (diffDays <= 7) return `${diffDays} days ago`;
        if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        
        return date.toLocaleDateString('en-NG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Generate random ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Get URL parameters
    getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    // Set URL parameters
    setUrlParam(param, value) {
        const url = new URL(window.location);
        url.searchParams.set(param, value);
        window.history.pushState({}, '', url);
    },

    // Show loading spinner
    showLoading() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.classList.add('show');
        }
        AppState.loading = true;
    },

    // Hide loading spinner
    hideLoading() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.classList.remove('show');
        }
        AppState.loading = false;
    },

    // Show toast notification
    showToast(message, type = 'info') {
        // Create toast if it doesn't exist
        let toast = document.getElementById('toast-notification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast-notification';
            toast.className = 'toast-notification';
            document.body.appendChild(toast);
        }

        toast.className = `toast-notification toast-${type} show`;
        toast.textContent = message;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    },

    // Validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate phone number (Nigerian format)
    isValidPhone(phone) {
        const phoneRegex = /^(\+234|234|0)?[789][01]\d{8}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
};

// Authentication Functions
const Auth = {
    // Check if user is logged in
    isLoggedIn() {
        return !!localStorage.getItem('authToken');
    },

    // Get current user
    getCurrentUser() {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Login user
    async login(credentials) {
        try {
            Utils.showLoading();
            const response = await api.login(credentials);
            
            if (response.success) {
                AppState.currentUser = response.data.user;
                localStorage.setItem('currentUser', JSON.stringify(response.data.user));
                Utils.showToast('Login successful!', 'success');
                return response;
            }
        } catch (error) {
            Utils.showToast('Login failed: ' + error.message, 'error');
            throw error;
        } finally {
            Utils.hideLoading();
        }
    },

    // Register user
    async register(userData) {
        try {
            Utils.showLoading();
            const response = await api.register(userData);
            
            if (response.success) {
                AppState.currentUser = response.data.user;
                localStorage.setItem('currentUser', JSON.stringify(response.data.user));
                Utils.showToast('Registration successful!', 'success');
                return response;
            }
        } catch (error) {
            Utils.showToast('Registration failed: ' + error.message, 'error');
            throw error;
        } finally {
            Utils.hideLoading();
        }
    },

    // Logout user
    async logout() {
        try {
            await api.logout();
            AppState.currentUser = null;
            AppState.wishlist = [];
            Utils.showToast('Logged out successfully', 'success');
            window.location.href = 'index.html';
        } catch (error) {
            Utils.showToast('Logout failed: ' + error.message, 'error');
        }
    },

    // Forgot password
    async forgotPassword(email) {
        try {
            Utils.showLoading();
            await api.forgotPassword(email);
            Utils.showToast('Reset link sent to your email', 'success');
        } catch (error) {
            Utils.showToast('Failed to send reset link: ' + error.message, 'error');
            throw error;
        } finally {
            Utils.hideLoading();
        }
    }
};

// Product Functions
const Products = {
    // Load all products
    async loadProducts(filters = {}) {
        try {
            Utils.showLoading();
            const response = await api.getProducts(filters);
            return response.data || [];
        } catch (error) {
            Utils.showToast('Failed to load products: ' + error.message, 'error');
            return [];
        } finally {
            Utils.hideLoading();
        }
    },

    // Load single product
    async loadProduct(id) {
        try {
            Utils.showLoading();
            const response = await api.getProductById(id);
            return response.data;
        } catch (error) {
            Utils.showToast('Failed to load product: ' + error.message, 'error');
            throw error;
        } finally {
            Utils.hideLoading();
        }
    },

    // Search products
    async searchProducts(query, filters = {}) {
        try {
            Utils.showLoading();
            const response = await api.searchProducts(query, filters);
            return response.data || [];
        } catch (error) {
            Utils.showToast('Search failed: ' + error.message, 'error');
            return [];
        } finally {
            Utils.hideLoading();
        }
    },

    // Create product card HTML
    createProductCard(product) {
        const isInWishlist = AppState.wishlist.includes(product.id);
        const discountPercent = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.images[0]}" alt="${product.title}" loading="lazy">
                    <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                            onclick="toggleWishlist(${product.id})" 
                            data-product-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                    ${product.featured ? '<div class="product-badge">Featured</div>' : ''}
                    ${discountPercent > 0 ? `<div class="product-badge discount-badge">${discountPercent}% OFF</div>` : ''}
                </div>
                <div class="product-content">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        ${Utils.formatCurrency(product.price)}
                        ${product.originalPrice ? `<span class="original-price">${Utils.formatCurrency(product.originalPrice)}</span>` : ''}
                    </div>
                    <div class="product-meta">
                        <span class="product-condition">${product.condition}</span>
                        <span class="product-location">${product.location}</span>
                    </div>
                    <div class="product-date">${Utils.formatDate(product.datePosted)}</div>
                </div>
                <a href="product.html?id=${product.id}" class="product-link" aria-label="View ${product.title}"></a>
            </div>
        `;
    },

    // Render products grid
    renderProducts(products, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <i class="fas fa-search"></i>
                    </div>
                    <h3>No products found</h3>
                    <p>Try adjusting your search criteria or browse different categories.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = products.map(product => this.createProductCard(product)).join('');
    }
};

// Category Functions
const Categories = {
    // Load categories
    async loadCategories() {
        try {
            const response = await api.getCategories();
            return response.data || [];
        } catch (error) {
            Utils.showToast('Failed to load categories: ' + error.message, 'error');
            return [];
        }
    },

    // Create category card HTML
    createCategoryCard(category) {
        return `
            <a href="category.html?category=${category.id}" class="category-card">
                <div class="category-icon">
                    <i class="${category.icon}"></i>
                </div>
                <h3>${category.name}</h3>
                <p>${category.count} items</p>
            </a>
        `;
    },

    // Render categories
    renderCategories(categories, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = categories.map(category => this.createCategoryCard(category)).join('');
    }
};

// Wishlist Functions
const Wishlist = {
    // Toggle product in wishlist
    async toggle(productId) {
        if (!Auth.isLoggedIn()) {
            Utils.showToast('Please login to add items to wishlist', 'warning');
            return;
        }

        try {
            const isInWishlist = AppState.wishlist.includes(productId);
            
            if (isInWishlist) {
                await api.removeFromWishlist(productId);
                AppState.wishlist = AppState.wishlist.filter(id => id !== productId);
                Utils.showToast('Removed from wishlist', 'success');
            } else {
                await api.addToWishlist(productId);
                AppState.wishlist.push(productId);
                Utils.showToast('Added to wishlist', 'success');
            }

            this.updateUI();
            this.updateCount();
        } catch (error) {
            Utils.showToast('Failed to update wishlist: ' + error.message, 'error');
        }
    },

    // Load user's wishlist
    async load() {
        if (!Auth.isLoggedIn()) return;

        try {
            const response = await api.getWishlist();
            AppState.wishlist = response.data.map(product => product.id) || [];
            this.updateCount();
        } catch (error) {
            console.error('Failed to load wishlist:', error);
        }
    },

    // Update wishlist UI
    updateUI() {
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        wishlistBtns.forEach(btn => {
            const productId = parseInt(btn.dataset.productId);
            const isInWishlist = AppState.wishlist.includes(productId);
            btn.classList.toggle('active', isInWishlist);
        });
    },

    // Update wishlist count in navigation
    updateCount() {
        const countElements = document.querySelectorAll('.wishlist-count');
        countElements.forEach(element => {
            element.textContent = AppState.wishlist.length;
        });
    }
};

// Modal Functions
const Modal = {
    // Open modal
    open(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    },

    // Close modal
    close(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    },

    // Close on backdrop click
    setupBackdropClose() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.close(e.target.id);
            }
        });
    },

    // Close on close button click
    setupCloseButtons() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-modal')) {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.close(modal.id);
                }
            }
        });
    }
};

// Form Validation
const Validation = {
    // Validate form field
    validateField(field, rules) {
        const value = field.value.trim();
        const errors = [];

        if (rules.required && !value) {
            errors.push(`${rules.label || 'This field'} is required`);
        }

        if (rules.email && value && !Utils.isValidEmail(value)) {
            errors.push('Please enter a valid email address');
        }

        if (rules.phone && value && !Utils.isValidPhone(value)) {
            errors.push('Please enter a valid Nigerian phone number');
        }

        if (rules.minLength && value && value.length < rules.minLength) {
            errors.push(`${rules.label || 'This field'} must be at least ${rules.minLength} characters`);
        }

        if (rules.maxLength && value && value.length > rules.maxLength) {
            errors.push(`${rules.label || 'This field'} must not exceed ${rules.maxLength} characters`);
        }

        if (rules.match) {
            const matchField = document.getElementById(rules.match);
            if (matchField && value !== matchField.value) {
                errors.push('Passwords do not match');
            }
        }

        return errors;
    },

    // Show field error
    showFieldError(fieldId, errors) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = errors[0] || '';
            errorElement.classList.toggle('show', errors.length > 0);
        }

        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.toggle('error', errors.length > 0);
        }
    },

    // Clear field error
    clearFieldError(fieldId) {
        this.showFieldError(fieldId, []);
    },

    // Validate entire form
    validateForm(formElement, validationRules) {
        let isValid = true;
        const formData = {};

        Object.keys(validationRules).forEach(fieldId => {
            const field = formElement.querySelector(`#${fieldId}`);
            if (field) {
                const errors = this.validateField(field, validationRules[fieldId]);
                this.showFieldError(fieldId, errors);
                
                if (errors.length > 0) {
                    isValid = false;
                } else {
                    formData[fieldId] = field.value.trim();
                }
            }
        });

        return { isValid, formData };
    }
};

// Image handling
const ImageHandler = {
    // Preview uploaded images
    previewImages(input, containerId) {
        const container = document.getElementById(containerId);
        if (!container || !input.files) return;

        container.innerHTML = '';

        Array.from(input.files).forEach((file, index) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageDiv = document.createElement('div');
                    imageDiv.className = 'uploaded-image';
                    imageDiv.innerHTML = `
                        <img src="${e.target.result}" alt="Preview ${index + 1}">
                        <button type="button" class="remove-image" onclick="ImageHandler.removeImage(this, '${containerId}')">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    container.appendChild(imageDiv);
                };
                reader.readAsDataURL(file);
            }
        });
    },

    // Remove image from preview
    removeImage(button, containerId) {
        button.parentElement.remove();
        
        // Update file input
        const container = document.getElementById(containerId);
        const input = container.parentElement.querySelector('input[type="file"]');
        if (input) {
            // Reset file input since we can't remove individual files
            const remainingImages = container.querySelectorAll('.uploaded-image').length;
            if (remainingImages === 0) {
                input.value = '';
            }
        }
    },

    // Setup image upload drag and drop
    setupDragAndDrop(uploadZoneId, inputId) {
        const uploadZone = document.getElementById(uploadZoneId);
        const input = document.getElementById(inputId);

        if (!uploadZone || !input) return;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadZone.addEventListener(eventName, () => uploadZone.classList.add('drag-over'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, () => uploadZone.classList.remove('drag-over'), false);
        });

        uploadZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            input.files = files;
            this.previewImages(input, 'uploaded-images');
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
    }
};

// Search functionality
const Search = {
    // Setup search functionality
    setup() {
        const searchInput = document.getElementById('main-search');
        const locationSelect = document.getElementById('location-select');
        
        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce(this.handleSearch.bind(this), 300));
        }
        
        if (locationSelect) {
            locationSelect.addEventListener('change', this.handleLocationChange.bind(this));
        }
    },

    // Handle search input
    async handleSearch(e) {
        const query = e.target.value.trim();
        if (query.length < 2) return;

        AppState.searchFilters.search = query;
        
        // Only perform search on category page
        if (window.location.pathname.includes('category.html')) {
            await this.performSearch();
        }
    },

    // Handle location change
    async handleLocationChange(e) {
        AppState.searchFilters.location = e.target.value;
        
        if (window.location.pathname.includes('category.html')) {
            await this.performSearch();
        }
    },

    // Perform search with current filters
    async performSearch() {
        const products = await Products.searchProducts(
            AppState.searchFilters.search || '', 
            AppState.searchFilters
        );
        Products.renderProducts(products, 'products-container');
        this.updateResultsCount(products.length);
    },

    // Update results count
    updateResultsCount(count) {
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            resultsCount.textContent = `${count} products found`;
        }
    }
};

// Page-specific initialization functions
const PageHandlers = {
    // Initialize home page
    initHomePage() {
        this.loadHomePageData();
        Search.setup();
    },

    // Load home page data
    async loadHomePageData() {
        try {
            // Load categories
            const categories = await Categories.loadCategories();
            Categories.renderCategories(categories, 'categories-grid');

            // Load featured products
            const featuredProducts = await Products.loadProducts({ featured: true });
            Products.renderProducts(featuredProducts.slice(0, 8), 'featured-products');

            // Load recent products
            const recentProducts = await Products.loadProducts({ sort: 'newest' });
            Products.renderProducts(recentProducts.slice(0, 8), 'recent-products');

        } catch (error) {
            console.error('Failed to load home page data:', error);
        }
    },

    // Initialize category page
    async initCategoryPage() {
        Search.setup();
        this.setupFilters();
        this.setupSorting();
        this.setupViewToggle();
        await this.loadCategoryProducts();
    },

    // Setup category filters
    setupFilters() {
        // Price filters
        const minPrice = document.getElementById('min-price');
        const maxPrice = document.getElementById('max-price');
        
        if (minPrice && maxPrice) {
            [minPrice, maxPrice].forEach(input => {
                input.addEventListener('change', Utils.debounce(() => {
                    AppState.searchFilters.minPrice = minPrice.value;
                    AppState.searchFilters.maxPrice = maxPrice.value;
                    Search.performSearch();
                }, 500));
            });
        }

        // Condition filters
        const conditionCheckboxes = document.querySelectorAll('input[name="condition"]');
        conditionCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const checkedConditions = Array.from(conditionCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                AppState.searchFilters.condition = checkedConditions.join(',');
                Search.performSearch();
            });
        });

        // Reset filters
        const resetBtn = document.getElementById('reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                AppState.searchFilters = {};
                document.querySelectorAll('.filter-select, .price-input').forEach(input => {
                    input.value = '';
                });
                document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
                Search.performSearch();
            });
        }
    },

    // Setup sorting
    setupSorting() {
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                AppState.searchFilters.sort = e.target.value;
                Search.performSearch();
            });
        }
    },

    // Setup view toggle
    setupViewToggle() {
        const viewBtns = document.querySelectorAll('.view-btn');
        const container = document.getElementById('products-container');
        
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                viewBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const view = btn.dataset.view;
                if (container) {
                    container.className = `products-grid view-${view}`;
                }
            });
        });
    },

    // Load category products
    async loadCategoryProducts() {
        const categoryId = Utils.getUrlParam('category');
        const location = Utils.getUrlParam('location');
        
        const filters = {};
        if (categoryId) filters.category = categoryId;
        if (location) filters.location = location;

        const products = await Products.loadProducts(filters);
        Products.renderProducts(products, 'products-container');
        Search.updateResultsCount(products.length);
    },

    // Initialize product page
    async initProductPage() {
        const productId = Utils.getUrlParam('id');
        if (!productId) {
            window.location.href = 'index.html';
            return;
        }

        try {
            const product = await Products.loadProduct(productId);
            this.renderProductDetails(product);
            await this.loadRelatedProducts(product.category);
        } catch (error) {
            Utils.showToast('Product not found', 'error');
            setTimeout(() => window.location.href = 'index.html', 2000);
        }
    },

    // Render product details
    renderProductDetails(product) {
        const container = document.getElementById('product-content');
        if (!container) return;

        const isInWishlist = AppState.wishlist.includes(product.id);
        
        container.innerHTML = `
            <div class="product-gallery">
                <div class="main-image" onclick="openLightbox(0)">
                    <img src="${product.images[0]}" alt="${product.title}">
                </div>
                <div class="image-thumbnails">
                    ${product.images.map((image, index) => `
                        <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage(${index})">
                            <img src="${image}" alt="Thumbnail ${index + 1}">
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="product-info">
                <h1>${product.title}</h1>
                
                <div class="product-price-section">
                    <span class="current-price">${Utils.formatCurrency(product.price)}</span>
                    ${product.originalPrice ? `<span class="original-price">${Utils.formatCurrency(product.originalPrice)}</span>` : ''}
                </div>

                <div class="product-details">
                    <div class="detail-row">
                        <span class="detail-label">Condition</span>
                        <span class="detail-value">${product.condition}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Location</span>
                        <span class="detail-value">${product.location}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Posted</span>
                        <span class="detail-value">${Utils.formatDate(product.datePosted)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Views</span>
                        <span class="detail-value">${product.views}</span>
                    </div>
                </div>

                <div class="product-actions">
                    <button class="btn-primary" onclick="contactSeller(${product.seller.id})">
                        <i class="fas fa-comments"></i>
                        Contact Seller
                    </button>
                    <button class="btn-secondary ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                        <i class="fas fa-heart"></i>
                        ${isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                </div>

                <div class="seller-card">
                    <div class="seller-info">
                        <div class="seller-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="seller-details">
                            <h3>${product.seller.name}</h3>
                            <div class="seller-rating">
                                <div class="stars">
                                    ${this.renderStars(product.seller.rating)}
                                </div>
                                <span>${product.seller.rating} (${product.seller.reviewCount} reviews)</span>
                            </div>
                            <p>Member since ${Utils.formatDate(product.seller.memberSince)}</p>
                        </div>
                    </div>
                    <a href="profile.html?id=${product.seller.id}" class="btn-secondary">View Profile</a>
                </div>
            </div>

            <div class="product-description">
                <h2>Description</h2>
                <p>${product.description}</p>
                
                ${product.features && product.features.length > 0 ? `
                    <h3>Key Features</h3>
                    <ul class="features-list">
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    },

    // Render star rating
    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let stars = '';
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star filled"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt filled"></i>';
        }
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        return stars;
    },

    // Load related products
    async loadRelatedProducts(category) {
        const products = await Products.loadProducts({ category, limit: 4 });
        Products.renderProducts(products, 'related-products');
    }
};

// Global functions (called from HTML)
window.toggleWishlist = async (productId) => {
    await Wishlist.toggle(productId);
};

window.openModal = (modalId) => {
    Modal.open(modalId);
};

window.closeModal = (modalId) => {
    Modal.close(modalId);
};

window.logout = async () => {
    await Auth.logout();
};

window.contactSeller = (sellerId) => {
    if (!Auth.isLoggedIn()) {
        Utils.showToast('Please login to contact sellers', 'warning');
        window.location.href = 'login.html';
        return;
    }
    Modal.open('contact-modal');
};

window.getUrlParam = Utils.getUrlParam;
window.isLoggedIn = Auth.isLoggedIn;
window.getCurrentUserId = () => {
    const user = Auth.getCurrentUser();
    return user ? user.id : null;
};

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
    // Setup global event listeners
    Modal.setupBackdropClose();
    Modal.setupCloseButtons();

    // Load user wishlist if logged in
    if (Auth.isLoggedIn()) {
        AppState.currentUser = Auth.getCurrentUser();
        await Wishlist.load();
    }

    // Update wishlist count in UI
    Wishlist.updateCount();

    // Initialize page-specific functionality
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path === '/') {
        PageHandlers.initHomePage();
    } else if (path.includes('category.html')) {
        PageHandlers.initCategoryPage();
    } else if (path.includes('product.html')) {
        PageHandlers.initProductPage();
    }
});

// Load categories for all pages
async function loadCategories() {
    const categories = await Categories.loadCategories();
    Categories.renderCategories(categories, 'categories-grid');
}

// Load featured products
async function loadFeaturedProducts() {
    const products = await Products.loadProducts({ featured: true, limit: 8 });
    Products.renderProducts(products, 'featured-products');
}

// Load recent products
async function loadRecentProducts() {
    const products = await Products.loadProducts({ sort: 'newest', limit: 8 });
    Products.renderProducts(products, 'recent-products');
}

// Update wishlist count
function updateWishlistCount() {
    Wishlist.updateCount();
}

// Initialize category page
async function initializeCategoryPage() {
    await PageHandlers.initCategoryPage();
}

// Load product details
async function loadProductDetails(productId) {
    await PageHandlers.initProductPage();
}

// Initialize post form (post.html specific)
function initializePostForm() {
    // Post form initialization will be handled in post-specific script
}

// Load seller profile
async function loadSellerProfile(sellerId) {
    // Profile loading will be handled in profile-specific script
}

// Load wishlist
async function loadWishlist() {
    // Wishlist loading will be handled in wishlist-specific script
}

// Load conversations
async function loadConversations() {
    // Messages loading will be handled in messages-specific script
}

// Select conversation
function selectConversation(conversationId) {
    // Conversation selection will be handled in messages-specific script
}

// Social login
function socialLogin(provider) {
    Utils.showToast(`${provider} login coming soon!`, 'info');
}

// Show forgot password modal
function showForgotPassword() {
    Modal.open('forgot-password-modal');
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const btn = input.nextElementSibling;
    const icon = btn.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// Handle login form submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(loginForm);
            const credentials = {
                email: formData.get('email'),
                password: formData.get('password')
            };

            try {
                await Auth.login(credentials);
                window.location.href = 'index.html';
            } catch (error) {
                const errorElement = document.getElementById('form-error');
                if (errorElement) {
                    errorElement.textContent = error.message;
                    errorElement.classList.add('show');
                }
            }
        });
    }

    // Handle register form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const validationRules = {
                'first-name': { required: true, label: 'First name' },
                'last-name': { required: true, label: 'Last name' },
                'register-email': { required: true, email: true, label: 'Email' },
                'phone': { required: true, phone: true, label: 'Phone' },
                'location': { required: true, label: 'Location' },
                'register-password': { required: true, minLength: 8, label: 'Password' },
                'confirm-password': { required: true, match: 'register-password', label: 'Confirm password' }
            };

            const { isValid, formData } = Validation.validateForm(registerForm, validationRules);
            
            if (!isValid) return;

            // Check terms acceptance
            const acceptTerms = document.getElementById('accept-terms').checked;
            if (!acceptTerms) {
                Validation.showFieldError('terms', ['You must accept the terms and conditions']);
                return;
            }

            const userData = {
                firstName: formData['first-name'],
                lastName: formData['last-name'],
                email: formData['register-email'],
                phone: formData.phone,
                location: formData.location,
                password: formData['register-password'],
                marketingEmails: document.getElementById('marketing-emails').checked
            };

            try {
                await Auth.register(userData);
                window.location.href = 'index.html';
            } catch (error) {
                const errorElement = document.getElementById('form-error');
                if (errorElement) {
                    errorElement.textContent = error.message;
                    errorElement.classList.add('show');
                }
            }
        });
    }

    // Handle forgot password form
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('forgot-email').value;
            
            try {
                await Auth.forgotPassword(email);
                const successElement = document.getElementById('forgot-form-success');
                if (successElement) {
                    successElement.textContent = 'Reset link sent to your email';
                    successElement.classList.add('show');
                }
            } catch (error) {
                const errorElement = document.getElementById('forgot-form-error');
                if (errorElement) {
                    errorElement.textContent = error.message;
                    errorElement.classList.add('show');
                }
            }
        });
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        Utils, Auth, Products, Categories, Wishlist, Modal, Validation, ImageHandler, Search, PageHandlers 
    };
}