import { useState } from "react";

import { useProductStore } from "../../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        type: "error",
        title: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        type: "success",
        title: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
          Create New Product
        </h1>

        <div className="w-full bg-white p-8 rounded-lg shadow-md dark:bg-gray-700">
          {" "}
          {/* Tailwind classes for styling */}
          <div className="space-y-4">
            {" "}
            {/* Vertical spacing */}
            <input
              type="text"
              placeholder="Product Name"
              name="name"
              className="input input-bordered w-full" // DaisyUI input
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              className="input input-bordered w-full" // DaisyUI input
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Image URL"
              name="image"
              className="input input-bordered w-full" // DaisyUI input
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <button
              className="btn btn-primary w-full" // DaisyUI button
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
      <div className="toast toast-center toast-middle" />{" "}
      {/* Make sure your Toaster component is compatible with Tailwind */}
    </div>
  );
};

export default CreatePage;
