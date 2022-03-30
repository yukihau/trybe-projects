export const GET_ALL_PRODUCTS = 'SELECT * FROM Trybesmith.Products';

export const CREATE_PRODUCT = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';

export const CREATE_USER = `
  INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)
`;

export const GET_ALL_ORDERS_WITH_PRODUCTS = `
  SELECT 
    o.*,
    p.id AS product
  FROM 
    Trybesmith.Orders o
    INNER JOIN Trybesmith.Products p ON o.id = p.orderId
  GROUP BY o.id, p.id;
`;
