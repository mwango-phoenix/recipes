

/** 
 * GET /
 * Homepage
*/

//request and response
exports.homepage = async(req, res) => {
    //render index page
    res.render('index', {title: 'My Recipes - Home'});
}
