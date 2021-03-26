// Input validation package
// https://www.npmjs.com/package/validator
const validator = require("validator");
const baseValidators = require("./baseValidators.js");

// models
const Product = require("../models/product.js");
// Validate the body data, sent by the client, for a new product
// formProduct represents the data filled in a form
// It needs to be validated before using in the application
let validateProduct = (formProduct) => {
  // Declare constants and variables
  let validatedProduct;
  // New product has no id
  let productId = 0;

  // debug to console - if no data
  if (formProduct === null) {
    console.log("validateNewProduct(): Parameter is null");
  }

  // Check if id field is included in the form object
  if (formProduct.hasOwnProperty("_id")) {
    productId = formProduct._id;
  }

  // Validate form data for new product fields
  // Creating a product does not need a product id
  // Adding '' to the numeric values makes them strings for validation purposes ()
  // appending + '' to numbers as the validator only works with strings
  if (
    baseValidators.validateId(productId) &&
    baseValidators.validateId(formProduct.category_id) &&
    !validator.isEmpty(formProduct.product_name) &&
    !validator.isEmpty(formProduct.product_description) &&
    baseValidators.validatePositiveNumber(formProduct.product_stock) &&
    baseValidators.validatePrice(formProduct.product_price)
  ) {
    // Validation passed
    // create a new Product instance based on Product model object
    validatedProduct = new Product(
      productId,
      formProduct.category_id,
      // escape is to sanitize - it removes/ encodes any html tags
      validator.escape(formProduct.product_name),
      validator.escape(formProduct.product_description),
      formProduct.product_stock,
      formProduct.product_price
    );
  } else {
    // debug
    console.log("validateNewProduct(): Validation failed");
  }
  // return new validated product object
  return validatedProduct;
};
// Module exports
// expose these functions
module.exports = {
  validateProduct,
};
