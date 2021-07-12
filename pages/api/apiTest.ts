import { NextApiRequest, NextApiResponse } from "next";
import makePool from "../../lib/api/makePool";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      // @ts-ignore
      const pool = await makePool();
      const result = await pool
        .request()
        .query("select * from test.BI_TEST_1 where category='애완동물먹이'");
      res.send(result.recordset);
    } finally {
      console.log("finish");
    }
  }
};
