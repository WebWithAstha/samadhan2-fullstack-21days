import React from 'react';

const ProductCard = ({ product }) => {
  const { name, price, description, image, category, rating, inStock } = product;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img className="h-48 w-full object-cover" src={image} alt={name} />
        {!inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
        <div className="absolute top-2 left-2 bg-gray-800 bg-opacity-75 text-white text-xs font-bold px-2 py-1 rounded">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
          <span className="font-bold text-indigo-600">${price.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg 
              key={i}
              className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-1">({rating.toFixed(1)})</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <button 
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              inStock 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!inStock}
          >
            {inStock ? 'Add to Cart' : 'Sold Out'}
          </button>
          
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
