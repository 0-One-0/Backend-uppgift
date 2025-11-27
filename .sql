INSERT INTO suppliers (name, contact, phone, email)
    VALUES 
        ('Nordic Tech AB', 'Erik Andersson', '+46-8-123-4567', 'erik@nordictech.se'),
        ('Stockholm Office Supply', 'Anna Bergström', '+46-8-234-5678', 'anna@stockholmoffice.se'),
        ('Swedish Electronics', 'Lars Nilsson', '+46-8-345-6789', 'lars@swedishelectronics.se'),
        ('Scandinavia Furniture', 'Ingrid Svensson', '+46-8-456-7890', 'ingrid@scandinaviafurniture.se'),
        ('Malmö Wholesale', 'Gustav Johansson', '+46-40-567-8901', 'gustav@malmowholesale.se'),
        ('Göteborg Supplies', 'Maria Karlsson', '+46-31-678-9012', 'maria@goteborgsupplies.se'),
        ('Tech Innovation Nordic', 'Johan Pettersson', '+46-8-789-0123', 'johan@techinnovation.se'),
        ('Business Solutions Sweden', 'Sofia Lindgren', '+46-8-890-1234', 'sofia@businesssolutions.se');



INSERT INTO products (name, quantity, price, catergory, supplier_id)
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