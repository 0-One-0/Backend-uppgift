import { pool } from "/db.mjs";

// Funtions for products

export async function addProduct(name,quantity,price,catergory,supplier_id) {

    const result = await pool.query(
    "INSERT INTO products (name,quantity,price,catergory,supplier_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name,quantity,price,catergory,supplier_id]
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
      products.catergory, 
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
      products.catergory, 
      products.created_at, 
      suppliers.Name AS suppliers_Name
    FROM products LEFT JOIN suppliers ON products.supplier_id = suppliers.id WHERE products.id = $1`,[ product_id]
    
    );

    if (!result.rows) {
    throw new Error("Failed to get products");
  }

    return result.rows;
}

export async function updateProductById(product_id,name,quantity,catergory,supplier_id) {

     const result = await pool.query(
    "UPDATE posts SET Name = $1, quantity = $2, price = $3, catergory = $4, supplier_id = $5 WHERE id = $6",
    [name, quantity, price, catergory, supplier_id, product_id]
  );

   return result.rowCount > 0;

}

export async function deleteProductById(product_id) {

     const result = await pool.query(
    "DELETE FROM posts WHERE id = $1",
    [product_id]
  );

   return result.rowCount > 0;

}

// Funtions for suppliers

export async function listSuppliers() {

    const result = await pool.query(
      `SELECT * FROM suppliers`
    );

    if (!result.rows) {
    throw new Error("Failed to get suppliers");
  }

    return result.rows;
}