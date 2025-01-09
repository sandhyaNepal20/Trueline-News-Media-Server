const jwt = require("jsonwebtoken");
const SECRET_KEY = "5b00dad07e7bb40f0b69fc27313440c985f8f63b645df1cda38036244a18216e";

function authenticateToken(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).send("Access Denied: No token provided")
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY)
        req.user = verified;
        next()
    } catch (e) {
        res.status(400).send("Invalid token")
    }
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send("Assess Denied: Insufficient Permission")

        } next();
    }

}
module.exports = { authenticateToken, authorizeRole }