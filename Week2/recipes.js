const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",   // Update with your MySQL username
  password: "hyfpassword", // Update with your MySQL password
  database: "recipe_db",  // Ensure your database is created and named 'recipe_db'
  multipleStatements: true, // Allow multiple SQL statements in a single query
});

const createRecipeTable = `
  -- Drop tables if they exist to avoid conflicts
  DROP TABLE IF EXISTS recipe_categories;
  DROP TABLE IF EXISTS recipe_ingredients;
  DROP TABLE IF EXISTS steps;
  DROP TABLE IF EXISTS categories;
  DROP TABLE IF EXISTS ingredients;
  DROP TABLE IF EXISTS recipes;

  -- Create the main 'recipes' table
  CREATE TABLE recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_name VARCHAR(255) NOT NULL
  );

  -- Create the 'categories' table
  CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
  );

  -- Create the 'ingredients' table
  CREATE TABLE ingredients (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    ingredient_name VARCHAR(255) NOT NULL
  );

  -- Create the 'steps' table
  CREATE TABLE steps (
    step_id INT AUTO_INCREMENT PRIMARY KEY,
    step_description TEXT NOT NULL,
    recipe_id INT,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
  );

  -- Create the many-to-many 'recipe_categories' table
  CREATE TABLE recipe_categories (
    recipe_id INT,
    category_id INT,
    PRIMARY KEY (recipe_id, category_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
  );

  -- Create the many-to-many 'recipe_ingredients' table
  CREATE TABLE recipe_ingredients (
    recipe_id INT,
    ingredient_id INT,
    PRIMARY KEY (recipe_id, ingredient_id),
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
  );
`;

const insertRecipeTable = `
  -- Insert categories into 'categories' table
  INSERT INTO categories (category_name) VALUES 
  ('Cake'), 
  ('No-Bake'), 
  ('Vegetarian'), 
  ('Vegan'), 
  ('Gluten-Free'), 
  ('Japanese');

  -- Insert ingredients into 'ingredients' table
  INSERT INTO ingredients (ingredient_name) VALUES
  ('Condensed milk'),
  ('Cream Cheese'),
  ('Lemon Juice'),
  ('Pie Crust'),
  ('Cherry Jam'),
  ('Brussels Sprouts'),
  ('Lemon juice'),
  ('Sesame seeds'),
  ('Pepper'),
  ('Salt'),
  ('Olive oil'),
  ('Macaroni'),
  ('Butter'),
  ('Flour'),
  ('Salt'),
  ('Pepper'),
  ('Milk'),
  ('Shredded Cheddar cheese'),
  ('Eggs'),
  ('Soy sauce'),
  ('Sugar'),
  ('Salt'),
  ('Olive Oil');

  -- Insert recipes into 'recipes' table
  INSERT INTO recipes (recipe_name) VALUES 
  ('No-Bake Cheesecake'), 
  ('Roasted Brussels sprouts'), 
  ('Mac & Cheese'), 
  ('Tamagoyaki Japanese Omelette');

  -- Insert steps for the 'No-Bake Cheesecake'
  INSERT INTO steps (step_description, recipe_id) VALUES 
  ('Beat Cream Cheese', 1),
  ('Add condensed milk and blend', 1),
  ('Add Lemon Juice and blend', 1),
  ('Add the mix to the pie crust', 1),
  ('Spread the Cherry Jam', 1),
  ('Place in refrigerator for 3h.', 1);

  -- Insert steps for the 'Roasted Brussels Sprouts'
  INSERT INTO steps (step_description, recipe_id) VALUES 
  ('Preheat the oven', 2),
  ('Mix the ingredients in a bowl', 2),
  ('Spread the mix on a baking sheet', 2),
  ('Bake for 30 minutes', 2);

  -- Insert steps for 'Mac & Cheese'
  INSERT INTO steps (step_description, recipe_id) VALUES 
  ('Cook Macaroni for 8 minutes', 3),
  ('Melt butter in a saucepan', 3),
  ('Add flour, salt, pepper and mix', 3),
  ('Add Milk and mix', 3),
  ('Cook until mix is smooth', 3),
  ('Add cheddar cheese', 3),
  ('Add the macaroni', 3);

  -- Insert steps for 'Tamagoyaki Japanese Omelette'
  INSERT INTO steps (step_description, recipe_id) VALUES 
  ('Beat the eggs', 4),
  ('Add soy sauce, sugar and salt', 4),
  ('Add oil to a saucepan', 4),
  ('Bring to medium heat', 4),
  ('Add some mix to the saucepan', 4),
  ('Let it cook for 1 minute', 4),
  ('Remove from fire', 4);

  -- Link recipes to categories
  INSERT INTO recipe_categories (recipe_id, category_id)
  SELECT r.recipe_id, c.category_id
  FROM recipes r
  JOIN categories c ON (
  (r.recipe_name = 'No-Bake Cheesecake' AND (c.category_name = 'Cake' OR c.category_name = 'No-Bake' OR c.category_name = 'Vegetarian')) OR
  (r.recipe_name = 'Roasted Brussels sprouts' AND (c.category_name = 'Vegan' OR c.category_name = 'Gluten-Free')) OR
  (r.recipe_name = 'Mac & Cheese' AND c.category_name = 'Vegetarian') OR
  (r.recipe_name = 'Tamagoyaki Japanese Omelette' AND (c.category_name = 'Vegetarian' OR c.category_name = 'Japanese'))
  );

  -- Link recipes to ingredients
  INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
  SELECT r.recipe_id, i.ingredient_id
  FROM recipes r
  JOIN ingredients i ON r.recipe_name = 'No-Bake Cheesecake'
  AND i.ingredient_name IN ('Condensed milk', 'Cream Cheese', 'Lemon Juice', 'Pie Crust', 'Cherry Jam');

  INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
  SELECT r.recipe_id, i.ingredient_id
  FROM recipes r
  JOIN ingredients i ON r.recipe_name = 'Roasted Brussels sprouts'
  AND i.ingredient_name IN ('Brussels Sprouts', 'Lemon juice', 'Sesame seeds', 'Pepper', 'Salt', 'Olive oil');

  INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
  SELECT r.recipe_id, i.ingredient_id
  FROM recipes r
  JOIN ingredients i ON r.recipe_name = 'Mac & Cheese'
  AND i.ingredient_name IN ('Macaroni', 'Butter', 'Flour', 'Salt', 'Pepper', 'Milk', 'Shredded Cheddar cheese');

  INSERT INTO recipe_ingredients (recipe_id, ingredient_id)
  SELECT r.recipe_id, i.ingredient_id
  FROM recipes r
  JOIN ingredients i ON r.recipe_name = 'Tamagoyaki Japanese Omelette'
  AND i.ingredient_name IN ('Eggs', 'Soy sauce', 'Sugar', 'Salt', 'Olive Oil');
`;

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL!");

  // Create tables
  connection.query(createRecipeTable, (err) => {
    if (err) {
      console.error("Error creating tables:", err);
      return;
    }
    console.log("Tables created.");

    // Insert data
    connection.query(insertRecipeTable, (err) => {
      if (err) {
        console.error("Error inserting data:", err);
        return;
      }
      console.log("Data inserted.");
      connection.end(); // Close the connection
    });
  });
});
