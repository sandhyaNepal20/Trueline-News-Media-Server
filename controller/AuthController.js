
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "5b00dad07e7bb40f0b69fc27313440c985f8f63b645df1cda38036244a18216e";

const Credential = require("../model/Credential")

const register = async (req, res) => {
    const { username, password, role } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const cred = new Credential({ username, password: hashedpassword, role })
    cred.save();
    res.status(201).send(cred);

};

const login = async (req, res) => {
    const { username, password } = req.body;
    const cred = await Credential.findOne({ username });
    if (!cred || !(await bcrypt.compare(password, cred.password))) {
        return res.status(403).send('Invalid username or password');
    }

    const token = jwt.sign({ username: cred.username, role: cred.role },
        SECRET_KEY, { expiresIn: '1h' })
    res.json({ token });


};


module.exports = {
    login,
    register
}