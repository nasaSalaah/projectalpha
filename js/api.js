// API Layer for JijiClone - Handles all backend communication
class APIService {
    constructor() {
        this.baseURL = 'http://localhost:8080/api';
        this.token = localStorage.getItem('authToken');
        this.headers = {
            'Content-Type': 'application/json',
        };
        
        if (this.token) {
            this.headers['Authorization'] = `Bearer ${this.token}`;
        }
    }

    // Helper method for HTTP requests
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.headers,
            ...options
        };

        try {
            // For demo purposes, use mock data instead of real API calls
            if (typeof mockData !== 'undefined') {
                return this.simulateAPICall(endpoint, options);
            }

            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    // Simulate API calls using mock data for demo
    async simulateAPICall(endpoint, options = {}) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 200));

        const method = options.method || 'GET';
        const body = options.body ? JSON.parse(options.body) : null;

        // Parse endpoint and handle different API calls
        if (endpoint === '/products') {
            if (method === 'GET') {
                return { 
                    success: true, 
                    data: mockData.products,
                    total: mockData.products.length,
                    page: 1,
                    limit: 20
                };
            } else if (method === 'POST') {
                const newProduct = {
                    id: mockData.products.length + 1,
                    ...body,
                    seller: mockData.currentUser,
                    datePosted: new Date().toISOString().split('T')[0],
                    views: 0,
                    likes: 0,
                    featured: false,
                    status: 'active'
                };
                mockData.products.unshift(newProduct);
                return { success: true, data: newProduct };
            }
        }

        if (endpoint.startsWith('/products/')) {
            const productId = parseInt(endpoint.split('/')[2]);
            const product = mockData.products.find(p => p.id === productId);
            if (product) {
                return { success: true, data: product };
            }
            throw new Error('Product not found');
        }

        if (endpoint === '/categories') {
            return { success: true, data: mockData.categories };
        }

        if (endpoint === '/auth/login') {
            if (body.email === 'demo@jijiclone.com' && body.password === 'demo123') {
                const token = 'demo-token-' + Date.now();
                localStorage.setItem('authToken', token);
                localStorage.setItem('currentUser', JSON.stringify(mockData.currentUser));
                return { 
                    success: true, 
                    data: { 
                        token, 
                        user: mockData.currentUser 
                    } 
                };
            }
            throw new Error('Invalid credentials');
        }

        if (endpoint === '/auth/register') {
            const newUser = {
                id: mockData.users.length + 1,
                ...body,
                memberSince: new Date().toISOString().split('T')[0],
                rating: 0,
                reviewCount: 0,
                verified: false
            };
            mockData.users.push(newUser);
            const token = 'demo-token-' + Date.now();
            localStorage.setItem('authToken', token);
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            return { 
                success: true, 
                data: { 
                    token, 
                    user: newUser 
                } 
            };
        }

        if (endpoint === '/wishlist') {
            if (method === 'GET') {
                const wishlistProducts = mockData.products.filter(p => 
                    mockData.wishlist.includes(p.id)
                );
                return { success: true, data: wishlistProducts };
            } else if (method === 'POST') {
                const { productId } = body;
                if (!mockData.wishlist.includes(productId)) {
                    mockData.wishlist.push(productId);
                }
                return { success: true };
            } else if (method === 'DELETE') {
                const productId = parseInt(endpoint.split('/')[2]);
                mockData.wishlist = mockData.wishlist.filter(id => id !== productId);
                return { success: true };
            }
        }

        if (endpoint === '/messages') {
            return { success: true, data: mockData.conversations };
        }

        if (endpoint.startsWith('/messages/')) {
            const conversationId = parseInt(endpoint.split('/')[2]);
            const conversation = mockData.conversations.find(c => c.id === conversationId);
            if (conversation) {
                const messages = mockData.messages.filter(m => m.conversationId === conversationId);
                return { success: true, data: messages };
            }
            return { success: true, data: [] };
        }

        if (endpoint.startsWith('/reviews/')) {
            const sellerId = parseInt(endpoint.split('/')[2]);
            const reviews = mockData.reviews.filter(r => r.sellerId === sellerId);
            return { success: true, data: reviews };
        }

        if (endpoint === '/locations') {
            return { success: true, data: mockData.locations };
        }

        // Default response for unhandled endpoints
        return { success: true, data: [] };
    }

    // Product endpoints
    async getProducts(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString ? `/products?${queryString}` : '/products';
        return await this.request(endpoint);
    }

    async getProductById(id) {
        return await this.request(`/products/${id}`);
    }

    async createProduct(productData) {
        return await this.request('/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    }

    async updateProduct(id, productData) {
        return await this.request(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
    }

    async deleteProduct(id) {
        return await this.request(`/products/${id}`, {
            method: 'DELETE'
        });
    }

    async searchProducts(query, filters = {}) {
        const params = { search: query, ...filters };
        return await this.getProducts(params);
    }

    // Category endpoints
    async getCategories() {
        return await this.request('/categories');
    }

    async getCategoryById(id) {
        return await this.request(`/categories/${id}`);
    }

    // Authentication endpoints
    async login(credentials) {
        return await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    async register(userData) {
        return await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        return { success: true };
    }

    async forgotPassword(email) {
        return await this.request('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email })
        });
    }

    async resetPassword(token, password) {
        return await this.request('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({ token, password })
        });
    }

    // User endpoints
    async getCurrentUser() {
        return await this.request('/auth/me');
    }

    async updateProfile(userData) {
        return await this.request('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    }

    async changePassword(passwordData) {
        return await this.request('/auth/change-password', {
            method: 'POST',
            body: JSON.stringify(passwordData)
        });
    }

    // Wishlist endpoints
    async getWishlist() {
        return await this.request('/wishlist');
    }

    async addToWishlist(productId) {
        return await this.request('/wishlist', {
            method: 'POST',
            body: JSON.stringify({ productId })
        });
    }

    async removeFromWishlist(productId) {
        return await this.request(`/wishlist/${productId}`, {
            method: 'DELETE'
        });
    }

    // Message endpoints
    async getConversations() {
        return await this.request('/messages');
    }

    async getMessages(conversationId) {
        return await this.request(`/messages/${conversationId}`);
    }

    async sendMessage(conversationId, content, type = 'text') {
        return await this.request('/messages', {
            method: 'POST',
            body: JSON.stringify({ conversationId, content, type })
        });
    }

    async createConversation(productId, sellerId) {
        return await this.request('/messages/conversations', {
            method: 'POST',
            body: JSON.stringify({ productId, sellerId })
        });
    }

    async markMessageAsRead(messageId) {
        return await this.request(`/messages/${messageId}/read`, {
            method: 'POST'
        });
    }

    // Review endpoints
    async getReviews(sellerId) {
        return await this.request(`/reviews/${sellerId}`);
    }

    async createReview(reviewData) {
        return await this.request('/reviews', {
            method: 'POST',
            body: JSON.stringify(reviewData)
        });
    }

    async updateReview(reviewId, reviewData) {
        return await this.request(`/reviews/${reviewId}`, {
            method: 'PUT',
            body: JSON.stringify(reviewData)
        });
    }

    async deleteReview(reviewId) {
        return await this.request(`/reviews/${reviewId}`, {
            method: 'DELETE'
        });
    }

    // Location endpoints
    async getLocations() {
        return await this.request('/locations');
    }

    async getStatesByCountry(country = 'Nigeria') {
        return await this.request(`/locations/states?country=${country}`);
    }

    async getLGAsByState(state) {
        return await this.request(`/locations/lgas?state=${state}`);
    }

    // Upload endpoints
    async uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);
        
        return await this.request('/upload/image', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${this.token}`
                // Don't set Content-Type for FormData, let browser set it
            }
        });
    }

    async uploadMultipleImages(files) {
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append('images', file);
        });
        
        return await this.request('/upload/images', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
    }

    // Statistics endpoints
    async getDashboardStats() {
        return await this.request('/stats/dashboard');
    }

    async getProductStats(productId) {
        return await this.request(`/stats/products/${productId}`);
    }

    // Report endpoints
    async reportProduct(productId, reason, details) {
        return await this.request('/reports/products', {
            method: 'POST',
            body: JSON.stringify({ productId, reason, details })
        });
    }

    async reportUser(userId, reason, details) {
        return await this.request('/reports/users', {
            method: 'POST',
            body: JSON.stringify({ userId, reason, details })
        });
    }

    // Notification endpoints
    async getNotifications() {
        return await this.request('/notifications');
    }

    async markNotificationAsRead(notificationId) {
        return await this.request(`/notifications/${notificationId}/read`, {
            method: 'POST'
        });
    }

    async markAllNotificationsAsRead() {
        return await this.request('/notifications/read-all', {
            method: 'POST'
        });
    }

    // Helper methods
    setAuthToken(token) {
        this.token = token;
        this.headers['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('authToken', token);
    }

    clearAuthToken() {
        this.token = null;
        delete this.headers['Authorization'];
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
    }

    isAuthenticated() {
        return !!this.token;
    }
}

// Create global API instance
const api = new APIService();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { APIService, api };
} else if (typeof window !== 'undefined') {
    window.api = api;
    window.APIService = APIService;
}