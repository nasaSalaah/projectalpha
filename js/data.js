// Mock Data for JijiClone Marketplace
const mockData = {
    categories: [
        {
            id: 1,
            name: "Electronics",
            icon: "fas fa-mobile-alt",
            count: 1250,
            subcategories: [
                { id: 101, name: "Phones & Tablets", count: 450 },
                { id: 102, name: "Laptops & Computers", count: 320 },
                { id: 103, name: "Audio & Video", count: 280 },
                { id: 104, name: "Gaming", count: 200 }
            ]
        },
        {
            id: 2,
            name: "Vehicles",
            icon: "fas fa-car",
            count: 890,
            subcategories: [
                { id: 201, name: "Cars", count: 520 },
                { id: 202, name: "Motorcycles", count: 180 },
                { id: 203, name: "Trucks & Buses", count: 120 },
                { id: 204, name: "Auto Parts", count: 70 }
            ]
        },
        {
            id: 3,
            name: "Fashion",
            icon: "fas fa-tshirt",
            count: 760,
            subcategories: [
                { id: 301, name: "Men's Fashion", count: 280 },
                { id: 302, name: "Women's Fashion", count: 320 },
                { id: 303, name: "Kids' Fashion", count: 160 }
            ]
        },
        {
            id: 4,
            name: "Home & Garden",
            icon: "fas fa-home",
            count: 540,
            subcategories: [
                { id: 401, name: "Furniture", count: 220 },
                { id: 402, name: "Home Appliances", count: 180 },
                { id: 403, name: "Garden & Outdoor", count: 140 }
            ]
        },
        {
            id: 5,
            name: "Health & Beauty",
            icon: "fas fa-heart",
            count: 430,
            subcategories: [
                { id: 501, name: "Skincare", count: 180 },
                { id: 502, name: "Makeup", count: 150 },
                { id: 503, name: "Health Products", count: 100 }
            ]
        },
        {
            id: 6,
            name: "Sports & Fitness",
            icon: "fas fa-dumbbell",
            count: 350,
            subcategories: [
                { id: 601, name: "Gym Equipment", count: 140 },
                { id: 602, name: "Sports Gear", count: 120 },
                { id: 603, name: "Outdoor Activities", count: 90 }
            ]
        },
        {
            id: 7,
            name: "Books & Education",
            icon: "fas fa-book",
            count: 290,
            subcategories: [
                { id: 701, name: "Textbooks", count: 150 },
                { id: 702, name: "Fiction", count: 80 },
                { id: 703, name: "Educational Materials", count: 60 }
            ]
        },
        {
            id: 8,
            name: "Services",
            icon: "fas fa-tools",
            count: 420,
            subcategories: [
                { id: 801, name: "Home Services", count: 180 },
                { id: 802, name: "Professional Services", count: 140 },
                { id: 803, name: "Tutoring", count: 100 }
            ]
        }
    ],

    products: [
        {
            id: 1,
            title: "iPhone 14 Pro Max 256GB - Space Black",
            price: 850000,
            originalPrice: 950000,
            category: "Electronics",
            subcategory: "Phones & Tablets",
            condition: "used",
            location: "Lagos",
            state: "lagos",
            lga: "Ikeja",
            images: [
                "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/17663672/pexels-photo-17663672.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/18525574/pexels-photo-18525574.jpeg?auto=compress&cs=tinysrgb&w=800"
            ],
            description: "iPhone 14 Pro Max in excellent condition. Barely used for 3 months. Original box and accessories included. No scratches or dents. Battery health at 98%. Face ID and all features working perfectly.",
            features: [
                "6.7-inch Super Retina XDR display",
                "A16 Bionic chip",
                "Pro camera system",
                "Face ID",
                "5G capable",
                "256GB storage"
            ],
            seller: {
                id: 1,
                name: "Adebayo Okafor",
                rating: 4.8,
                reviewCount: 24,
                phone: "08012345678",
                email: "adebayo.okafor@email.com",
                memberSince: "2022-01-15",
                location: "Lagos",
                verified: true
            },
            datePosted: "2025-01-10",
            views: 245,
            likes: 18,
            featured: true,
            status: "active",
            negotiable: true
        },
        {
            id: 2,
            title: "Toyota Camry 2018 - Silver",
            price: 8500000,
            category: "Vehicles",
            subcategory: "Cars",
            condition: "used",
            location: "Abuja",
            state: "abuja",
            lga: "Garki",
            images: [
                "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800"
            ],
            description: "Clean Toyota Camry 2018 model in excellent condition. Well maintained with full service history. AC chilling, everything working perfectly. No accident history.",
            features: [
                "2.5L 4-cylinder engine",
                "Automatic transmission",
                "Full AC system",
                "Power steering",
                "Electric windows",
                "Good tire condition"
            ],
            seller: {
                id: 2,
                name: "Fatima Hassan",
                rating: 4.6,
                reviewCount: 31,
                phone: "08087654321",
                email: "fatima.hassan@email.com",
                memberSince: "2021-08-20",
                location: "Abuja",
                verified: true
            },
            datePosted: "2025-01-08",
            views: 189,
            likes: 12,
            featured: true,
            status: "active",
            negotiable: true
        },
        {
            id: 3,
            title: "MacBook Pro 14-inch M2 - Space Gray",
            price: 1200000,
            category: "Electronics",
            subcategory: "Laptops & Computers",
            condition: "new",
            location: "Lagos",
            state: "lagos",
            lga: "Victoria Island",
            images: [
                "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800"
            ],
            description: "Brand new MacBook Pro 14-inch with M2 chip. Still sealed in box. Perfect for professionals and creatives. Fast performance and excellent display quality.",
            features: [
                "M2 Pro chip",
                "16GB unified memory",
                "512GB SSD storage",
                "14-inch Liquid Retina XDR display",
                "Up to 18 hours battery life",
                "Three Thunderbolt 4 ports"
            ],
            seller: {
                id: 3,
                name: "Chinedu Okwu",
                rating: 4.9,
                reviewCount: 18,
                phone: "08098765432",
                email: "chinedu.okwu@email.com",
                memberSince: "2022-05-10",
                location: "Lagos",
                verified: true
            },
            datePosted: "2025-01-12",
            views: 156,
            likes: 22,
            featured: true,
            status: "active",
            negotiable: false
        },
        {
            id: 4,
            title: "Nike Air Max 270 - Black/White Size 42",
            price: 35000,
            originalPrice: 45000,
            category: "Fashion",
            subcategory: "Men's Fashion",
            condition: "used",
            location: "Kano",
            state: "kano",
            lga: "Fagge",
            images: [
                "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800"
            ],
            description: "Authentic Nike Air Max 270 in great condition. Only worn a few times. Original box not available but shoes are genuine. Very comfortable for daily wear.",
            features: [
                "Air Max heel unit",
                "Mesh and synthetic upper",
                "Foam midsole",
                "Rubber outsole",
                "Size 42 EU",
                "Authentic Nike product"
            ],
            seller: {
                id: 4,
                name: "Musa Ibrahim",
                rating: 4.5,
                reviewCount: 15,
                phone: "08076543210",
                email: "musa.ibrahim@email.com",
                memberSince: "2023-02-14",
                location: "Kano",
                verified: false
            },
            datePosted: "2025-01-09",
            views: 89,
            likes: 7,
            featured: false,
            status: "active",
            negotiable: true
        },
        {
            id: 5,
            title: "Samsung 55\" 4K Smart TV - Crystal UHD",
            price: 320000,
            category: "Electronics",
            subcategory: "Audio & Video",
            condition: "new",
            location: "Ibadan",
            state: "ibadan",
            lga: "Ibadan North",
            images: [
                "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1440722/pexels-photo-1440722.jpeg?auto=compress&cs=tinysrgb&w=800"
            ],
            description: "Brand new Samsung 55-inch 4K Crystal UHD Smart TV. Never been used, still in original packaging. Perfect picture quality and smart features included.",
            features: [
                "55-inch 4K Crystal UHD",
                "Smart TV with Tizen OS",
                "HDR10+ support",
                "Voice remote",
                "Multiple HDMI ports",
                "Built-in WiFi"
            ],
            seller: {
                id: 5,
                name: "Kemi Adeyemi",
                rating: 4.7,
                reviewCount: 22,
                phone: "08054321098",
                email: "kemi.adeyemi@email.com",
                memberSince: "2021-11-30",
                location: "Ibadan",
                verified: true
            },
            datePosted: "2025-01-11",
            views: 134,
            likes: 15,
            featured: false,
            status: "active",
            negotiable: true
        },
        {
            id: 6,
            title: "Office Chair - Executive Leather Chair",
            price: 85000,
            category: "Home & Garden",
            subcategory: "Furniture",
            condition: "used",
            location: "Lagos",
            state: "lagos",
            lga: "Lekki",
            images: [
                "https://images.pexels.com/photos/586023/pexels-photo-586023.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800"
            ],
            description: "High-quality executive leather office chair in good condition. Very comfortable with adjustable height and armrests. Perfect for home office or corporate use.",
            features: [
                "Genuine leather upholstery",
                "Adjustable height",
                "360-degree swivel",
                "Padded armrests",
                "Lumbar support",
                "Smooth rolling casters"
            ],
            seller: {
                id: 6,
                name: "Tunde Bakare",
                rating: 4.4,
                reviewCount: 12,
                phone: "08032109876",
                email: "tunde.bakare@email.com",
                memberSince: "2022-09-05",
                location: "Lagos",
                verified: false
            },
            datePosted: "2025-01-07",
            views: 67,
            likes: 5,
            featured: false,
            status: "active",
            negotiable: true
        },
        {
            id: 7,
            title: "PlayStation 5 Console + 2 Controllers",
            price: 450000,
            category: "Electronics",
            subcategory: "Gaming",
            condition: "used",
            location: "Benin City",
            state: "benin",
            lga: "Oredo",
            images: [
                "https://images.pexels.com/photos/9072211/pexels-photo-9072211.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/8007397/pexels-photo-8007397.jpeg?auto=compress&cs=tinysrgb&w=800"
            ],
            description: "PlayStation 5 console in excellent condition with 2 wireless controllers. All cables included. No issues, works perfectly. Comes with original box.",
            features: [
                "825GB SSD storage",
                "4K gaming capability",
                "Ray tracing support",
                "3D audio technology",
                "DualSense wireless controllers",
                "Backward compatibility"
            ],
            seller: {
                id: 7,
                name: "Osaze Igbinoba",
                rating: 4.6,
                reviewCount: 19,
                phone: "08065432109",
                email: "osaze.igbinoba@email.com",
                memberSince: "2022-12-01",
                location: "Benin City",
                verified: true
            },
            datePosted: "2025-01-06",
            views: 201,
            likes: 28,
            featured: true,
            status: "active",
            negotiable: false
        },
        {
            id: 8,
            title: "Professional Makeup Kit - Complete Set",
            price: 65000,
            category: "Health & Beauty",
            subcategory: "Makeup",
            condition: "new",
            location: "Lagos",
            state: "lagos",
            lga: "Surulere",
            images: [
                "https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/1967230/pexels-photo-1967230.jpeg?auto=compress&cs=tinysrgb&w=800"
            ],
            description: "Complete professional makeup kit with all essential items. Perfect for makeup artists or personal use. High-quality products from trusted brands.",
            features: [
                "Foundation and concealer set",
                "Eye shadow palette",
                "Lipstick collection",
                "Professional brushes",
                "Contouring kit",
                "Carrying case included"
            ],
            seller: {
                id: 8,
                name: "Grace Okonkwo",
                rating: 4.8,
                reviewCount: 26,
                phone: "08043210987",
                email: "grace.okonkwo@email.com",
                memberSince: "2021-07-18",
                location: "Lagos",
                verified: true
            },
            datePosted: "2025-01-05",
            views: 92,
            likes: 11,
            featured: false,
            status: "active",
            negotiable: true
        }
    ],

    users: [
        {
            id: 1,
            name: "Adebayo Okafor",
            email: "adebayo.okafor@email.com",
            phone: "08012345678",
            location: "Lagos",
            memberSince: "2022-01-15",
            rating: 4.8,
            reviewCount: 24,
            verified: true,
            bio: "Tech enthusiast and gadget collector. I buy and sell premium electronics. All items are genuine and properly tested.",
            productsCount: 12,
            soldCount: 8
        },
        {
            id: 2,
            name: "Fatima Hassan",
            email: "fatima.hassan@email.com",
            phone: "08087654321",
            location: "Abuja",
            memberSince: "2021-08-20",
            rating: 4.6,
            reviewCount: 31,
            verified: true,
            bio: "Car dealer with over 5 years experience. Specializing in clean, accident-free vehicles with complete documentation.",
            productsCount: 18,
            soldCount: 15
        }
    ],

    conversations: [
        {
            id: 1,
            participants: [1, 2],
            productId: 1,
            lastMessage: {
                id: 1,
                senderId: 2,
                content: "Is the iPhone still available?",
                timestamp: "2025-01-14T10:30:00Z",
                read: false
            },
            unreadCount: 2,
            createdAt: "2025-01-14T10:30:00Z"
        }
    ],

    messages: [
        {
            id: 1,
            conversationId: 1,
            senderId: 2,
            content: "Hi, I'm interested in your iPhone 14 Pro Max. Is it still available?",
            timestamp: "2025-01-14T10:30:00Z",
            read: false,
            type: "text"
        },
        {
            id: 2,
            conversationId: 1,
            senderId: 1,
            content: "Yes, it's still available! Are you in Lagos?",
            timestamp: "2025-01-14T10:35:00Z",
            read: true,
            type: "text"
        },
        {
            id: 3,
            conversationId: 1,
            senderId: 2,
            content: "Perfect! Can we meet tomorrow at Ikeja?",
            timestamp: "2025-01-14T10:40:00Z",
            read: false,
            type: "text"
        }
    ],

    reviews: [
        {
            id: 1,
            sellerId: 1,
            buyerId: 2,
            productId: 1,
            rating: 5,
            comment: "Excellent seller! Phone was exactly as described. Very professional and punctual.",
            date: "2025-01-10",
            verified: true
        },
        {
            id: 2,
            sellerId: 1,
            buyerId: 3,
            productId: 2,
            rating: 4,
            comment: "Good transaction. Item was as described but delivery took a bit longer than expected.",
            date: "2025-01-08",
            verified: true
        }
    ],

    // Current user simulation
    currentUser: {
        id: 1,
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "08012345678",
        location: "Lagos",
        memberSince: "2023-01-15",
        rating: 4.5,
        reviewCount: 8,
        verified: false,
        bio: "Love finding great deals and selling items I no longer need.",
        settings: {
            showPhone: true,
            showEmail: false,
            emailNotifications: true
        }
    },

    // Wishlist for current user
    wishlist: [1, 3, 7],

    // States and LGAs
    locations: {
        lagos: {
            name: "Lagos",
            lgas: ["Ikeja", "Victoria Island", "Lekki", "Surulere", "Yaba", "Ikoyi", "Ajah", "Maryland"]
        },
        abuja: {
            name: "Abuja",
            lgas: ["Garki", "Wuse", "Maitama", "Gwarinpa", "Kubwa", "Nyanya", "Kuje", "Gwagwalada"]
        },
        kano: {
            name: "Kano",
            lgas: ["Fagge", "Nasarawa", "Kano Municipal", "Ungogo", "Tarauni", "Gwale", "Dala", "Kumbotso"]
        },
        ibadan: {
            name: "Ibadan",
            lgas: ["Ibadan North", "Ibadan South", "Ibadan North East", "Ibadan South West", "Akinyele", "Egbeda", "Ido", "Ona Ara"]
        },
        benin: {
            name: "Benin City",
            lgas: ["Oredo", "Egor", "Ikpoba-Okha", "Uhunmwonde", "Ovia North East", "Ovia South West"]
        },
        kaduna: {
            name: "Kaduna",
            lgas: ["Kaduna North", "Kaduna South", "Chikun", "Igabi", "Ikara", "Jaba", "Jema'a", "Kachia"]
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = mockData;
} else if (typeof window !== 'undefined') {
    window.mockData = mockData;
}