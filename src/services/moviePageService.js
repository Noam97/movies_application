import DBConnection from "./../configs/DBConnection";


let addCommentsOfUser = (data) => {
    return new Promise(async (resolve, reject) => {
        console.log(data)
        let comment = {comment: data};

        DBConnection.query(
            ' INSERT INTO rating set ? ', comment,
            function (err, rows) {
                if (err) {
                    console.log("Error ", err)
                    reject(false)

                }
                resolve("Create a new comment successful");
            }
        );
    });
}

let getMovieInfo = (id) => {
    const playersInMovie = "SELECT name, birthyear, deathyear FROM player JOIN knownfor WHERE player.playerid = knownfor.playerid and knownfor.movieid = ? "
    const movieName = "SELECT name, genre, movieid FROM movie WHERE movie.movieid = ?"
    const movieInfo = "SELECT averagerating, numvotes FROM ratingtable WHERE ratingtable.movieid = ? "
    // const comments = "SELECT comment FROM rating WHERE raiting.movieid = ?"
    console.log(id)
    let playersPromise = new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                playersInMovie, id,
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
                movieInfo, id,
                function (err, rows) {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    resolve(rows[0]);
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
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    resolve(rows[0]);
                }
            );
        } catch (err) {
            console.log(err)
            reject(err);
        }
    });
    /*
    let commentsPromise = new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                comments, id,
                function (err, rows) {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    if (rows == null || rows.length == 0)
                        resolve(null)
                    else
                        resolve(rows[0]);
                }
            );
        } catch (err) {
            console.log(err)
            reject(err);
        }
    })
    */

    return  Promise.all([playersPromise, moviePromise, namesPromise])

};

module.exports = {
    getMovieInfo: getMovieInfo
};
