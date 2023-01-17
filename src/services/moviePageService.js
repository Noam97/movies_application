import DBConnection from "./../configs/DBConnection";

let getMovieInfo =   (id) => {
    const playersInMovie = "SELECT name FROM player JOIN knownfor WHERE player.playerid = knownfor.playerid and knownfor.movieid = ? "
    const movieName = "SELECT name FROM movie WHERE movie.movieid = ?"
    const movieInfo = "SELECT averagerating FROM ratingtable WHERE ratingtable.movieid = ? "
    console.log(id)
    let playersPromise = new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                playersInMovie, id,
                function (err, rows) {
                    console.log(rows)
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
                movieInfo, id,
                function (err, rows) {
                    console.log(rows)
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
    let namesPromise = new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                movieName, id,
                function (err, rows) {
                    console.log(rows)
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

    return  Promise.all([playersPromise, moviePromise, namesPromise])

};

module.exports = {
    getMovieInfo: getMovieInfo
};
