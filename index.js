const express = require('express');
const app = express();
const { travelPack } = require('./products/products');

app.get("/products", (req, res) => {
  res.status(200).json({ travelPack });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = travelPack.find(
    (product) => product.id === id
  );
  if (!product) {
    res.status(404).json({ error: "Product not found" });
  } else {
    res.status(200).json(product);
  }
});

app.post("/products", (req, res) => {
  const product = req.body;
  const existingProduct = travelPack.find(
    (existing) => existing.id === product.id
  );

  if (existingProduct) {
    res.status(400).json({ error: "Product ID already exists" });
  } else {
    travelPack.push(product);
    res.status(201).json(product);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});