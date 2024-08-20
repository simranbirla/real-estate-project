import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {

    const { username, password, email } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    console.log(hashedPassword)



    return res.json({
        message: "User is registered"
    })
}

export const login = async (req, res) => {
    return res.json({
        message: "Login"
    })
}

export const logout = async (req, res) => {
    return res.json({
        message: "logout"
    })
}