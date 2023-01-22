import moviePageService from "../services/moviePageService";
import DBConnection from "../configs/DBConnection";


let getMovieDetails = async (req, res) => {
    try {
        moviePageService.getMovieInfo(req.params.movieid).then(sql_res => {
            let obj = {players: sql_res[0], movieRating: sql_res[1], movieName: sql_res[2],
            movieId: req.params.movieid, comments: sql_res[3]}
            // obj.comments -> [TextRow {comment: ...}, TextRow{comment: ..}, ...]
            res.render("moviePage.ejs", obj)
        })
    } catch (err) {
        console.log(err);
        req.flash("errors", err);
        return res.redirect("/homepage");
    }
}

// let getUserComment = async (req, res) => {
//     try {
//         moviePageService.addCommentsOfUser(req).then(sql_res => {
//             res.render("moviePage.ejs",sql_res[3])
//         })
//     } catch (err) {
//         console.log(err);
//         req.flash("errors", err);
//         return res.redirect("/homepage");
//     }
// }

let postUserComment = async (req, res) => {
    try {
        moviePageService.addCommentsOfUser(req.user.idusers, req.body.hiddenRating, req.body.feedback, req.params.movieid).then(sql_res => {
            res.redirect("/moviepage/"+ req.params.movieid)
        }).catch(err => {
            console.log(err)
        })
    } catch (err) {
        console.log(err);
        req.flash("errors", err);
        return res.redirect("/homepage");
    }
}


module.exports = {
    getMovieDetails: getMovieDetails,
    postUserComment:postUserComment
};
