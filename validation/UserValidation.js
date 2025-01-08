const joi = require("joi");


const userSchema = joi.object({
    full_name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required()
})


function UserValidation(req, res, next) {
    const { full_name, email, password } = req.body;
    const { error } = userSchema.validate({ full_name, email, password })
    if (error) {
        return res.json("Data validation failed")
    }
    next()

}

module.exports = UserValidation;