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


let getBestPlayer = (str) => {
    const myArray = str.split(",");
    var name1 = myArray[0];
    var name2 = myArray[1];
    const findBestPlayer = "SELECT playerid, AVG(averagerating) as playerrating FROM knownfor JOIN ratingtable WHERE knownfor.movieid = ratingtable.movieid and (playerid= '"+name1+"' or playerid='"+name2+"') GROUP BY (playerid);"
    return new Promise((resolve, reject) => {
        try {
            DBConnection.query(
                findBestPlayer, 
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



module.exports = {
    findMovieByName: findMovieByName,
    getRecommended: getRecommended,
    getBestPlayer: getBestPlayer,
    highestGenre: highestGenre
};