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

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.get("/",function(req, res){
    res.render("home");
});

app.get("/secret", function(req,res){
    res.render("secret");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});