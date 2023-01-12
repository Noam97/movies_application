import DBConnection from "./../configs/DBConnection";

let getMovieInfo =  async (movieid) => {
    const playersInMovie = "SELECT name FROM player JOIN knownfor WHERE player.playerid = knownfor.playerid and knownfor.movieid = ? "
    const movieInfo = "SELECT name, averagerating FROM ratingtable JOIN movie WHERE ratingtable.movieid = movie.movieid and movie.movieid = ? "
    let playersPromise = new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                playersInMovie, movieid,
                function (err, rows) {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    resolve(rows);
                }
            );
        } catch (err) {
            console.log(err)
            reject(err);
        }
    })
    let moviePromise = new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                movieInfo, movieid,
                function (err, rows) {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    resolve(rows);
                }
            );
        } catch (err) {
            console.log(err)
            reject(err);
        }
    });
    let res = await Promise.all([playersPromise, moviePromise])
    return res
};

module.exports = {
    getMovieInfo: getMovieInfo
};
