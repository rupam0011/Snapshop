import React, { useEffect, useState } from 'react';
import { end_points } from '../../api/Api';
import axiosInstance from '../../api/axiosInstance';
import './Sidebar.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    let api = end_points.products;
    let navigate = useNavigate()
    let [inputState, setInputState] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    let getcategories = () => {
        axiosInstance.get(api)
            .then(res => {
                console.log(res);
                const products = res.data;
                setInputState(products);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getcategories();
    }, [api]);

    const uniqueCategories = [...new Set(inputState.map(product => product.category))];
    const uniqueGenders = [...new Set(inputState.map(product => product.gender))];
    const uniqueColors = [...new Set(inputState.map(product => product.color))];
    const uniqueMaterial = [...new Set(inputState.map(product => product.material))];
    const uniqueOccasion = [...new Set(inputState.map(product => product.occasion))];

    return (
        <div className="sidebar-container">
            <p className="filter-title">Filter By <i className="bi bi-chevron-down"></i></p>
            <p className={`section-title  all-prouct-title ${selectedCategory === "All Products" ? 'selected' : ''}`}
                onClick={() => {
                    navigate('/products');
                    setSelectedCategory("All Products");
                }}

                style={{ cursor: 'pointer' }}>
                All Products
            </p>
            <hr className="divider" />
            {/* Categories Section */}
            <div className="filter-section categories-section">
                <p className="section-title">Categories</p>
                {uniqueCategories.map((category, index) => (
                    <Link to={`/products/category/${category}`}
                        className={`text-decoration-none `}
                        onClick={() => setSelectedCategory(category)}
                    >
                        <p key={index} className={`filter-option category-option ${selectedCategory === category ? 'selected' : ''}`}>{category}</p>
                    </Link>

                ))}
            </div>
            <hr className="divider" />

            {/* Gender Section */}
            <div className="filter-section gender-section">
                <p className="section-title">Gender</p>
                {uniqueGenders.map((gender, index) => (
                    <Link to={`/products/gender/${gender}`}
                        className='text-decoration-none'
                        onClick={() => setSelectedCategory(gender)}
                    >
                        <p key={index} className={`filter-option category-option ${selectedCategory === gender ? 'selected' : ''}`}>{gender}</p>
                    </Link>
                ))}
            </div>
            <hr className="divider" />

            {/* Colors Section */}color
            <div className="filter-section colors-section">
                <p className="section-title">Color</p>
                {uniqueColors.map((color, index) => (
                    <Link to={`/products/color/${color}`}
                        className='text-decoration-none'
                        onClick={() => setSelectedCategory(color)}
                    >
                        <p key={index} className={`filter-option category-option ${selectedCategory === color ? 'selected' : ''}`}>{color}</p>
                    </Link>
                ))}
            </div>
            <hr className="divider" />

            {/* Material Section */}
            <div className="filter-section material-section">
                <p className="section-title">Composition</p>
                {uniqueMaterial.map((material, index) => (
                    <Link to={`/products/material/${material}`}
                        className='text-decoration-none'
                        onClick={() => setSelectedCategory(material)}
                    >
                        <p key={index} className={`filter-option category-option ${selectedCategory === material ? 'selected' : ''}`}>{material}</p>
                    </Link>
                ))}
            </div>
            <hr className="divider" />

            {/* Occasion Section */}
            <div className="filter-section occasion-section">
                <p className="section-title">Event</p>
                {uniqueOccasion.map((occasion, index) => (
                    <Link to={`/products/occasion/${occasion}`}
                        className='text-decoration-none'
                        onClick={() => setSelectedCategory(occasion)}
                    >
                        <p key={index} className={`filter-option category-option ${selectedCategory === occasion ? 'selected' : ''}`}>{occasion}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
