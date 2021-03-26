const categoriesRepository = require("../repositories/categoriesRepository.js");
//import the categoryValidators
const categoryValidators = require("../validators/categoryValidators.js");
//import base validators
const baseValidators = require("../validators/baseValidators.js");
//get all the categories form the repo
let getCategories = async () => {
  let categories = await categoriesRepository.getCategories();
  return categories;
};

//create a new category

// accepts category data as a parameter form the controller
let createCategory = async (category) => {
  //declare variable
  let newlyInsertedCategory;
  console.log("category service :", category);
  //call the product validator kept in different file
  let validatedCategory = categoryValidators.validateCategory(category);
  //if the validator validates the product save to database
  if (validatedCategory != null) {
    console.log("category service validated :", category);
    newlyInsertedCategory = await categoriesRepository.createCategory(
      validatedCategory
    );
  } else {
    //validation for product failed
    newlyInsertedCategory = { error: "invalid category" };

    //log the result
    console.log("categoryService.createCategory(): form validation failed");
  }

  //return the newly inserted product
  return newlyInsertedCategory;
};

//updates a  category

let updateCategory = async (category) => {
  console.log("cat service :", category);
  // Declare variables and consts
  let updatedCategory;
  // call the product validator
  let validatedCategory = categoryValidators.validateCategory(category);

  // If validation returned a product object - save to database
  if (validatedCategory != null) {
    updatedCategory = await categoriesRepository.updateCategory(
      validatedCategory
    );
  } else {
    // Product data failed validation
    updatedCategory = { error: "Category update failed" };
    // debug info
    console.log("CategoryService.updateProduct(): form data validate failed");
  }
  console.log("category service :", updatedCategory);
  // return the newly inserted category
  return updatedCategory;
};

//deletes a category
let deleteCategory = async (categoryId) => {
  let deleteResult = false;
  //validate the input
  if (!baseValidators.validateId(categoryId)) {
    console.log("delete category service error invalid id parameter");
    return false;
  }

  //delete category by Id
  deleteResult = await categoriesRepository.deleteCategory(categoryId);
  console.log("cat service :", deleteResult);
  return deleteResult;
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
