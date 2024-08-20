export const createPost = async (req, res) => {
    return res.json({
        message: "CREATE"
    })
}

export const getPosts = async (req, res) => {
    return res.json({
        message: "GET POSTS"
    })
}

export const getPostById = async (req, res) => {
    return res.json({
        message: "GET BY ID"
    })
}