import express, { json } from "express";
const router = express.Router();

import { 
  addProduct, 
  listProducts,
  listProductById,
  updateProductById,
  deleteProductById,
  listSuppliers,
  listSupplierById,
  addSupplier,
  updateSupplierById,
  deleteSupplierById,
  listSupplierProductsById } from "./repos.mjs";

//Routs for products

router.post("/products", async (req, res) => {});
router.get("/products", async (req, res) => {

  const result = listProducts();

  if(!result){
    res.status(401).json({
      error: "list is empty",
    });
    return;
  }

  res.status(200).json(result);
});
router.get("/products/:id", async (req, res) => {});
router.put("/products/:id", async (req, res) => {});
router.delete("/products/:id", async (req, res) => {});

//Routs for suppliers

router.get("/suppliers", async (req, res) => {
  //för att hämta alla leverantörer
});
router.get("/suppliers/id", async (req, res) => {
  //för att hämta en specifik leverantör (denna skall också returnera antalet produkter för leverantören, men inte produkterna i sig
});
router.post("/suppliers", async (req, res) => {
  //för att skapa en ny leverantör
});
router.put("/suppliers/:id", async (req, res) => {
  //för att uppdatera en befintlig leverantör
});
router.delete("/suppliers/:id", async (req, res) => {
  // för att ta bort en leverantör
});
router.get("/suppliers/:id/products", async (req, res) => {
  // för att hämta alla produkter från en specifik leverantör
});
