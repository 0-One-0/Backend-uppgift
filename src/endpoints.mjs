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
  listSupplierProductsById,
} from "./repos.mjs";

function validString(testData) {
  return testData !== null && typeof testData === "string";
}
function validNumber(testData) {
  return (
    testData !== null && typeof testData === "number" && !Number.isNaN(testData)
  );
}

//Routs for products

router.post("/products", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      error: "A JSON body must be included",
    });
    return;
  }
  const { name, quantity, price, category, supplier_id } = req.body;

  if (
    name === undefined ||
    quantity === undefined ||
    price === undefined ||
    category === undefined ||
    supplier_id === undefined
  ) {
    res.status(400).json({
      error:
        "A JSON body must includ name, quantity, price, catergory and supplier_id ",
    });
    return;
  }

  if (!validString(name)) {
    res.status(400).json({
      error: "name invalid, must be a string",
    });
    return;
  } else if (!validNumber(quantity)) {
    res.status(400).json({
      error: "quantity must be a number",
    });
    return;
  } else if (!validString(price)) {
    res.status(400).json({
      error: "price invalid, must be a string",
    });
    return;
  } else if (!validString(category)) {
    res.status(400).json({
      error: "category invalid, must be a string",
    });
    return;
  } else if (!validNumber(supplier_id)) {
    res.status(400).json({
      error: "supplier_id must be a number",
    });
    return;
  }

  const supplierResult = await listSupplierById(supplier_id);

  if (supplierResult.length === 0) {
    res.status(400).json({
      error: "supplier not found",
    });
    return;
  }

  if (quantity <= 0) {
    res.status(400).json({
      error: "quantity must be atleast 1",
    });
    return;
  }
  const tempPrice = Number.parseInt(price);

  if (tempPrice <= 0) {
    res.status(400).json({
      error: "price must be atleast 1",
    });
    return;
  }

  const result = await addProduct(name, quantity, price, category, supplier_id);

  if (!result) {
    res.status(400).json({
      error: "fail to add product",
    });
    return;
  }

  res.status(200).json(result);
});
router.get("/products", async (req, res) => {
  const result = await listProducts();

  if (result.length === 0) {
    res.status(401).json({
      error: "list is empty",
    });
    return;
  }

  res.status(200).json(result);
});
router.get("/products/:id", async (req, res) => {
  const product_id = Number.parseInt(req.params.id);

  if (!validNumber(product_id)) {
    res.status(400).json({ error: "product id must be a number" });
    return;
  }

  const result = await listProductById(product_id);

  if (result.length === 0) {
    res.status(400).json({ error: "product not found" });
    return;
  }

  res.status(200).json(result);
});
router.put("/products/:id", async (req, res) => {
  const product_id = Number.parseInt(req.params.id);

  if (!validNumber(product_id)) {
    res.status(400).json({ error: "product id must be a number" });
    return;
  }

  const findProduct = await listProductById(product_id);
  if (findProduct.length === 0) {
    res.status(400).json({ error: "product not found" });
    return;
  }

  if (!req.body) {
    res.status(400).json({
      error: "A JSON body must be included",
    });
    return;
  }
  const { name, quantity, price, category, supplier_id } = req.body;

  if (
    name === undefined ||
    quantity === undefined ||
    price === undefined ||
    category === undefined ||
    supplier_id === undefined
  ) {
    res.status(400).json({
      error:
        "A JSON body must includ name, quantity, price, catergory and supplier_id ",
    });
    return;
  }

  if (!validString(name)) {
    res.status(400).json({
      error: "name invalid, must be a string",
    });
    return;
  } else if (!validNumber(quantity)) {
    res.status(400).json({
      error: "quantity must be a number",
    });
    return;
  } else if (!validString(price)) {
    res.status(400).json({
      error: "price invalid, must be a string",
    });
    return;
  } else if (!validString(category)) {
    res.status(400).json({
      error: "category invalid, must be a string",
    });
    return;
  } else if (!validNumber(supplier_id)) {
    res.status(400).json({
      error: "supplier_id must be a number",
    });
    return;
  }

  const supplierResult = await listSupplierById(supplier_id);

  if (supplierResult.length === 0) {
    res.status(400).json({
      error: "supplier not found",
    });
    return;
  }

  if (quantity <= 0) {
    res.status(400).json({
      error: "quantity must be atleast 1",
    });
    return;
  }
  const tempPrice = Number.parseInt(price);

  if (tempPrice <= 0) {
    res.status(400).json({
      error: "price must be atleast 1",
    });
    return;
  }

  const change = await updateProductById(
    product_id,
    name,
    quantity,
    price,
    category,
    supplier_id
  );

  if(!change){
    res.status(400).json({
      error: "unable to update product",
    });
    return;
  }

  res.status(200).json();
});
router.delete("/products/:id", async (req, res) => {

  const product_id = Number.parseInt(req.params.id);

  if (!validNumber(product_id)) {
    res.status(400).json({ error: "product id must be a number" });
    return;
  }

  const findProduct = await listProductById(product_id);
  if (findProduct.length === 0) {
    res.status(400).json({ error: "product not found" });
    return;
  }

  const result = await deleteProductById(product_id);

  if(!result){
    res.status(400).json({ error: "product not deleted" });
    return;
  }

  res.status(200).json();

});

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

export default router;
