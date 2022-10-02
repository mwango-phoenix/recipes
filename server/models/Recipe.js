const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: 'This field is required.'
    },
    category: {
        type: String, 
        enum:['Drinks', 'Breakfast'],
        required: 'This field is required.'
    },
    ingredients: {
        type: Array, 
        required: 'This field is required.'
    },
    instructions: {
        type: String, 
        required: 'This field is required.'
    },
    image: {
        type: String, 
        required: 'This field is required.'
    },
});

module.exports = mongoose.model('Recipe', recipeSchema);