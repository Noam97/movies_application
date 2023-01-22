import DBConnection from "./../configs/DBConnection";
import bcrypt from "bcryptjs";

let findMovieByName = (str) => {
    const findMovieByName = "SELECT id,name, movieid FROM movie WHERE name LIKE '% "+
                            str+" %' OR name LIKE '% "+
                            str+"' OR name LIKE '"+
                            str+" %' OR name LIKE '"+str+"' "
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                findMovieByName, str,
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


let getRecommended = () => {
    const findRecommended = "SELECT name, averagerating FROM dbexample.ratingtable JOIN dbexample.movie WHERE dbexample.movie.movieid = dbexample.ratingtable.movieid AND dbexample.ratingtable.averagerating > 5;"
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                findRecommended,
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


let getBestPlayer = async (player1, player2) => {
    console.log("recived:", player1, player2)
    const findPlayerByName = "SELECT playerid, name FROM player WHERE name = ? COLLATE utf8mb4_unicode_ci or name = ? COLLATE utf8mb4_unicode_ci"
    const findPlayerRating = "SELECT playerid, AVG(averagerating) as playerrating FROM knownfor JOIN ratingtable WHERE knownfor.movieid = ratingtable.movieid and (playerid=? COLLATE utf8mb4_unicode_ci or playerid=? COLLATE utf8mb4_unicode_ci) GROUP BY playerid"
    try {
        let promiseByName = new Promise((resolve, reject) => {
            try {
                DBConnection.query(
                    findPlayerByName, [player1, player2],
                    function (err, rows) {
                        if (err) {
                            reject(err)
                        }
                        let found1 = -1, found2 = -1;
                        let counter = 0;
                        rows.forEach(function (player) {
                            if (player.name === player1) found1 = counter;
                            else if (player.name === player2) found2 = counter;
                            counter = counter + 1;
                        })
                        if (found1 === -1 || found2 === -1) {
                            resolve(null)
                        }
                        resolve([rows[found1], rows[found2]])
                    }
                );
            } catch (err) {
                reject(err);
            }
        });
        let players = await promiseByName
        let obj = {}
        if (players) {
            let promisePlayerRating = new Promise((resolve, reject) => {
                try {
                    DBConnection.query(
                        findPlayerRating, [players[0].playerid, players[1].playerid],
                        function (err, rows) {
                            if (err) {
                                reject(err)
                            }
                            if (rows[0].playerrating > rows[1].playerrating) {
                                resolve([rows[0], rows[1]])
                            } else {
                                resolve([rows[1], rows[0]])
                            }

                        }
                    );
                } catch (err) {
                    reject(err);
                }
            });
            let playerRating = await promisePlayerRating
            if (players[0].playerid === playerRating[0].playerid) {
                obj.player1 = {name: players[0].name, rating: playerRating[0].playerrating}
                obj.player2 = {name: players[1].name, rating: playerRating[1].playerrating}
            } else {
                obj.player1 = {name: players[1].name, rating: playerRating[0].playerrating}
                obj.player2 = {name: players[0].name, rating: playerRating[1].playerrating}
            }
        }
        console.log("names", players[0].name, players[1].name)
        console.log("object:", obj)
        return obj
    } catch(err) {
        return null
    }

};



let highestGenre = (str) => {
    const findHighestGenre = "SELECT averagerating, name FROM dbexample.movie JOIN dbexample.ratingtable WHERE dbexample.movie.movieid = dbexample.ratingtable.movieid and genre LIKE '%"+str+"%' ORDER BY averagerating DESC LIMIT 1;"
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                findHighestGenre, str,
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

let playersList = () => {
    const player_list_query = "SELECT name, playerid FROM player ORDER BY name"
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                player_list_query,
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
}



module.exports = {
    findMovieByName: findMovieByName,
    getRecommended: getRecommended,
    getBestPlayer: getBestPlayer,
    highestGenre: highestGenre,
    playersList: playersList
};