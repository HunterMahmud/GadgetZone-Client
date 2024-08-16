import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchFilters();
  }, [categoryFilter, brandFilter, priceRange, sortOption, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, priceRange, brandFilter, sortOption]);
  const fetchProducts = async () => {
    try {
      // console.log(currentPage);
      const { data } = await axios.get("http://localhost:3000/products", {
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

  const fetchFilters = async () => {
    try {
      // console.log("hello");
      const categoriesRes = await axios.get("http://localhost:3000/categories");
      setCategories(categoriesRes.data);
      const brandsRes = await axios.get("http://localhost:3000/brands");
      setBrands(brandsRes.data);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };
  // console.log(products);
  const handleSearch = () => {
    setCurrentPage(1);
    fetchProducts();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full text-2xl font-bold my-2 text-center">
        <p>{brandFilter ? brandFilter : "All Brands"}</p>
      </div>
      {/* Search Bar */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-grow p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Product Listing */}
        <div className="flex-grow">
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <div key={product._id} className="border p-4 rounded">
                    <img
                      src={product.ProductImage}
                      alt={product.ProductName}
                      className="w-full h-40 object-cover"
                    />
                    <h2 className="mt-2 text-xl">{product.ProductName}</h2>
                    <p className="mt-2 ">
                      Released: {new Date(
                        product?.ProductCreationDateTime
                      ).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-gray-600">{product.Description}</p>
                    <p className="mt-2 text-gray-900">Price: ${product.Price}</p>
                    <p className="mt-2 text-gray-900">Ratings: {product.Ratings}</p>
                    <p className="mt-2 text-gray-600">Brand: {product.Brand}</p>
                    <p className="mt-2 text-gray-600">
                      Category: {product.Category}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-4 flex justify-center items-center">
                <button
                  className="px-4 py-2 border rounded"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
            </>
          ) : (
            <div className="flex items-center justify-center h-96 w-full">
              <p>No product found</p>
            </div>
          )}
        </div>

        {/* Filters and Sorting in the right side */}
        <aside
          className={`${
            isFilterVisible ? "block" : "hidden"
          } lg:block lg:w-1/4 w-[200px] ml-4 fixed inset-y-0 right-0 bg-white shadow-lg lg:relative lg:shadow-none p-4 border rounded`}
        >
          <div className="lg:sticky top-0">
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
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
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
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
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

            {/* Close Button for Mobile */}
            <button
              className="block lg:hidden mt-4 p-2 bg-red-500 text-white rounded"
              onClick={() => setIsFilterVisible(false)}
            >
              Close
            </button>
          </div>
        </aside>

        {/* Filter Button for Mobile */}
        {!isFilterVisible && (
          <button
            className="lg:hidden fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg"
            onClick={() => setIsFilterVisible(true)}
          >
            Filter
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
