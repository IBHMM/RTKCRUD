import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const likedCount = useSelector((state) => state.category.likedCategories).length;
  const basketCount = useSelector((state) => state.category.basketItems).length;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">Logo</Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/categories" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Categories
            </Link>
            <Link to="/add" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Add
            </Link>
            <Link to="/favourite" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Favourite {likedCount > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">{likedCount}</span>
              )}
            </Link>
            <Link to="/basket" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Basket {basketCount > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">{basketCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
