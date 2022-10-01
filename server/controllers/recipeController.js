require("../models/database");
const Category = require("../models/Category");

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

    //render index page and display categories
    res.render("index", { title: "My Recipes - Home", categories });
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured"});
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
      res.status(500).send({message: error.message || "Error Occured"});
    }
  };

//insert data to database
// async function insertDymmyCategoryData() {
//   try {
//     // data to insert
//     await Category.insertMany([
//       {
//         name: "Drinks",
//         image: "drinks.jpeg",
//       },
//     ]);
//   } catch (error) {
//     console.log("err", +error);
//   }
// }

// insertDymmyCategoryData();
