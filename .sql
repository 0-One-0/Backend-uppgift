 CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    contact TEXT NOT NULL ,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    quantity INT NOT NULL,
    price TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    supplier_id INT REFERENCES suppliers(id)
 
 
 
 INSERT INTO suppliers (name, contact, phone, email, country)
    VALUES 
        ('Nordic Tech AB', 'Erik Andersson', '+46-8-123-4567', 'erik@nordictech.se', 'Sweden'),
        ('Stockholm Office Supply', 'Anna Bergström', '+46-8-234-5678', 'anna@stockholmoffice.se', 'Sweden'),
        ('Swedish Electronics', 'Lars Nilsson', '+46-8-345-6789', 'lars@swedishelectronics.se', 'Sweden'),
        ('Scandinavia Furniture', 'Ingrid Svensson', '+46-31-456-7890', 'ingrid@scandinaviafurniture.se', 'Sweden'),
        ('Malmö Wholesale', 'Gustav Johansson', '+46-40-567-8901', 'gustav@malmowholesale.se', 'Sweden'),
        ('Göteborg Supplies', 'Maria Karlsson', '+46-31-678-9012', 'maria@goteborgsupplies.se', 'Sweden'),
        ('Tech Innovation Nordic', 'Johan Pettersson', '+46-8-789-0123', 'johan@techinnovation.se', 'Sweden'),
        ('Business Solutions Sweden', 'Sofia Lindgren', '+46-8-890-1234', 'sofia@businesssolutions.se', 'Sweden'),
        ('Uppsala Trading AB', 'Anders Persson', '+46-18-901-2345', 'anders@uppsalatrading.se', 'Sweden'),
        ('Linköping Electronics', 'Emma Gustavsson', '+46-13-012-3456', 'emma@linkopingelectronics.se', 'Sweden');


INSERT INTO products (name, quantity, price, category, supplier_id)
    VALUES 
        ('Laptop', 50, '999.99', 'Electronics', 1),
        ('Mouse', 150, '25.50', 'Electronics', 1),
        ('Keyboard', 80, '75.00', 'Electronics', 1),
        ('Office Chair', 30, '299.99', 'Furniture', 2),
        ('Desk', 20, '450.00', 'Furniture', 2),
        ('Monitor', 45, '350.00', 'Electronics', 1),
        ('Headphones', 100, '89.99', 'Electronics', 3),
        ('Webcam', 60, '125.00', 'Electronics', 3),
        ('Notebook', 200, '5.99', 'Office Supplies', 2),
        ('Pen Set', 300, '12.50', 'Office Supplies', 2);