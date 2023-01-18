import homePageService from "../services/homePageService";


let findMovieByName = async (req, res) => {
    try {
        await homePageService.findMovieByName(req.body.searchname).then(async (rows) => {
            res.render("homepage.ejs", {searchbyname: rows})
            // let ans = JSON.stringify(rows);
            // return res.send(rename(ans));
        });
    } catch (err) {
        console.log(err);
        req.flash("errors", err);
        return res.redirect("/login");
    }
}

let getRecommended = async (req, res) => {
    try {
        await homePageService.getRecommended().then(async (rows) => {
            console.log(rows);
            res.render("homepage.ejs", {recommended: rows})
            // let ans = JSON.stringify(rows);
            // return res.send(rename(ans));
        });
    } catch (err) {
        console.log(err);
        req.flash("errors", err);
        return res.redirect("/login");
    }
}


let getBestPlayer = async (req, res) => {
    try {
        await homePageService.getBestPlayer(req.body.playernames).then(async (rows) => {
            console.log(rows);
            res.render("homepage.ejs", {bestplayer: rows})
            // let ans = JSON.stringify(rows);
            // return res.send(rename(ans));
        });
    } catch (err) {
        console.log(err);
        req.flash("errors", err);
        return res.redirect("/login");
    }
}



let handleHelloWorld = async (req, res) => {
    return res.render("homepage.ejs",{
        user: req.user,
        searchbyname: [],
        recommended: [],
        bestplayer: []
    });
};

let getHomePage = (req, res) => {
    return res.render("homepage.ejs", {
        errors: req.flash("errors"),
        searchbyname: [],
        recommended: [],
        bestplayer: []
    });
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
    getHomePage: getHomePage,
    findMovieByName: findMovieByName,
    getRecommended: getRecommended,
    getBestPlayer: getBestPlayer
};
