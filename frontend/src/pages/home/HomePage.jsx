import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../store/product.js";
import ProductCard from "../../components/ProductCard";
import CustomerService from "../../components/customerservice/CustomerService";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col">
        {" "}
        {/* Main vertical layout */}
        <h1 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 text-center">
          Current Products
        </h1>
        {products.length > 0 ? ( // Conditionally render products or message
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-xl text-center font-bold text-gray-500">
            No products found 😢{" "}
            <Link to="/create" className="text-blue-500 hover:underline">
              Create a product
            </Link>
          </p>
        )}
        <div className="flex justify-end mt-8">
          <CustomerService />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
