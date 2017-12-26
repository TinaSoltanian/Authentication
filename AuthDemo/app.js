var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParses              = require("body-parser"),
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    user                    = require("./models/user");
   
var app = express();   

mongoose.connect("mongodb://localhost/auth_demo_app", {useMongoClient: true});
app.use(require("express-session")({
   secret: "this is secret!",
   resave: false,
   saveUninitialized: false
}));

app.set("view engine","ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParses.urlencoded({extended: true}));

passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//====================
//   ROUTES
//====================

app.get("/",function(req, res){
    res.render("home");
});

app.get("/secret", function(req,res){
    res.render("secret");
})

//show sign up form
app.get("/register", function(req, res) {
    res.render("register");
})

app.post("/register", function(req, res){
    req.body.username
    req.body.password
    user.register(new user({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        } 
        
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    })
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});