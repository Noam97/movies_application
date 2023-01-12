import DBConnection from "./../configs/DBConnection";
import bcrypt from "bcryptjs";

let findMovieByName = (str) => {
    console.log(str);
    const findMovieByName = "SELECT id,name FROM movie WHERE name LIKE ? "
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

module.exports = {
    findMovieByName: findMovieByName
};