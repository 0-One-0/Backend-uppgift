import { pool } from "./db.mjs";

// Funtions for products

export async function addProduct(name, quantity, price, category, supplier_id) {
  const result = await pool.query(
    "INSERT INTO products (Name,quantity,price,category,supplier_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, quantity, price, category, supplier_id]
  );

  if (result.rowCount !== 1) {
    throw new Error("Failed to insert product");
  }

  return result.rows[0];
}

export async function listProducts() {
  const result = await pool.query(
    `SELECT 
      products.id, 
      products.Name, 
      products.quantity,
      products.price,
      products.category, 
      products.created_at, 
      suppliers.Name AS suppliers_Name
    FROM products LEFT JOIN suppliers ON products.supplier_id = suppliers.id`
  );

  if (!result.rows) {
    throw new Error("Failed to get products");
  }

  return result.rows;
}
export async function listProductById(product_id) {
  const result = await pool.query(
    `SELECT 
      products.id, 
      products.Name, 
      products.quantity,
      products.price,
      products.category, 
      products.created_at, 
      suppliers.Name AS suppliers_Name
    FROM products LEFT JOIN suppliers ON products.supplier_id = suppliers.id WHERE products.id = $1`,
    [product_id]
  );

  if (!result.rows) {
    throw new Error("Failed to get products");
  }

  return result.rows;
}

export async function updateProductById(
  product_id,
  name,
  quantity,
  price,
  category,
  supplier_id
) {
  const result = await pool.query(
    "UPDATE products SET Name = $1, quantity = $2, price = $3, category = $4, supplier_id = $5 WHERE id = $6",
    [name, quantity, price, category, supplier_id, product_id]
  );

  return result.rowCount > 0;
}

export async function deleteProductById(product_id) {
  const result = await pool.query("DELETE FROM products WHERE id = $1", [
    product_id,
  ]);

  return result.rowCount > 0;
}

// Funtions for suppliers

export async function listSuppliers() {
  const result = await pool.query(`SELECT * FROM suppliers`);

  if (!result.rows) {
    throw new Error("Failed to get suppliers");
  }

  return result.rows;
}

export async function listSupplierById(supplier_id) {
  const result = await pool.query(
    `SELECT 
      suppliers.id, 
      suppliers.Name, 
      suppliers.Contact,
      suppliers.Phone,
      suppliers.Email,
      suppliers.Country, 
      suppliers.created_at, 
      COUNT(products.id) AS products_quantity
    FROM suppliers LEFT JOIN products ON products.supplier_id = suppliers.id WHERE suppliers.id = $1 GROUP BY suppliers.id`,
    [supplier_id]
  );

  if (!result.rows) {
    throw new Error("Failed to get supplier");
  }

  return result.rows;
}

export async function addSupplier(
  supplier_name,
  supplier_contact,
  supplier_phone,
  supplier_email,
  supplier_country
) {
  const result = await pool.query(
    "INSERT INTO suppliers (Name,Contact,Phone,Email,Country) VALUES ($1, $2, $3, $4,$5) RETURNING *",
    [
      supplier_name,
      supplier_contact,
      supplier_phone,
      supplier_email,
      supplier_country,
    ]
  );

  if (result.rowCount !== 1) {
    throw new Error("Failed to insert supplier");
  }

  return result.rows[0];
}

export async function updateSupplierById(
  supplier_name,
  supplier_contact,
  supplier_phone,
  supplier_email,
  supplier_country,
  supplier_id
) {
  const result = await pool.query(
    `UPDATE suppliers SET Name = $1, Contact = $2, Phone = $3, Email = $4, Country = $5 WHERE id = $6 `,
    [
      supplier_name,
      supplier_contact,
      supplier_phone,
      supplier_email,
      supplier_country,
      supplier_id,
    ]
  );

  return result.rowCount > 0;
}

export async function deleteSupplierById(supplier_id) {
  const result = await pool.query("DELETE FROM suppliers WHERE id = $1", [
    supplier_id,
  ]);

  return result.rowCount > 0;
}

export async function listSupplierProductsById(supplier_id) {
  const result = await pool.query(
    `SELECT  
      products.id,
      products.name,
      products.quantity,
      products.price,
      products.category,
      products.created_at, 
      suppliers.Name AS suppliers_Name
    FROM products LEFT JOIN suppliers ON products.supplier_id = suppliers.id WHERE products.supplier_id = $1`,
    [supplier_id]
  );

  if (!result.rows) {
    throw new Error("Failed to get suppliers products");
  }

  return result.rows;
}
