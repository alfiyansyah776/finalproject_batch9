import { request } from 'http';
import * as CartRepo from '../util/cartRepository.js'
import * as ItemRepo from '../util/itemRepository.js';
import { errorResp, successResp } from '../util/response.js'

export const addCart = async(request, response, next) => {
    try {
        let user_id = request.claims.id;
        console.log(user_id);
        let item_id = request.body.item_id;
        let quantity = request.body. quantity;
        let total_count = request.body.total_count;
        let cart_code = request.body.cart_code;            
        const [result] = await CartRepo.addCart(user_id, item_id, quantity, total_count, cart_code);
        const [update] = await ItemRepo.updateStockItembyId(item_id, cart_code, item_id);
        successResp (response, "success menambahkan item", 201);
    } catch (error) {
        next(error)
    }
}

export const getCart = async(request, response, next) => {
    try {
        const[result] = await CartRepo.getCart(100)
        successResp(response, "success mengambil keranjang", result, 201)
    } catch (error) {
        next(error);
    }
}


export const updateCart = async(request, response, next) => {
    try {
        let quantity = request.body.quantity;
        let total_count = request.body.total_count;
        let cart_id = request.params.id;         
        const [result] = await CartRepo.updateCart(quantity, total_count, cart_id)
        successResp (response, "success mengupdate cart", 201);
    } catch (error) {
        next(error)
    }
}

export const deleteCart = async(request, response, next) => {
    try {
        let cart_id = request.params.id;
        const[result] = await CartRepo.deleteCart(cart_id)
        successResp(response, "success menghapus cart", 201)
    } catch (error) {
        next(error);
    }
}

export const getTotalCountById = async (request, response, next) => {
    try {
        let user_id = request.params.id;
        const[result] = await CartRepo.getTotalCountById(user_id)
        successResp(response, "success", result[0], 201)
    } catch (error) {
        next(error);
    }
}
