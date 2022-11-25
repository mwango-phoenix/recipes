const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: 'This field is required.'
    },
    category: {
        type: [String], 
        enum:['Drinks', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Sauce', 'Soup/Stew', 'Side Dish', 'Bread', 'Pastry', 'Pancakes/Waffles/Crepes', 'Street Food'],
        required: 'This field is required.'
    },
    description: {
        type: String, 
        required: 'This field is required.'
    },
    servingSize: {
        type: String
    },
    ingredients: {
        type: Array, 
        required: 'This field is required.'
    },
    instructions: {
        type: Array, 
        required: 'This field is required.'
    },
    image: {
        type: String, 
        required: 'This field is required.'
    },
});

recipeSchema.index({name: 'text', ingredients: 'text'});

module.exports = mongoose.model('Recipe', recipeSchema);