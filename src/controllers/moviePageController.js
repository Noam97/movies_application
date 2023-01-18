import moviePageService from "../services/moviePageService";


let getMovieDetails = async (req, res) => {
    try {
        moviePageService.getMovieInfo(req.params.movieid).then(sql_res => {

            console.log(req.user)
            let obj = {players: sql_res[0], movieRating: sql_res[1], movieName: sql_res[2], movieId: req.params.movieid}
            res.render("moviePage.ejs", obj)
        })
    } catch (err) {
        console.log(err);
        req.flash("errors", err);
        return res.redirect("/homepage");
    }
}
/*
let userComment = async (req, res) => {
    try {
        moviePageService.addCommentsOfUser(req).then(sql_res => {
            console.log(req.comments)
            res.render("moviePage.ejs")
        })
    } catch (err) {
        console.log(err);
        req.flash("errors", err);
        return res.redirect("/homepage");
    }
}
*/

module.exports = {
    getMovieDetails: getMovieDetails
};
