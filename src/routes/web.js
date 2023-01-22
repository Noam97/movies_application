import express from "express";
import homePageController from "../controllers/homePageController";
import registerController from "../controllers/registerController";
import loginController, {checkLoggedIn} from "../controllers/loginController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";
import moviePageController from "../controllers/moviePageController";

// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.get("/homepage", homePageController.getHomePage);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.post("/logout", loginController.postLogOut);

    router.post("/searchByName", loginController.checkLoggedIn, homePageController.findMovieByName);

    router.get("/getRecommended", loginController.checkLoggedIn, homePageController.getRecommended);

    router.post("/getBestPlayer", loginController.checkLoggedIn, homePageController.getBestPlayer);

    router.get("/compare", loginController.checkLoggedIn, homePageController.comparePlayers)

    router.post("/highestGenre", loginController.checkLoggedIn, homePageController.highestGenre);

    router.get("/moviepage/:movieid",loginController.checkLoggedIn, moviePageController.getMovieDetails);
    router.post("/moviepage/:movieid",loginController.checkLoggedIn,moviePageController.postUserComment);

    return app.use("/", router);


};

module.exports = initWebRoutes;
