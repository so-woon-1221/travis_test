import { useState } from "react";

const sql = require("mssql");

async function makePool() {
  try {
    const pool = await sql.connect({
      user: "bi_user",
      password: "ztop1234!",
      server: "211.252.252.66",
      port: 1433,
      database: "DM",
      options: {
        encrypt: false,
        enableArithAbort: true,
      },
    });
    return pool;
  } catch (e) {
    console.error(e);
    return e;
  }
}

export default makePool;
