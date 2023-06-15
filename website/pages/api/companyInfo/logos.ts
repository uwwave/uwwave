import type { NextApiRequest, NextApiResponse } from "next";
import { getCompanyLogos } from "src/lib/server/companies/logos";
// eslint-disable-next-line @typescript-eslint/no-var-requires

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        res.send(await getCompanyLogos());
        break;
      default:
        res.status(404).end();
    }
  } catch (err) {
    res.status(403).end(String(err));
  }
};

export default handler;
