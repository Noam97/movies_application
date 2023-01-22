import homePageService from "../services/homePageService";



let findMovieByName = async (req, res) => {
    try {
        homePageService.findMovieByName(req.body.searchname).then(async (rows) => {
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
        console.log("sent:", req.body.player1, req.body.player2)
        let obj = await homePageService.getBestPlayer(req.body.player1, req.body.player2)
        console.log(obj)

        res.render("homepage.ejs", {searchbyname: [],
                recommended: [],
                bestplayer: [],
                highestgenre: [], player_better: obj.player1.name, player_better_rating: obj.player1.rating, player_worse: obj.player2.name, player_worse_rating: obj.player2.rating})
            // let ans = JSON.stringify(rows);
            // return res.send(rename(ans));
    } catch (err) {
        console.log(err);
        req.flash("errors", err);
        return res.redirect("/login");
    }
}


let highestGenre = async (req, res) => {
    try {
        await homePageService.highestGenre(req.body.highestid).then(async (rows) => {
            res.render("homepage.ejs", {highestgenre: rows})
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
        bestplayer: [],
        highestgenre: []
    });
};

let getHomePage = async (req, res) => {
    return res.render("homepage.ejs", {
        errors: req.flash("errors"),
        searchbyname: [],
        recommended: [],
        bestplayer: [],
        highestgenre: []
    });
};

let comparePlayers = async (req, res) => {
    try {
        await homePageService.playersList().then(rows => {
            res.render("comparePlayers.ejs", {players: rows})
        })
    } catch (err) {
        console.log(err);
        req.flash("errors", err);
        return res.redirect("/login");
    }
}
module.exports = {
    handleHelloWorld: handleHelloWorld,
    getHomePage: getHomePage,
    findMovieByName: findMovieByName,
    getRecommended: getRecommended,
    getBestPlayer: getBestPlayer,
    highestGenre: highestGenre,
    comparePlayers: comparePlayers
};
