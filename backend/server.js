import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import { app, server } from "./socket/socket.js";

import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/frontend/dist"))); //Always serve the static files.

if (process.env.NODE_ENV === "production") {
  // The "catchall" handler to serve the React app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  //If not production, create some dummy data
  app.get("/", (req, res) =>
    res.send(
      "Please run 'npm run build' in the frontend directory to test this.",
    ),
  );
}

server.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
