import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            return res.status(403).json({
                error: "Not Authenticated"
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, function (err, payload) {
            if (err) {
                return res.status(403).json({
                    error: "Token not valid"
                })
            }

            req.userId = payload.data.id
            next()
        });
    } catch (e) {
        console.log(e)
        return res.status(403).json({
            error: "Not Authenticated"
        })
    }
}

export const verifyUser = async (req, res, next) => {
    if (req.userId !== req.params.id) {
        return res.status(401).json({
            error: "You are not authorized"
        })
    }

    next();
}