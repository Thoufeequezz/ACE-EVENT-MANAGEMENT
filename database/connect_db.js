import oracledb from 'oracledb';
import fs from "fs";

let pool;

export async function initPool() {
    pool = await oracledb.createPool({
        "user":process.env.DB_USER,
        "password":process.env.DB_PASSWORD,
        "connectionString": process.env.DB_CONNECT,
        "poolMin": 1,
        "poolMax": 5,
        "poolIncrement": 1
    });
}

export async function query(sql_path_or_sql, binds = [], options = {}) {
  const conn = await pool.getConnection();
  
  let sql;
  try{
    sql = fs.readFileSync(sql_path_or_sql, "utf-8");
  }
  catch (e){
    sql = sql_path_or_sql;
  }
  try {
    const result = await conn.execute(sql, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      ...options
    });
    return result;
  } finally {
    await conn.close(); 
  }
}

