import { LuPenSquare, LuTrash2 } from "react-icons/lu";
import { useProductStore } from "../store/product.js";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUpdateProduct = async (productId, updatedProduct) => {
    const { success, message } = await updateProduct(productId, updatedProduct);
    setIsDialogOpen(false);
    if (!success) {
      toaster.create({
        type: "error",
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        type: "success",
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const { deleteProduct, updateProduct } = useProductStore();
  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    if (!success) {
      toaster.create({
        type: "error",
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        type: "success",
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1px hover:shadow-xl relative">
      {/* Use relative for dialog positioning */}
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-md font-medium mb-2">{product.name}</h3>
        <p className="font-bold text-xl text-gray-600 dark:text-gray-200 mb-4">
          ${product.price}
        </p>

        <div className="flex">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="btn btn-ghost btn-sm"
          >
            {" "}
            {/* DaisyUI button */}
            <LuPenSquare size={24} />
          </button>
          <button
            onClick={() => handleDeleteProduct(product._id)}
            className="btn btn-ghost btn-sm"
          >
            <LuTrash2 size={24} />
          </button>
        </div>
      </div>
      {/* Dialog (positioned relative to the card) */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Backdrop */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-xl w-96">
            {/* Dialog content */}
            <h2 className="text-lg font-bold mb-4">Edit Product</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                name="name"
                className="input input-bordered w-full"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
              />
              <input
                placeholder="Price"
                name="price"
                type="number"
                className="input input-bordered w-full"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <input
                placeholder="Image URL"
                name="image"
                className="input input-bordered w-full"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
              {/* ... (Price and Image inputs - similar structure) */}
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="btn btn-outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
