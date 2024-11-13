import express from "express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products", productRoutes);

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

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
