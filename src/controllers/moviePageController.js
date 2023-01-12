import moviePageService from "../services/moviePageService";


let getMovieDetails = async (req, res) => {
    try {
        moviePageService.getMovieInfo(req.params.movieid).then(arr => {
            if (arr[0] || arr[1] || arr[2])
                console.log(arr)
        })
    } catch (err) {
        console.log(err);
        req.flash("errors", err);
        return res.redirect("/homepage");
    }
}

module.exports = {
    getMovieDetails: getMovieDetails
};
