import DBConnection from "./../configs/DBConnection";



let addRatingOfUser = (str) => {
    const addRating = "INSERT INTO dbexample.rating (rate, Movie_ID) VALUES (7, 3);"
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                addRating, str,
                function (err, rows) {
                    if (err) {
                        reject(err)
                    }
                    resolve(rows);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
};



let getMovieInfo = (id) => {
    const playersInMovie = "SELECT name, birthyear, deathyear FROM player JOIN knownfor WHERE player.playerid = knownfor.playerid and knownfor.movieid = ? "
    const movieName = "SELECT name, genre, movieid FROM movie WHERE movie.movieid = ?"
    const movieInfo = "SELECT averagerating, numvotes FROM ratingtable WHERE ratingtable.movieid = ? "
    const comments = "SELECT comment, userid FROM rating WHERE rating.movieid = ?"
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
    })

    let commentsPromise = new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                comments, id,
                function (err, rows) {
                    if (err) {
                        console.log(err)
                        reject(err)
                    }
                    resolve(rows)
                }
            );
        } catch (err) {
            console.log(err)
            reject(err);
        }
    });


    // return  Promise.all([playersPromise, moviePromise, namesPromise])
    return  Promise.all([playersPromise, moviePromise, namesPromise, commentsPromise])

};



let addCommentsOfUser = async (userId, rating, comment, movieId) => {
    let select_user_rating_promise = new Promise(async (resolve, reject) => {
        try {
            DBConnection.query(
                'SELECT rate FROM rating WHERE userid = ? AND movieid = ?',
                [userId, movieId],
                function (err, result) {
                    if (err) {
                        console.log("Error ", err)
                        reject(false)
                    }
                    // if there was a vote beforehand -
                    if (result && result.length > 0) resolve(result[0].rate) // there was a vote by the user - return true
                    else resolve(null) // there wasn't a vote by the user - return false
                }
            );
        } catch (err) {
            console.log(err)
            reject(err);
        }
    });

    // If received a row -The USER ALREADY VOTED. remove it. in any case, change averagerating accordingly.

    let oldVal = await select_user_rating_promise

    // Already voted previously :
    if (oldVal !== null) {
        let update_rating_promise = new Promise(async (resolve, reject) => {
            try {
                DBConnection.query(
                    'UPDATE rating SET rate = ?, comment = ? WHERE userid = ? and movieid = ?',
                    [rating, comment, userId, movieId],
                    function (err, result) {
                        if (err) {
                            console.log("Error ", err)
                            reject(false)
                        }
                        resolve(true)

                    }
                );
            } catch (err) {
                console.log(err)
                reject(err);
            }
        });
        let newVal = rating
        var vote_adder = new Promise(async (resolve, reject) => {
            try {
                DBConnection.query(
                    'UPDATE ratingtable SET averagerating = (((averagerating * numvotes) - ? + ? ) / numvotes) WHERE movieid = ?',
                    [oldVal, newVal, movieId],
                    function (err, result) {
                        if (err) {
                            console.log("Error ", err)
                            reject(false)
                        }
                        resolve(true);
                    }
                );
            } catch (err) {
                console.log(err)
                reject(err);
            }
        });

    } else {
        let insert_promise = new Promise(async (resolve, reject) => {
            try {
                DBConnection.query(
                    'INSERT INTO rating (userid, movieid, rate, comment) VALUES(?, ?, ?, ?)',
                    [userId, movieId, rating, comment],
                    function (err, result) {
                        if (err) {
                            console.log("Error ", err)
                            reject(false)
                        }
                        resolve(true);
                    }
                );
            } catch (err) {
                console.log(err)
                reject(err);
            }
        });
        var vote_adder = new Promise(async (resolve, reject) => {
            try {
                DBConnection.query(
                    'UPDATE ratingtable SET averagerating = (((averagerating * numvotes) + ?) / (numvotes + 1)) , numvotes = numvotes + 1 WHERE movieid = ?',
                    [rating, movieId],
                    function (err, result) {
                        if (err) {
                            console.log("Error ", err)
                            reject(false)
                        }
                        resolve(true);
                    }
                );
            } catch (err) {
                console.log(err)
                reject(err);
            }
        });
    }
    return await vote_adder

    // let insert_promise = new Promise(async (resolve, reject) => {
    //     try {
    //         DBConnection.query(
    //             'INSERT INTO rating (userid, movieid, rate, comment) VALUES(?, ?, ?, ?) ON DUPLICATE KEY UPDATE rate = ?, comment = ?',
    //             [userId, movieId, rating, comment, rating, comment],
    //             function (err, result) {
    //                 if (err) {
    //                     console.log("Error ", err)
    //                     reject(false)
    //                 }
    //                 resolve("Created a new comment successfully.");
    //             }
    //         );
    //     } catch (err) {
    //         console.log(err)
    //         reject(err);
    //     }
    // });
    // return insert_promise
}


module.exports = {
    getMovieInfo: getMovieInfo,
    addRatingOfUser: addRatingOfUser,
    addCommentsOfUser:addCommentsOfUser,
};
