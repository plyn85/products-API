const { sql, dbConnPoolPromise } = require("../database/db.js");

//models

const Categories = require("../models/category.js");

// get all categories form the category table
const SQL_SELECT_ALL =
  "SELECT * FROM dbo.category ORDER BY category_name ASC for json path;";
// returns inserted record identified by ProductId = SCOPE_IDENTITY()
const SQL_INSERT =
  "INSERT INTO dbo.category (category_name, category_description) VALUES (@categoryName, @categoryDescription); SELECT * from dbo.category WHERE _id = SCOPE_IDENTITY();";
//updates a category in the database
const SQL_UPDATE =
  "UPDATE dbo.category SET  category_name = @categoryName, category_description = @categoryDescription WHERE _id = @id; SELECT * FROM dbo.category WHERE _id = @id;";
//deletes a category form the database
const SQL_DELETE = "DELETE FROM dbo.category WHERE _id = @id;";
//get all the categories from the database
let getCategories = async () => {
  //variable to store categories
  let categories;

  try {
    const pool = await dbConnPoolPromise;
    const result = await pool
      .request()
      // execute the select all query (defined above)
      .query(SQL_SELECT_ALL);

    // first element of the recordset holds products
    categories = result.recordset[0];
  } catch (err) {
    console.log("DB Error - get all categories: ", err.message);
  }

  return categories;
};

//add a new category to the database

let createCategory = async (category) => {
  console.log("category repo create: ", category);
  let insertedCategory;
  //insert new product
  try {
    //get a database connection and insert SQL
    const pool = await dbConnPoolPromise;
    const result = await pool
      .request()
      //set the name parameters in query
      // checks for sql injection
      .input("categoryName", sql.NVarChar, category.category_name)
      .input("categoryDescription", sql.NVarChar, category.category_description)
      //execute query
      .query(SQL_INSERT);

    //the newly inserted product is returned by the query
    insertedCategory = result.recordset[0];
  } catch (err) {
    console.log("DB Error - error inserting a new category: ", err.message);
  }

  return insertedCategory;
};

//updates a category in the database
let updateCategory = async (category) => {
  console.log("category repo update: ", category);
  //Declare variables
  let updatedCategory;
  //insert new product
  try {
    //get a database connection and insert SQL
    const pool = await dbConnPoolPromise;
    const result = await pool
      .request()
      //set the name parameters in query
      // checks for sql injection

      .input("id", sql.Int, category._id)
      .input("categoryName", sql.NVarChar, category.category_name)
      .input("categoryDescription", sql.NVarChar, category.category_description)

      //execute query
      .query(SQL_UPDATE);
    console.log(result, "sql result");
    //the newly inserted product is returned by the query
    updatedCategory = result.recordset[0];
  } catch (err) {
    console.log("DB Error - error updating a category: ", err.message);
  }
  console.log("updated category repo :", updatedCategory);
  return updatedCategory;
};

//route to delete a category
let deleteCategory = async (categoryId) => {
  let rowsAffected = 0;
  console.log(categoryId, "repo");
  // deletes a single category with matching id
  try {
    //get db connection
    // Get a DB connection and execute SQL
    const pool = await dbConnPoolPromise;
    const result = await pool
      .request()
      // set @id parameter in the query
      .input("id", sql.Int, categoryId)
      // execute query
      .query(SQL_DELETE);
    //Was the product deleted?
    rowsAffected = Number(result.rowsAffected);
    console.log("rowsAffected: ", rowsAffected);
  } catch (err) {
    console.log("Db Error - delete a category", err.message);
  }

  //if noting is deleted
  if (rowsAffected === 0) {
    return false;
  } else {
    return true;
  }
};
module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
