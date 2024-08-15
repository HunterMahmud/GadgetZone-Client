import React, { useState, useEffect } from "react";
import axios from "axios";
import useAxiosPublic from "./../hooks/useAxiosPublic";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [
    searchTerm,
    categoryFilter,
    brandFilter,
    priceRange,
    sortOption,
    currentPage,
  ]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios("http://localhost:3000/products", {
        params: {
          searchTerm,
          category: categoryFilter,
          brand: brandFilter,
          maxPrice: priceRange[1],
          minPrice: priceRange[0],
          sort: sortOption,
          page: currentPage,
        },
      });
      setProducts(data.products);
      
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Product Listing */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product._id} className="border p-4 rounded">
                <img
                  src={product.ProductImage}
                  alt={product.ProductName}
                  className="w-full h-40 object-cover"
                />
                <h2 className="mt-2 text-xl">{product.ProductName}</h2>
                <p className="mt-2 text-gray-600">{product.Description}</p>
                <p className="mt-2 text-gray-900">${product.Price}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center items-center">
            <button
              className="px-4 py-2 border rounded"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            <span className="mx-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 border rounded"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </div>
        </div>

        <aside className="hidden lg:block w-1/4 ml-4">
          <div className="sticky top-0 p-4 border rounded">
            <h3 className="text-xl mb-4">Filter By</h3>

            {/* Filter Options */}
            <div className="mb-4">
              <h4 className="text-lg">Brand Name</h4>
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => setBrandFilter(e.target.value)}
                value={brandFilter}
              >
                <option value="">All Brands</option>
                <option value="Samsung">Samsung</option>
                <option value="Apple">Apple</option>
                <option value="Sony">Sony</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
              </select>
            </div>

            <div className="mb-4">
              <h4 className="text-lg">Category Name</h4>
              <select
                className="w-full p-2 border rounded"
                onChange={(e) => setCategoryFilter(e.target.value)}
                value={categoryFilter}
              >
                <option value="">All Categories</option>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="Headphone">Headphone</option>
                <option value="Earbud">Earbud</option>
              </select>
            </div>

            <div className="mb-4">
              <h4 className="text-lg">Price Range</h4>
              <input
                type="number"
                className="w-full p-2 border rounded mb-2"
                placeholder="Min Price"
                onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
                value={priceRange[0]}
              />
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Max Price"
                onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
                value={priceRange[1]}
              />
            </div>

            {/* Sorting Options */}
            <h3 className="text-xl mb-4">Sort By</h3>
            <select
              className="w-full p-2 border rounded"
              onChange={(e) => setSortOption(e.target.value)}
              value={sortOption}
            >
              <option value="">Default</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="newestFirst">Date Added: Newest First</option>
            </select>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
