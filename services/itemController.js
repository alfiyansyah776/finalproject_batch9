import * as ItemRepo from '../util/itemRepository.js';
import { errorResp, successResp } from '../util/response.js'

export const addItem = async(request, response, next) => {
    try {
        let itemName = request.body.itemName;
        let itemPrice = request.body.itemPrice;
        let itemStock = request.body. itemStock;            
        const [result] = await ItemRepo.addItem (itemName, itemPrice, itemStock);
        successResp (response, "success menambahkan item", 201);
    } catch (error) {
        next(error)
    }
}

export const getItem = async(request, response, next) => {
    try {
        const[result] = await ItemRepo.getItem(100)
        successResp(response, "success mengambil item", result, 201)
    } catch (error) {
        next(error);
    }
}

export const updateItem = async(request, response, next) => {
    try {
        let item_id = request.params.id;
        let itemName = request.body.itemName;
        let itemPrice = request.body.itemPrice;
        let itemStock = request.body. itemStock;            
        const [result] = await ItemRepo.updateItem(itemName, itemPrice, itemStock, item_id)
        successResp (response, "success mengupdate item", 201);
    } catch (error) {
        next(error)
    }
}

export const deleteItem = async(request, response, next) => {
    try {
        let item_id = request.params.id;
        const[result] = await ItemRepo.deleteItem(item_id)
        successResp(response, "success menghapus item", 201)
    } catch (error) {
        next(error);
    }
}

export const getItembyId = async(request, response, next) => {
    try {
        let item_id = request.params.id;
        const[result] = await ItemRepo.getItembyId(1);
        successResp(response, "success mengambil item", result, 201)
    } catch (error) {
        next(error);
    }
}