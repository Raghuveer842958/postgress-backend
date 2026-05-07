-- 🔹 BASIC WHERE

-- Q1. Get all products where price is greater than 1000
SELECT * FROM products
WHERE price > 1000;

-- Q2. Get all products where stock is less than 50
SELECT * FROM products
WHERE stock < 50;

-- Q3. Get all products created by user id = 16
SELECT * FROM products
WHERE created_by = 16;

-- Q4. Get all products where category_id = 1
SELECT * FROM products
WHERE category_id = 1;


-- 🔹 AND / OR (Important Logic)

-- Q5. Get products where price > 1000 AND stock > 20
SELECT * FROM products
WHERE price > 1000 AND stock > 20;

-- Q6. Get products where category_id = 1 OR category_id = 6
SELECT * FROM products
WHERE category_id = 1 OR category_id =6;

-- Q7. Get products where
  -- category_id = 1 OR 6
  -- AND price > 500
SELECT * FROM products
WHERE (category_id = 1 or category_id = 6)
AND price > 500;


-- 🔹 IN

-- Q8. Get products belonging to categories 1, 6, and 7
SELECT * FROM products
WHERE category_id IN(1, 6, 7);

-- Q9. Get users whose id is in (11, 16, 17, 18, 70)
SELECT * FROM users
WHERE id IN (11, 16, 17, 18, 70);


-- 🔹 BETWEEN

-- Q10. Get products with price between 500 and 2000
SELECT * FROM products 
WHERE price BETWEEN 500 AND 2000;

-- Q11. Get products with stock between 20 and 100
SELECT * FROM products
WHERE stock BETWEEN 20 AND 100;


-- 🔹 LIKE / ILIKE (Search)

-- Q12. Get products whose name starts with 'M'
SELECT * FROM products
WHERE name LIKE 'M%';

-- Q13. Get products whose name ends with 's'
SELECT * FROM products
WHERE name LIKE '%s';

-- Q14. Get products whose name contains 'oo'
SELECT * FROM products
WHERE name LIKE '%oo%';

-- Q15. Get users whose name starts with 'R'
SELECT * FROM users
WHERE name LIKE 'R%';

-- Q16. Get products whose second characher is 'i'
SELECT * FROM products
WHERE name LIKE '_i%';


-- 🔹 ORDER BY

-- Q16. Get all products sorted by price (highest first)
SELECT * FROM products
ORDER BY price DESC;

-- Q17. Get all products sorted by stock (lowest first)
SELECT * FROM products
ORDER BY stock ASC;


-- 🔹 LIMIT / OFFSET

-- Q18. Get first 5 products
SELECT * FROM products
ORDER BY price DESC LIMIT 5;

-- Q18. Get first 5 products
SELECT * FROM products
ORDER BY price DESC LIMIT 5;

-- Q19. Get next 5 products (pagination)
SELECT * FROM products
ORDER BY price DESC
LIMIT 5 OFFSET 5;

-- Q20. Get all unique category_ids from products
SELECT DISTINCT category_id FROM products ORDER BY category_id DESC;