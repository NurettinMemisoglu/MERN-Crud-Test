import cloudinary from "../config/cloudinary.js";
import { redis } from "../config/redis.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

//get products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("error in get products:", error.message);
    res.status(404).json({ success: false, message: "server error" });
  }
};

//get single product
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("error in get single product:", error.message);
    res.status(404).json({ success: false, message: "server error" });
  }
};

//get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("fetured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    featuredProductseaturedProducts = await Product.find({
      isFeatured: true,
    }).lean();

    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }

    await redis.set("featuredProducts", JSON.stringify(featuredProducts));

    res.json(featuredProducts);
  } catch (error) {
    console.error("error in get featured products:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

//get recomended products
export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          image: 1,
        },
      },
    ]);

    res.json(products);
  } catch (error) {
    console.error("error in get recommended products:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

//get product categories
export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.log("Error in getProductsByCategory controller", error.message);
    res.status(500).json({ message: "Server error:", error: error.message });
  }
};

//create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      category,
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error("error in create product:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

//update featured product
export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductCache();
      res.jason(updatedProduct);
    } else {
      res.status(400).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("error in toggleFeaturedProduct:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

//update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "No product with that id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Product not found" });
  }
};

//delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No product with that id" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`product/${publicId}`);
        console.log("Image deleted from cloudinary");
      } catch (error) {
        console.log("Error deleting from cloudinary", error);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("error in delete product:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

async function updateFeaturedProductCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featuredProducts", JSON.stringify(featuredProducts));
  } catch (error) {
    console.error("Error updating featured products cache:", error.message);
  }
}
