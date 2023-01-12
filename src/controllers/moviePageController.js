import moviePageService from "../services/moviePageService";


let getMovieInfo = async (req, res) => {
    try {
       let p = await moviePageService.getMovieInfo(req.params.movieid)
        console.log(p)
    } catch (err) {
        console.log(err);
        req.flash("errors", err);
        return res.redirect("/homepage");
    }
}

module.exports = {
    getMovieInfo: getMovieInfo
};
