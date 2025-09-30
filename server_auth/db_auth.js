import { query } from "../database/connect_db.js";

export async function ss_auth(user_id) {
  try {
    const result = await query(
      `SELECT role FROM users WHERE USERID = :id`,
      { id: user_id }
    );
    return result.rows[0]?.ROLE || null;
  } catch (err) {
    console.error("Error in ss_auth: ",err);
    return null;
  }
}
