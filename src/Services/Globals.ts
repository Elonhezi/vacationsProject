// General globals for development and production: 
abstract class Globals {
    // ...
}

// General globals only for development:
class DevelopmentGlobals extends Globals {
    // public productsUrl = "http://localhost:3001/api/vacations/";
    // back-end:
    public vacationsUrl = "http://localhost:3001/api/vacations/";  
    public usersUrl = "http://localhost:3001/api/users/"; 
    public followersUrl = "http://localhost:3001/api/followers/"; 
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
    public captchaUrl = "http://localhost:3001/api/auth/captcha/";
    public socketUrl = "http://localhost:3001/";

}


// General globals only for production:
class ProductionGlobals extends Globals {
    public vacationsUrl = "https://elon-vacations.herokuapp.com/api/vacations/";
    public usersUrl = "https://elon-vacations.herokuapp.com/api/users/"; 
    public followersUrl = "https://elon-vacations.herokuapp.com/api/followers/"; 
    public registerUrl = "https://elon-vacations.herokuapp.com/api/auth/register/";
    public loginUrl = "https://elon-vacations.herokuapp.com/api/auth/login/";
    public captchaUrl = "https://elon-vacations.herokuapp.com/api/auth/captcha/";
    public socketUrl = "https://elon-vacations.herokuapp.com/";
}

const globals = process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;