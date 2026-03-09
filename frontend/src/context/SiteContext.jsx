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
    homeCategories: [
        { id: 1, name: 'Women', image: Women, path: '/category/women' },
        { id: 2, name: 'Men', image: Men, path: '/category/men' },
        { id: 3, name: 'Kids', image: Kids, path: '/category/kids' },
        { id: 4, name: 'Traditional', image: Traditional, path: '/category/traditional' },
    ],
    footer: {
        storeName: 'Our Store',
        description: 'Astra by Ash (formerly Kiza) was started in 2022 to bring elegance and tradition to your everyday style.',
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

export const SiteProvider = ({ children }) => {
    const [config, setConfig] = useState(defaultConfig);

    useEffect(() => {
        const storedConfig = localStorage.getItem('astra_site_config_v2');
        if (storedConfig) {
            try {
                const parsed = JSON.parse(storedConfig);
                // Merge with default to ensure new fields are present
                setConfig(prev => ({ ...prev, ...parsed }));
            } catch (e) {
                console.error("Failed to parse site config", e);
            }
        }
    }, []);

    const saveConfig = (newConfig) => {
        setConfig(newConfig);
        localStorage.setItem('astra_site_config_v2', JSON.stringify(newConfig));
    };

    const updateSection = (section, data) => {
        const newConfig = { ...config, [section]: data };
        saveConfig(newConfig);
    };

    return (
        <SiteContext.Provider value={{ config, updateSection }}>
            {children}
        </SiteContext.Provider>
    );
};

export const useSite = () => useContext(SiteContext);
