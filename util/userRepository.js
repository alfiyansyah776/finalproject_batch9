import dbpool from "../db/database.js";

//membuat user dan memasukkan ke database
export const createUser = (username, email, password, birthdate, address, card_number) => {
    let created_at = new Date;
    const sql = "INSERT INTO user (username, email, password, birthdate, address, card_number, created_at) VALUE (?,?,?,?,?,?,?)"
    const values = [username, email, password, birthdate, address, card_number, created_at ]

    return dbpool.query(sql, values);

}

//mendapatkan data user dari database
export const getUser = (limit) => {
    const sql = "SELECT user_id, username, email, password, birthdate, address, card_number, created_at FROM user LIMIT ?"
    const values = [limit];

    return dbpool.query(sql, values)
}

//memperbarui data user 
export const updateUser = (username, email, birthdate, address, card_number, user_id) => {
    let updated_at = new Date;
    const sql = "UPDATE user SET username = ?, email = ?, birthdate = ?, address = ?, card_number, updated_at = ? WHERE user_id = ?"
    const values = [username, email, birthdate, address, card_number, updated_at, user_id]

    return dbpool.query(sql, values)
}

//menghapus data user
export const deleteUser = (id) => {
    const sql = "DELETE FROM user where user_id = ?"
    const values = [id];
    return dbpool.query(sql, values); 
}

export const getUserbyEmail = (email) => {
    const sql = "SELECT user_id, username, email, password, birthdate, address, card_number, created_at FROM user WHERE email = ?"
    const values = email;
    return dbpool.query(sql, values);
}

