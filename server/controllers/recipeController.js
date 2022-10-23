require("../models/database");
const { isBuffer } = require("util");
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
 * GET /categories/:id
 * Recipes of a Category
 */
 exports.categoryById = async (req, res) => {
  try {
    //get Id
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryByTag = await Recipe.find({'category' : categoryId}).limit(limitNumber);
    //render index page and display categories
    res.render("categories", { title: "Recipes by Category", categoryByTag });
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

/**
 * POST /search
 * Search for recipe
 */
 exports.searchRecipe = async (req, res) => {
  try {
    // get search phrase
    let searchTerm = req.body.searchTerm;
    let recipeFind = await Recipe.find( {$text:{ $search:searchTerm, $diacriticSensitive: true}});
    res.render("search", { title: "Search Results", recipeFind});
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * GET /explore-recent
 * Find most recently added
 */
 exports.recentRecipes = async (req, res) => {
  try {
    const limitNumber = 20;
    const recipeList = await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
    //render index page and display categories
    res.render("explore-recent", { title: "Recently Added", recipeList });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * GET /random
 * Return Random recipe
 */
 exports.getRandom = async (req, res) => {
  try {
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    //render index page and display categories
    res.render("random", { title: "Recently Added", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};


/**
 * GET /submit
 * Add new recipe to database
 */
 exports.addRecipe = async (req, res) => {
  try {
    // Errors to display to user
    const errorObj = req.flash('infoErrors');
    // Success messages
    const submitObj = req.flash('infoSubmit');
    //render index page and display categories
    res.render("submit", { title: "Add New Recipe", errorObj, submitObj });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * Post /submitRecipe
 * Submit new recipe
 */
 exports.submitRecipe = async (req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;
    if(!req.files || Object.keys(req.files).length === 0) {
      console.log('No files uploaded.');
    } else {
      imageUploadFile = req.files.image;
      newImageName = imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
      imageUploadFile.mv(uploadPath, function(err) {
        if(err) return res.status(500).send(err);
      })
    }
    // Add data
    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      category: req.body.category,
      image: newImageName
    });

    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.');
    //render index page and display categories
    res.redirect("/submit");
  } catch (error) {
    req.flash('infoErrors', error);
    res.redirect("/submit");
  }
};



// async function updateRecipe() {
//   try {
//     const res = await Recipe.updateOne({name: ''}, {name: ''});
//     res.n // number of docs matching
//     res.nModified; //number of docs modified
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function deleteRecipe() {
//   try {
//     await Recipe.deleteOne({name: ''});
    
//   } catch (error) {
//     console.log(error);
//   }
// }


// //insert data to database
// async function insertDummyCategoryData() {
//   try {
//     // data to insert
//     await Category.insertMany([
//       {
//         name: "Breakfast",
//         image: "breakfast.jpg",
//       },
//       {
//         name: "Lunch",
//         image: "lunch.jpg",
//       },
//       {
//         name: "Dinner",
//         image: "dinner.jpg",
//       },
//       {
//         name: "Dessert",
//         image: "desserts.jpg",
//       },
//     ]);
//   } catch (error) {
//     console.log("err", +error);
//   }
// }

// insertDummyCategoryData();
