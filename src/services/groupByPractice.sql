-- 🔹 BASIC AGGREGATE FUNCTIONS

-- Q1. Count total number of products
SELECT COUNT(id) FROM products;

-- Q2. Find average price of all products
SELECT AVG(price) FROM products;

-- Q3. Find maximum price among products
SELECT MAX(price) FROM products;

-- Q4. Find minimum stock available
SELECT MIN(stock) FROM products;

-- Q5. Find total stock of all products
SELECT SUM(stock) FROM products;

-- 🔹 GROUP BY (Core Concept)

-- Q6. Count how many products exist in each category
SELECT category_id, COUNT(id) 
FROM products 
GROUP BY category_id;

-- Q7. Find average price of products per category
SELECT category_id, 
	COUNT(id) AS freq, 
	SUM(price) AS total, 
	AVG(price) AS average 
FROM products 
GROUP BY category_id;

-- Q8. Find total stock per category
SELECT category_id, SUM(stock) 
FROM products 
GROUP BY category_id;

-- 🔹 GROUP BY + ORDER BY

-- Q9. Get categories with highest number of products first
SELECT category_id, COUNT(id) AS freq 
FROM products 
GROUP BY category_id 
ORDER BY freq DESC;

-- Q10. Get categories sorted by average price (highest first)
SELECT category_id, AVG(price) AS average 
FROM products 
GROUP BY category_id 
ORDER BY average DESC;


-- 🔹 GROUP BY + FILTERING (HAVING)

-- Q11. Get categories having more than 3 products
SELECT category_id, COUNT(id) AS p_count 
FROM products 
GROUP BY category_id 
HAVING COUNT(id) > 3;

-- Q12. Get categories where average price is greater than 1500
SELECT category_id, AVG(price) AS average 
FROM products 
GROUP BY category_id
HAVING AVG(price) > 1500;

-- 🔹 REAL-WORLD STYLE (JOIN + GROUP BY)

-- Q13. Count how many products each user has created
SELECT created_by, COUNT(id)
FROM products 
GROUP BY created_by;

-- Q14. Get each user with their total number of products and sort descending
SELECT created_by, COUNT(id) AS p_count
FROM products 
GROUP BY created_by
ORDER BY p_count DESC
LIMIT 5;

-- Q15. Get category name with total number of products


-- 🔹 ADVANCED AGGREGATION

-- Q16. Get total value of stock per category
SELECT category_id, SUM(stock) AS stocks
FROM products
GROUP BY category_id
ORDER BY stocks DESC;

-- Q17. Find category with highest total stock value
SELECT category_id, SUM(stock) AS total_stocks
FROM products
GROUP BY category_id
ORDER BY total_stocks DESC
LIMIT 1;

-- 🔹 CONDITIONAL AGGREGATION

-- Q18. Count how many products have price > 1000
SELECT COUNT(*) 
FROM products
WHERE price > 1000;

-- Q19. Count how many products each user created where price > 1000
SELECT created_by, COUNT(id)
FROM products
GROUP BY created_by;


-- 🔹 COMBINED QUERY (INTERVIEW LEVEL)

-- Q20.
-- Get:

-- category name
-- total products
-- average price
-- total stock
-- 👉 sort by total products DESC

SELECT category_id, 
	COUNT(id) AS total_products, 
	AVG(price) AS average_price, 
	SUM(stock) AS total_stock
FROM products
GROUP BY category_id
ORDER BY total_products DESC;

