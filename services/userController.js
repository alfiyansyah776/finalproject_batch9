import * as UserRepo from '../util/userRepository.js';
import { errorResp, successResp } from '../util/response.js'
import bcrypt, {hash} from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_ACCESS_TOKEN = 'ndk9012ajskd92kaldnma9ckmacma90';
const SECRET_REFRESH_TOKEN = 'admdmiaow01jdkmklcm90z24289';

//membuat controller createUser
export const createUser = async(request, response, next) => {
    try {
        let username = request.body.username;
        let email = request.body.email;
        let password = request.body.password;
        let birthdate = request.body.birthdate;
        let address = request.body.address;
        let card_number = request.body.card_number;
        let saltRound = 10;

        bcrypt.hash(password, saltRound, async(error, hash )=>{
            const [result] = await UserRepo.createUser (username, email, hash, birthdate, address, card_number);
            successResp (response, "success menambahkan data", 201);
        })
    } catch (error) {
        next(error)
    }
}

//membuat controller getUser
export const getUser = async(request, response, next) => {
    try {
        const[result] = await UserRepo.getUser(100)
        successResp(response, "success mengambil data", result)
    } catch (error) {
        next(error);
    }
}

//membuat controller updateUser
export const updateUser = async(request, response, next) => {
    try {
        let username = request.body.username;
        let email = request.body.email;
        let birthdate = request.body.birthdate;
        let address = request.body.address;
        let card_number = request.body.card_number;
        let user_id = request.params.id;
        const[result] = await UserRepo.updateUser(username, email, birthdate, address, card_number, user_id);
        successResp(response, "success memperbarui data", result, 201);
    } catch (error) {
        next(error);
    }   
}

//membuat controller deleteUser
export const deleteUser = async(request, response, next) => {
    try {
        let user_id = request.params.id
        const [result] = await UserRepo.deleteData (user_id);
        successResp(response, "success menghapus data", result);
    } catch (error) {
        next (error);   
    }
}

export const getUserbyEmail = async(request, response, next) => {
    try {
        let email = request.body.email
        const[result] = await UserRepo.getUserbyEmail(email)
        successResp(response, "success mengambil data", result[0])
    } catch (error) {
        next(error);
    }
}

export const auth = async(request, respons, next) => {
    try {
        let email = request.body.email;
        let password = request.body.password;
        const [result] = await UserRepo.getUserbyEmail(email)

        if (result.length > 0) {
            const user = result[0]
            bcrypt.compare (password, user.password, (error, result) => {
                if (result) {
                    let claims = {
                        id: user.user_id,
                        name: user.username,
                        email: user.email
                    };
                    let accessToken = jwt.sign(claims, SECRET_ACCESS_TOKEN, {expiresIn:'15m'});
                    let refreshToken = jwt.sign(claims, SECRET_REFRESH_TOKEN, {expiresIn:'30m'});
                    let data = {
                        access_token: accessToken,
                        refreshToken: refreshToken
                    }
                    successResp(respons, "success login", data)
                } else {
                    errorResp(respons, "invalid email or password", 401)
                }
            })
        }
    } catch (error){
        next(error)
    }
}

export const validateToken = (request, response, next) => {
    const authHeader = request.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1];

    if (accessToken == null) {
        errorResp(response, "invalid request")
    }
    jwt.verify(accessToken, SECRET_ACCESS_TOKEN, (error, claims) => {
        if (error) {
            errorResp(response, error.message, 403)
        } else {
            request.claims = claims;
            console.log(claims)
            next()
        }
    })
}
