require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

/**
 * GET /
 * Homepage
 */

//request and response
exports.homepage = async (req, res) => {
  try {
    //database query to grab categories
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    //get latest recipes
    const latest = await Recipe.find({}).sort({_id:-1}).limit(limitNumber);

    //get recipes of certain category
    const drinks = await Recipe.find({ 'category': 'Drinks'}).limit(limitNumber);
    const breakfast = await Recipe.find({ 'category': 'Breakfast'}).limit(limitNumber);
    
    const recent = { latest, drinks, breakfast };




    //render index page and display categories
    res.render("index", { title: "My Recipes - Home", categories, recent });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * GET /categories
 * Categories
 */
exports.byCategory = async (req, res) => {
  try {
    //database query to grab categories
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);

    //render index page and display categories
    res.render("categories", { title: "View Recipes by Category", categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * GET /recipe/:id
 * Recipes page
 */
 exports.exploreRecipes = async (req, res) => {
  try {
    //get recipe id
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    //render index page and display categories
    res.render("recipe", { title: "Recipe page", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};



// //insert data to database
// async function insertDymmyCategoryData() {
//   try {
//     // data to insert
//     await Recipe.insertMany([
//       {
//         name: "Thai-Chinese-inspired pinch salad",
//         category: "Breakfast",
//         ingredients: [
//           "5 cm piece of ginger",
//           "1 fresh red chilli",
//           "25 g sesame seeds",
//           "24 raw peeled king prawns , from sustainable sources (defrost first, if using frozen)",
//           "1 pinch Chinese five-spice powder",
//         ],
//         image: "drinks.jpeg",
//       },
//     ]);
//   } catch (error) {
//     console.log("err", +error);
//   }
// }

// insertDymmyCategoryData();
