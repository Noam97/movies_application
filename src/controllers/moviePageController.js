import moviePageService from "../services/moviePageService";
import DBConnection from "../configs/DBConnection";


let getMovieDetails = async (req, res) => {
    try {
        moviePageService.getMovieInfo(req.params.movieid).then(sql_res => {
            let obj = {players: sql_res[0], movieRating: sql_res[1], movieName: sql_res[2],
            movieId: req.params.movieid, comments: sql_res[3]}
            res.render("moviePage.ejs", obj)
        })
    } catch (err) {
        console.log(err);
        req.flash("errors", err);
        return res.redirect("/homepage");
    }
}

let userComment = async (req, res) => {
    try {
        moviePageService.addCommentsOfUser(req).then(sql_res => {
            console.log(req.comments)
            res.render("moviePage.ejs",sql_res[3])
        })
    } catch (err) {
        console.log(err);
        req.flash("errors", err);
        return res.redirect("/homepage");
    }
}


let addCommentsOfUser = (data) => {
    return new Promise(async (resolve, reject) => {
        let comment = {comment: data};
        DBConnection.query(
            ' INSERT INTO rating set ? ', data,
            function (err, comment) {
                if (err) {
                    console.log("Error ", err)
                    reject(false)
                }
                resolve("Create a new comment successful");
            }
        );
    });
}

module.exports = {
    getMovieDetails: getMovieDetails,
    userComment: userComment,
    addCommentsOfUser:addCommentsOfUser
};
