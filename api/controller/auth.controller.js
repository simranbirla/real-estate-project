export const createUser = async (req, res) => {
    return res.json({
        message: "Register"
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