const user = require('../models/user');
const Controller = require('./Controller');
class Users extends Controller{
    constructor(){
        super();
    }
    index(req, res){
        let msg = "";
        if(req.session.msg){
            msg = req.session.msg;
        }
        res.render('index', {msg});
        req.session.destroy();
    }
    async login(req, res){
        let result = await user.login_process(req.body);
        if(result){
            req.session.isLoggedIn = true;
            req.session.first_name = result.first_name;
            req.session.last_name = result.last_name;
            req.session.email = req.body.email;
            res.redirect('/home')
        }else{
            req.session.msg = "Invalid Username or Password";
            res.redirect('/')
        }
        res.end();
    }
    async register(req, res){
        /* Form Validation */
        let form_validation = require('./form_validation');
        form_validation.validate(req.body);
        let result = form_validation.run("Not Null, No Number");
        if(result.length == 0){
            result = await user.registration(req.body);
            console.log(result);
            if(!result){
                req.session.msg = "Unable to Register";
            }else{
                req.session.msg = "Registration Successful";
            }
        }else{
            console.log("Lag in ansaksespowli");
        }
        res.redirect('/');
    }
    home(req, res){
        if(req.session.isLoggedIn){
            let data = {
                name: req.session.first_name+" "+req.session.last_name,
                email: req.session.email
            }
            res.render('home', {data});
        }else{
            res.redirect('/');
        }
    }
    logout(req, res){
        req.session.destroy();
        res.redirect('/');
    }
}
module.exports = new Users;