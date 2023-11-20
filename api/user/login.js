const UserModel = require("../../models/user")
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'Please send email and password', msg: 'Error' });
        return;
    }
    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            res.status(400).json({ error: 'User not found', msg: 'Error' }); return;
        }
        if (await bcrypt.compare(password, user.password)) {
            res.status(200).json({ data: { token: user.generateAuthToken() }, msg: 'User logged in' }); return;
        }
        res.status(400).json({ error: 'Invalid credentials', msg: 'Error' }); return;
    }
    catch (error) { res.status(500).json({ error: error, msg: 'Error' }); }
}
module.exports = login;