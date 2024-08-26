export const successRequest = (res, status, data) => {
    return res.status(status).json({
        success: true,
        data
    })
}

export const errorHandler = (message, status) => {
    const error = new Error();
    error.statusCode = status,
        error.message = message
    return message
}