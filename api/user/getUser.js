const UserModel = require("../../models/user")

const getUser = (req, res) => {
    UserModel.find({ _id: req.user.userID })
        .then((user) => {
            if (user) {
                res.status(200).json({
                    data: user,
                    msg: "User found",
                });
            }
            else {
                res.status(401).json({
                    data: null,
                    msg: "User not found",
                });
            }
        })
        .catch(error => {
            console.log("Error in getUser: " + error);
            res.status(400).json({
                error: error,
                msg: "Error",
            });
        })
}
module.exports = getUser;