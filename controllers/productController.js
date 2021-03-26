// Import router package
const router = require("express").Router();
//import cors

const { json } = require("body-parser");
//require the product service
//now all functions exported form the productService will be accessible to this controller
const productService = require("../services/productService.js");

//products route
router.get("/", async (req, res) => {
  //get products
  try {
    //call the product service to get a list of products
    //getProducts() is an async function so use await here
    const result = await productService.getProducts();
    //send the json result via http
    res.json(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//get a single product route
router.get("/:id", async (req, res) => {
  // let result;
  //read the id parameter of the request url
  const productId = req.params.id;
  console.log(productId, "controller");
  //get products by id
  try {
    const result = await productService.getProductById(productId);
    res.json(result);
    console.log(result, "result product id controller");
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//route for product category id
router.get("/cat/:id", async (req, res) => {
  let result;
  //read the parameter of cat id
  const catId = req.params.id;
  console.log(catId);
  //get product by category idf
  try {
    result = await productService.getProductsByCatId(catId);

    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//Post - inserts a new product
// The async function sends a new HTTP POST request
router.post("/", async (req, res) => {
  let result;
  const newProduct = req.body;

  //show whats copied to the console
  console.log("productController: ", newProduct);

  // Pass the new product data to the service an await the result
  try {
    //Send the response with the JSON result
    result = await productService.createProduct(newProduct);
    //send a json response back to the client
    res.json(result);
    //handle 500 server errors
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// PUT update product
// Like post but productId is provided and method = put
router.put("/", async (req, res) => {
  // the request body contains the new product values - copy it
  const product = req.body;
  // show what was copied in the console (server side)
  console.log("productController update: ", product);
  // Pass the new product data to the service and await the result
  try {
    // Send response with JSON result
    result = await productService.updateProduct(product);
    // send a json response back to the client
    res.json(result);
    // handle server (status 500) errors
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//delete  a single product route
router.delete("/:id", async (req, res) => {
  // let result;
  //read the id parameter of the request url
  const productId = req.params.id;

  //get products by id
  try {
    const result = await productService.deleteProduct(productId);
    //should return true or false
    res.json(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// export
module.exports = router;
