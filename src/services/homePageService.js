import DBConnection from "./../configs/DBConnection";
import bcrypt from "bcryptjs";

let findMovieByName = (str) => {
    console.log(str);
    const findMovieByName = "SELECT id,name FROM movie WHERE name LIKE '% "+
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

module.exports = {
    findMovieByName: findMovieByName,
    getRecommended: getRecommended
};