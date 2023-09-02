import dbpool from "../db/database.js";

//menambahkan item dan memasukkan ke database
export const addItem = (itemName, itemPrice, itemStock) => {
    let added_at = new Date;
    const sql = "INSERT INTO item (itemName, itemPrice, itemStock, added_at) VALUE (?,?,?,?)"
    const values = [itemName, itemPrice, itemStock, added_at]

    return dbpool.query(sql, values);

}

//mendapatkan data item dari database
export const getItem = (limit) => {
    const sql = "SELECT item_id, itemName, itemPrice, itemStock, added_at FROM item LIMIT ?"
    const values = [limit];

    return dbpool.query(sql, values)
}

//memperbarui data item 
export const updateItem = (itemName, itemPrice, itemStock, item_Id) => {
    let updated_at = new Date;
    const sql = "UPDATE item SET itemName = ?, itemPrice = ?, itemStock =?, updated_at = ? WHERE item_id = ?"
    const values = [itemName, itemPrice, itemStock, updated_at, item_Id]

    return dbpool.query(sql, values)
}

//menghapus data item
export const deleteItem = (id) => {
    const sql = "DELETE FROM item where item_id = ?"
    const values = [id];
    return dbpool.query(sql, values); 
}

//mendapatkan item berdasarkan id
export const getItembyId = (id) => {
    const sql = "SELECT item_id, itemName, itemPrice, itemStock, updated_at FROM item WHERE item_id = ?"
    const values = [id];
    return dbpool.query(sql, values);
}

export const updateStockItembyId = (citem_id, card_code, item_id) => {
    const sql = "UPDATE item SET itemStock = itemStock - ( SELECT quantity FROM cart WHERE item_id = ? AND cart_code = ?) WHERE item_id = ?"
    const values = [citem_id, card_code, item_id];
    return dbpool.query(sql, values);
}

