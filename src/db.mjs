import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const pool = new Pool({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: Number.parseInt(process.env.DATABASE_PORT),
});

export async function startDatabase() {
  await pool.connect();

  await pool.query(`CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    Name TEXT NOT NULL,
    Contact TEXT NOT NULL ,
    Phone TEXT NOT NULL,
    Email TEXT NOT NULL,
    Country TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);

  await pool.query(`CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    Name TEXT NOT NULL,
    quantity INT NOT NULL,
    price TEXT NOT NULL,
    catergory TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    supplier_id INT REFERENCES suppliers(id))`);
}
