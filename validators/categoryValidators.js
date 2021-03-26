//input validator package
const validator = require("validator");
// input base validators
const baseValidators = require("./baseValidators.js");

//models
const Category = require("../models/category.js");

let validateCategory = (formCategory) => {
  // Declare constants and variables

  let validatedCategory;
  // New category has no id
  let catId = 0;

  // debug to console - if no data
  if (formCategory === null) {
    console.log("validateNewCategory(): Parameter is null");
  }

  // Check if id field is included in the form object
  if (formCategory.hasOwnProperty("_id")) {
    catId = formCategory._id;
  }

  // Validate form data for new product fields
  // Creating a product does not need a product id
  // Adding '' to the numeric values makes them strings for validation purposes ()
  // appending + '' to numbers as the validator only works with strings

  if (
    baseValidators.validateId(catId) &&
    !validator.isEmpty(formCategory.category_name) &&
    !validator.isEmpty(formCategory.category_description)
  ) {
    // Validation passed
    // create a new Product instance based on Product model object
    validatedCategory = new Category(
      catId,
      // escape is to sanitize - it removes/ encodes any html tags
      validator.escape(formCategory.category_name),
      validator.escape(formCategory.category_description)
    );
  } else {
    // debug
    console.log("validateNewCategory(): Validation failed");
  }
  console.log("validator cat:", validatedCategory);
  // return new validated product object

  return validatedCategory;
};
// Module exports
// expose these functions
module.exports = {
  validateCategory,
};
