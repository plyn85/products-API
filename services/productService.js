//input validation package
const validator = require("validator");
const baseValidators = require("../validators/baseValidators.js");
const productRepository = require("../repositories/productRepository.js");
const productValidators = require("../validators/productValidators.js");
baseValidators;
//get all the product via the repository
// return the products
let getProducts = async () => {
  const products = await productRepository.getProducts();
  return products;
};

//get the product by id
let getProductById = async (productId) => {
  if (!baseValidators.validateId(productId)) {
    console.log("getProductsByCatId service error: invalid id parameter");
    return "invalid parameter";
  }

  //get the product if validation passed
  const products = await productRepository.getProductById(productId);
  console.log(products, "product service");
  return products;
};

// Get products for a particular category (by cat id)
// Validate input
// return products
let getProductsByCatId = async (catId) => {
  if (!baseValidators.validateId(catId)) {
    console.log("getProductsByCatId service error: invalid id parameter");
    return "invalid parameter";
  }
  // get products (if validation passed)
  const products = await productRepository.getProductsByCatId(catId);
  return products;
};

//insert a new product
// accepts product data as a parameter form the controller
let createProduct = async (product) => {
  //declare variable
  console.log("post request");
  let newlyInsertedProduct;
  console.log("product service :", product);
  //call the product validator kept in different file
  let validatedProduct = productValidators.validateProduct(product);
  //if the validator validates the product save to database
  if (validatedProduct != null) {
    newlyInsertedProduct = await productRepository.createProduct(
      validatedProduct
    );
  } else {
    //validation for product failed
    newlyInsertedProduct = { error: "invalid product" };

    //log the result
    console.log("productService.createProduct(): form validation failed");
  }

  //return the newly inserted product
  return newlyInsertedProduct;
};

//updates a  product
// product update service
let updateProduct = async (product) => {
  console.log("put request");
  // Declare variables and consts
  let updatedProduct;
  // call the product validator
  let validatedProduct = productValidators.validateProduct(product);

  // If validation returned a product object - save to database
  if (validatedProduct != null) {
    updatedProduct = await productRepository.updateProduct(validatedProduct);
  } else {
    // Product data failed validation
    updatedProduct = { error: "Product update failed" };
    // debug info
    console.log("productService.updateProduct(): form data validate failed");
  }
  // return the newly inserted product
  return updatedProduct;
};
//delete the product by id
let deleteProduct = async (productId) => {
  let deleteResult = false;
  //validate the input by call the id function form the base validators
  if (!baseValidators.validateId(productId)) {
    console.log("deleteProducts service error: invalid id parameter");
    return false;
  }

  //delete product by id

  deleteResult = await productRepository.deleteProduct(productId);
  console.log(deleteResult, "product service");

  return deleteResult;
};

//get all cat
//module exports
//exports the functions
module.exports = {
  getProducts,
  getProductById,
  getProductsByCatId,
  createProduct,
  updateProduct,
  deleteProduct,
};
