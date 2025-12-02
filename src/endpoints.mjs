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

function validEmail(value) {
  const validEnd1 = value.search(".com");
  const validEnd2 = value.search(".se");

  if (validEnd1 < 0 && validEnd2 < 0) {
    return -1;
  }

  const atValid = value.search("@");

  if (atValid < 0) {
    return -2;
  }

  return 1;
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
        "A JSON body must include name, quantity, price, category and supplier_id ",
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
  let supplierResult;
  try {
    supplierResult = await listSupplierById(supplier_id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }

  if (supplierResult.length === 0) {
    res.status(404).json({
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
 let result;
  try {
    result = await addProduct(
      name,
      quantity,
      price,
      category,
      supplier_id
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
  if (!result) {
    res.status(500).json({
      error: "fail to add product",
    });
    return;
  }

  res.status(200).json(result);
});
router.get("/products", async (req, res) => {
  let result;
  try {
    const result = await listProducts();

    if (result.length === 0) {
      res.status(404).json({
        error: "list is empty",
      });
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
});
router.get("/products/:id", async (req, res) => {
  const product_id = Number.parseInt(req.params.id);

  if (!validNumber(product_id)) {
    res.status(400).json({ error: "product id must be a number" });
    return;
  }

  try {
    const result = await listProductById(product_id);
    if (result.length === 0) {
      res.status(404).json({ error: "product not found" });
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
});
router.put("/products/:id", async (req, res) => {
  const product_id = Number.parseInt(req.params.id);

  if (!validNumber(product_id)) {
    res.status(400).json({ error: "product id must be a number" });
    return;
  }
  let findProduct;
  try {
     findProduct = await listProductById(product_id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
  if (findProduct.length === 0) {
    res.status(404).json({ error: "product not found" });
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
        "A JSON body must include name, quantity, price, category and supplier_id ",
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
  let  supplierResult;
  try {
     supplierResult = await listSupplierById(supplier_id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
  if (supplierResult.length === 0) {
    res.status(404).json({
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
let change;
  try {
     change = await updateProductById(
      product_id,
      name,
      quantity,
      price,
      category,
      supplier_id
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }

  if (!change) {
    res.status(500).json({
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
 let findProduct;
  try {
    findProduct = await listProductById(product_id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
  if (findProduct.length === 0) {
    res.status(404).json({ error: "product not found" });
    return;
  }
  let result
  try {
     result = await deleteProductById(product_id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
  if (!result) {
    res.status(500).json({ error: "product not deleted" });
    return;
  }

  res.status(200).json();
});

//Routs for suppliers

router.get("/suppliers", async (req, res) => {
  //för att hämta alla leverantörer
  let result;
  try {
    result = await listSuppliers();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }

  if (result.length === 0) {
    res.status(404).json({
      error: "list is empty",
    });
    return;
  }

  res.status(200).json(result);
});
router.get("/suppliers/:id", async (req, res) => {
  //för att hämta en specifik leverantör (denna skall också returnera antalet produkter för leverantören, men inte produkterna i sig
  const supplier_id = Number.parseInt(req.params.id);

  if (!validNumber(supplier_id)) {
    res.status(400).json({ error: "id must be a number" });
    return;
  }
  let supplierResult;
  try {
    supplierResult = await listSupplierById(supplier_id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
  if (supplierResult.length === 0) {
    res.status(404).json({
      error: "supplier not found",
    });
    return;
  }

  res.status(200).json(supplierResult);
});
router.post("/suppliers", async (req, res) => {
  //för att skapa en ny leverantör
  if (!req.body) {
    res.status(400).json({
      error: "A JSON body must be included",
    });
    return;
  }
  const { name, contact, phone, email, country } = req.body;

  if (
    name === undefined ||
    contact === undefined ||
    phone === undefined ||
    email === undefined ||
    country === undefined
  ) {
    res.status(400).json({
      error: "A JSON body must include name, contact, phone, email, country",
    });
    return;
  }
  if (!validString(name)) {
    res.status(400).json({
      error: "name invalid, must be a string",
    });
    return;
  } else if (!validString(contact)) {
    res.status(400).json({
      error: "contact must be a string",
    });
    return;
  } else if (!validString(phone)) {
    res.status(400).json({
      error: "price invalid, must be a string",
    });
    return;
  } else if (!validString(email)) {
    res.status(400).json({
      error: "category invalid, must be a string",
    });
    return;
  } else if (!validString(country)) {
    res.status(400).json({
      error: "country invalid, must be a string",
    });
    return;
  }
  const validPhone = phone.length;

  if (validPhone < 7) {
    res.status(400).json({
      error: "Invalid Phone must contain 7 or more chars",
    });
    return;
  }

  const testEmail = validEmail(email);

  if (testEmail === -1) {
    res.status(400).json({
      error: "Invalid end to email must contain {.com or .se}",
    });
    return;
  }

  if (testEmail === -2) {
    res.status(400).json({
      error: "Invalid email must contain { @ }",
    });
    return;
  }
  let result;
  try {
    result = await addSupplier(name, contact, phone, email, country);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
  res.status(200).json({
    message: "supplier has been added",
    result,
  });
});
router.put("/suppliers/:id", async (req, res) => {
  //för att uppdatera en befintlig leverantör
  const supplier_id = Number.parseInt(req.params.id);

  if (!validNumber(supplier_id)) {
    res.status(400).json({ error: "id must be a number" });
    return;
  }
  let supplierResult;
  try {
    supplierResult = await listSupplierById(supplier_id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
  if (supplierResult.length === 0) {
    res.status(404).json({
      error: "supplier not found",
    });
    return;
  }

  if (!req.body) {
    res.status(400).json({
      error: "A JSON body must be included",
    });
    return;
  }
  const { name, contact, phone, email, country } = req.body;

  if (
    name === undefined ||
    contact === undefined ||
    phone === undefined ||
    email === undefined ||
    country === undefined
  ) {
    res.status(400).json({
      error: "A JSON body must include name, contact, phone, email, country",
    });
    return;
  }

  if (!validString(name)) {
    res.status(400).json({
      error: "name invalid, must be a string",
    });
    return;
  } else if (!validString(contact)) {
    res.status(400).json({
      error: "contact must be a string",
    });
    return;
  } else if (!validString(phone)) {
    res.status(400).json({
      error: "price invalid, must be a string",
    });
    return;
  } else if (!validString(email)) {
    res.status(400).json({
      error: "category invalid, must be a string",
    });
    return;
  } else if (!validString(country)) {
    res.status(400).json({
      error: "country invalid, must be a string",
    });
    return;
  }
  const validPhone = phone.length;

  if (validPhone < 7) {
    res.status(400).json({
      error: "Invalid Phone must contain 7 or more chars",
    });
    return;
  }

  const testEmail = validEmail(email);

  if (testEmail === -1) {
    res.status(400).json({
      error: "Invalid end to email must contain {.com or .se}",
    });
    return;
  }

  if (testEmail === -2) {
    res.status(400).json({
      error: "Invalid email must contain { @ }",
    });
    return;
  }
  let change;
  try {
    change = await updateSupplierById(
      name,
      contact,
      phone,
      email,
      country,
      supplier_id
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
  if (!change) {
    res.status(400).json({
      error: "unable to update supplier",
    });
    return;
  }

  res.status(200).json();
});
router.delete("/suppliers/:id", async (req, res) => {
  // för att ta bort en leverantör
  const supplier_id = Number.parseInt(req.params.id);

  if (!validNumber(supplier_id)) {
    res.status(400).json({ error: "id must be a number" });
    return;
  }
  let supplierResult;
  try {
    supplierResult = await listSupplierById(supplier_id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
  if (supplierResult.length === 0) {
    res.status(404).json({
      error: "supplier not found",
    });
    return;
  }
  let productResult;
  try {
    productResult = await listSupplierProductsById(supplier_id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
  if (productResult.length > 0) {
    res.status(400).json({
      error: "supplier has active products and can not be deleted",
    });
    return;
  }
let deleteSupplier;
  try {
    deleteSupplier = await deleteSupplierById(supplier_id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
  if (deleteSupplier.length === 0) {
    res.status(404).json({
      error: "supplier not deleted",
    });
    return;
  }

  res.status(200).json({
    message: "Deleted",
  });
});
router.get("/suppliers/:id/products", async (req, res) => {
  // för att hämta alla produkter från en specifik leverantör
  const supplier_id = Number.parseInt(req.params.id);

  if (!validNumber(supplier_id)) {
    res.status(400).json({ error: "id must be a number" });
    return;
  }
  let supplierResult;
  try {
    supplierResult = await listSupplierById(supplier_id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
  if (supplierResult.length === 0) {
    res.status(400).json({
      error: "supplier not found",
    });
    return;
  }
  let productResult
  try {
    productResult = await listSupplierProductsById(supplier_id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An unexpected error occurred." });
    return;
  }
  if (productResult.length === 0) {
    res.status(404).json({
      error: "supplier has no products",
    });
    return;
  }

  res.status(200).json(productResult);
});

export default router;
