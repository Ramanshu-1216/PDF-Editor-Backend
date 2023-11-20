const UserModel = require("../../models/user")

const createUser = (req, res) => {
    const { password, email } = req.body;
    const user = new UserModel({
        password: password,
        email: email,
    });
    user.save()
        .then(() => {
            res.status(200).json({ data: { token: user.generateAuthToken() }, msg: 'User Created' });
        })
        .catch(error => {
            res.status(400).json({ error: error, msg: "Error" });
        })
}

module.exports = createUser;