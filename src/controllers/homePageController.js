let handleHelloWorld = async (req, res) => {
    return res.render("homepage.ejs",{
        user: req.user
    });
};

let getHomePage = (req, res) => {
    return res.render("homepage.ejs", {
        errors: req.flash("errors")
    });
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
    getHomePage: getHomePage
};
