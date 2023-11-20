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
            if(error.code === 11000 && error.keyPattern.email === 1){
                res.status(201).json({error: error, msg: "User already exist!"});
                return;
            }
            res.status(400).json({ error: error, msg: "Something went wrong!" });
        })
}

module.exports = createUser;