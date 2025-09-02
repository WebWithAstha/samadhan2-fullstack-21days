import React, { useState } from 'react';
import ProductCard from './ProductCard';

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 149.99,
    description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    description: "Feature-rich smartwatch with heart rate monitoring, GPS, and a beautiful display.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Wearables",
    rating: 4.5,
    inStock: true
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 39.99,
    description: "Ergonomic laptop stand for better posture and airflow. Adjustable height and angle.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Accessories",
    rating: 4.2,
    inStock: false
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 89.99,
    description: "Tactile mechanical keyboard with RGB lighting and programmable keys.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Peripherals",
    rating: 4.7,
    inStock: true
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 59.99,
    description: "Portable Bluetooth speaker with 20-hour battery life and water resistance.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Audio",
    rating: 4.4,
    inStock: true
  },
  {
    id: 6,
    name: "USB-C Hub",
    price: 49.99,
    description: "Expand your connectivity with this 7-in-1 USB-C hub featuring HDMI, USB-A, and SD card slots.",
    image: "https://images.unsplash.com/photo-1588599592874-3548cab779a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Accessories",
    rating: 4.0,
    inStock: false
  }
];

const ProductList = () => {
  const [products] = useState(sampleProducts);
  const [filterCategory, setFilterCategory] = useState('');
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'inStock', 'outOfStock'

  // Get unique categories
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const categoryMatch = filterCategory === '' || filterCategory === 'All' || product.category === filterCategory;
    const stockMatch = 
      stockFilter === 'all' || 
      (stockFilter === 'inStock' && product.inStock) || 
      (stockFilter === 'outOfStock' && !product.inStock);
    
    return categoryMatch && stockMatch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Catalog</h2>
      
      <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Category Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <label className="text-sm font-medium text-gray-700">Category:</label>
          <select 
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        {/* Stock Filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <label className="text-sm font-medium text-gray-700">Availability:</label>
          <select 
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="all">All Products</option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No products match your filters.</p>
          <button 
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={() => {
              setFilterCategory('');
              setStockFilter('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
