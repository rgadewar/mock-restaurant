// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    // console.log("I am here in middleware")
    // console.log("Middleware - User ID:", req.session.passport.user.id);

    // console.log("req.session.loggedIn " + req.session.loggedIn)
    if (!req.user) {
      // return res.redirect("/login");
      res.render('login', { loggedIn: false }); 
    } else {
      // console.log(req.user.id)
      return next();
    }
  };

