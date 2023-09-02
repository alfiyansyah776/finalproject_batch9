import dbpool from "../db/database.js";

//membuat 
export const addCart = (user_id, item_id, quantity, total_count, cart_code) => {
    const sql = "INSERT INTO cart (user_id, item_id, quantity, total_count, cart_code) VALUE (?,?,?,?,?)"
    const values = [user_id, item_id, quantity, total_count, cart_code]
    return dbpool.query(sql, values);

}

//mendapatkan data cart dari database
export const getCart = (limit) => {
    const sql = "SELECT user_id, item_id, quantity, total_count, cart_code FROM cart LIMIT ?"
    const values = [limit];
    return dbpool.query(sql, values)
}

//memperbarui data cart 
export const updateCart = (quantity, total_count, cart_Id) => {
    const sql = "UPDATE cart SET quantity = ?, total_count =?, WHERE cart_id = ?"
    const values = [quantity, total_count, cart_Id]

    return dbpool.query(sql, values)
}

//menghapus data item
export const deleteCart = (id) => {
    const sql = "DELETE FROM cart where cart_id = ?"
    const values = [id];
    return dbpool.query(sql, values); 
}

//menampilkan total harga yang dimiliki oleh user dengan ID tertentu
export const getTotalCountById = (id) =>  {
    const sql = "SELECT user_id, SUM(total_count) AS total_price FROM cart WHERE user_id = ? GROUP BY user_id"
    const values = [id];
    return dbpool.query(sql, values);
}



