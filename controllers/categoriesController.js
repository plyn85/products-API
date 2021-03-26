// Import router package
const router = require("express").Router();
const c = require("config");
const categoriesService = require("../services/categoriesService");
const { route } = require("./productController");
/* Hand get requests for '/'
/* this is the index or home page
*/
router.get("/", async (req, res) => {
  let result;
  //get categories
  try {
    //define the result
    result = await categoriesService.getCategories();

    res.json(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});
//post insert a new category
router.post("/", async (req, res) => {
  let result;
  const newCategory = req.body;

  //show whats copied to the console
  console.log("categoriesController: ", newCategory);

  // Pass the new product data to the service an await the result
  try {
    //Send the response with the JSON result
    result = await categoriesService.createCategory(newCategory);
    //send a json response back to the client
    res.json(result);
    //handle 500 server errors
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//put route to update a category
// Like post but productId is provided and method = put
router.put("/", async (req, res) => {
  // the request body contains the new product values - copy it
  const category = req.body;
  // show what was copied in the console (server side)
  console.log("categoryController update: ", category);
  // Pass the new product data to the service and await the result
  try {
    // Send response with JSON result
    result = await categoriesService.updateCategory(category);
    // send a json response back to the client
    res.json(result);
    // handle server (status 500) errors
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//route that deletes a category

router.delete("/:id", async (req, res) => {
  //get the id of category to be deleted
  const categoryId = req.params.id;
  //show the id in the console
  console.log("categoryController delete: ", categoryId);
  try {
    result = await categoriesService.deleteCategory(categoryId);
    console.log(result);
    res.json(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

// export
module.exports = router;
