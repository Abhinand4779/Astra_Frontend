import React, { createContext, useContext, useState, useEffect } from 'react';
import { allProducts as initialProducts } from '../data/products';

// Import existing assets for default values
import Women from '../assets/Main_Categories/women.png';
import Men from '../assets/Main_Categories/men.png';
import Kids from '../assets/Main_Categories/kids.png';
import Traditional from '../assets/Main_Categories/traditional.png';
import BannerImg from '../assets/About/Banner.jpg';
import Featured1 from '../assets/Ornaments_Categories/bangle.jpg';
import Featured2 from '../assets/Ornaments_Categories/earings.jpg';
import Featured3 from '../assets/Ornaments_Categories/chain.jpg';

const defaultConfig = {
    hero: {
        bannerImg: BannerImg,
        title: 'Elegance in Every Detail',
        subtitle: 'Explore the exclusive collection from Astra by Ash.',
        btnText: 'Shop Collection',
        btnLink: '/shop'
    },
    coupon: {
        label: 'Special Offer',
        discount: '15% OFF',
        text: 'On your first order above ₹1999',
        code: 'ASTRA15'
    },
    highlights: [
        { id: 1, title: 'Summer Sale', image: Featured1, subtitle: 'Flat 20% Off', link: '/offer-zone' },
        { id: 2, title: 'New Arrivals', image: Featured2, subtitle: 'Signature Collection', link: '/shop' },
        { id: 3, title: 'Best Sellers', image: Featured3, subtitle: 'Trending Now', link: '/shop' },
    ],
    promoCarousel: [
        {
            id: 1,
            image: Featured1,
            badge: 'New Arrival',
            title: 'Gold Bangles Collection',
            subtitle: 'Handcrafted with 22K gold plating — timeless elegance for every occasion.',
            link: '/shop',
            btnText: 'Shop Now',
            align: 'left'
        },
        {
            id: 2,
            image: Featured2,
            badge: 'Trending',
            title: 'Signature Earrings',
            subtitle: 'Lightweight, bold and beautiful — statement pieces that tell your story.',
            link: '/category/women',
            btnText: 'Explore',
            align: 'right'
        },
        {
            id: 3,
            image: Featured3,
            badge: 'Best Seller',
            title: 'Layered Chain Sets',
            subtitle: 'Stack them, layer them, own them. Our chains are crafted for royalty.',
            link: '/shop',
            btnText: 'View Collection',
            align: 'left'
        }
    ],
    testimonials: [
        { id: 1, name: "Anjali Sharma", handle: "@anjali_styles", text: "The gold plating is so authentic! I wore the bangles to a wedding and everyone thought they were real gold. Amazing quality from Astra.", rating: 5 },
        { id: 2, name: "Rahul Verma", handle: "@rahul_v", text: "Bought the layered chain set for my wife. The packaging and the finish of the product exceeded my expectations. Highly recommend!", rating: 5 },
        { id: 3, name: "Priya Iyer", handle: "@priya_jewels", text: "Finding traditional designs that don't feel heavy is hard. Astra's signature earrings are my new favorites for daily wear.", rating: 5 }
    ],
    homeCategories: [
        { id: 1, name: 'Women', image: Women, path: '/category/women' },
        { id: 2, name: 'Men', image: Men, path: '/category/men' },
        { id: 3, name: 'Kids', image: Kids, path: '/category/kids' },
        { id: 4, name: 'Traditional', image: Traditional, path: '/category/traditional' },
    ],
    footer: {
        storeName: 'Our Store',
        description: 'Astra by Ash was started in 2022 to bring elegance and tradition to your everyday style.',
        newsletterText: 'Sign up for our newsletter and receive 10% off your',
        copyright: '©2026 Astra by Ash. All Rights Reserved.',
        credit: 'Designed By RDR Technology',
        instagram: 'https://www.instagram.com/rdr.technology?igsh=eTc5NWUwOWN0eHBs'
    },
    navCategories: [
        {
            name: 'Women',
            path: '/category/women',
            dropdown: [
                "Anklets", "Hip Chain", "Adjustable Bangle", "Jumkhas",
                "Diamond Replica", "Bangles", "Bracelet", "Chains",
                "Earrings", "Neckpiece", "Hindu God Chains",
                "Hindu Thali chains", "Rings", "Toe Ring", "Traditional"
            ]
        },
        {
            name: 'Men',
            path: '/category/men',
            dropdown: ["Bracelets", "Chains", "Hindu God Chains", "Cross Chains"]
        },
        { name: 'Kids', path: '/category/kids', dropdown: [] },
        { name: 'Offer Zone', path: '/offer-zone', dropdown: [] },
        { name: 'About Us', path: '/about-us', dropdown: [] },
        { name: 'Contact Us', path: '/contact-us', dropdown: [] }
    ],
    sectionCategories: {
        women: [
            { name: 'Anklets', count: 42 },
            { name: 'Bangles', count: 85 },
            { name: 'Bracelets', count: 64 },
            { name: 'Chains', count: 120 },
            { name: 'Earrings', count: 210 },
            { name: 'Hip Chain', count: 15 },
            { name: 'Neckpiece', count: 124 },
            { name: 'Rings', count: 56 },
            { name: 'Traditional', count: 42 }
        ],
        men: [
            { name: 'Bracelets', count: 18 },
            { name: 'Chains', count: 35 },
            { name: 'Hindu God Chains', count: 12 },
            { name: 'Cross Chains', count: 8 }
        ],
        kids: [
            { name: 'Earrings', count: 24 },
            { name: 'Neckpiece', count: 15 },
            { name: 'Bracelets', count: 12 },
            { name: 'Chains', count: 10 }
        ]
    },
    products: initialProducts
};

const SiteContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Helper to deep merge only the first level of objects (hero, footer, etc.)
// This ensures that local default assets (like BannerImg) stay if backend doesn't overwrite them
const mergeConfig = (base, override) => {
    if (!override) return base;
    const merged = { ...base };
    Object.keys(override).forEach(key => {
        if (
            override[key] &&
            typeof override[key] === 'object' &&
            !Array.isArray(override[key]) &&
            base[key]
        ) {
            merged[key] = { ...base[key], ...override[key] };
        } else {
            merged[key] = override[key];
        }
    });
    return merged;
};

export const SiteProvider = ({ children }) => {
    const [config, setConfig] = useState(defaultConfig);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            // OPTIMIZATION: Check for local config immediately so the UI loads instantly
            const stored = localStorage.getItem('astra_site_config_v2');
            if (stored) {
                try {
                    setConfig(prev => mergeConfig(prev, JSON.parse(stored)));
                    setLoading(false); // Stop loading immediately if we have local data
                } catch (err) { console.error("Error parsing local config", err); }
            }

            // Create an AbortController with a 1-second timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 1000);

            try {
                // Fetch from Backend (with timeout)
                const response = await fetch(`${API_BASE_URL}/settings/`, {
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                const data = await response.json();

                if (data && data.config && Object.keys(data.config).length > 0) {
                    setConfig(prev => mergeConfig(prev, data.config));
                    // Also update localStorage with the fresh data from backend
                    localStorage.setItem('astra_site_config_v2', JSON.stringify(data.config));
                }
            } catch (e) {
                clearTimeout(timeoutId);
                // If it failed or timed out, and we STILL didn't find local data, stop loading.
                if (!stored) {
                    console.warn("Backend unavailable and no local config found.");
                }
            } finally {
                setLoading(false); // Final guard to ensure loading stops
            }
        };

        fetchConfig();
    }, []);

    const saveConfig = async (newConfig) => {
        // Optimistically update UI
        setConfig(newConfig);

        // 1. Save to localStorage for redundancy and speed
        localStorage.setItem('astra_site_config_v2', JSON.stringify(newConfig));

        // 2. Save to Backend (Requires Auth Token if it's an admin)
        const token = localStorage.getItem('adminToken'); // Assuming this is where it's stored
        if (token) {
            try {
                await fetch(`${API_BASE_URL}/settings/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(newConfig)
                });
                console.log("Config saved to backend");
            } catch (err) {
                console.error("Failed to save to backend", err);
            }
        }
    };

    const updateSection = (section, data) => {
        const newConfig = { ...config, [section]: data };
        saveConfig(newConfig);
    };

    return (
        <SiteContext.Provider value={{ config, updateSection, loading }}>
            {children}
        </SiteContext.Provider>
    );
};

export const useSite = () => useContext(SiteContext);
