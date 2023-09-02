const successResp = (response, message, data, status = 200) => {
    return response.status(status).json({
        status,
        message,
        data
    });
}

const errorResp = (response, message, status=400) => {
    return response.status(status).json ({
        status,
        message
    });
}

export {successResp, errorResp}