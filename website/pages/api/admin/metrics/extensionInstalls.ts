import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "src/pages/api/auth/[...nextauth]";
import puppeteer from "puppeteer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET":
        await handleGet(req, res);
        break;
      default:
        res.status(404).end();
    }
  } catch (err) {
    res.status(400).end(err);
  }
};

export default handler;

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  const user = session?.user as any;
  if (!user.isAdmin) {
    throw "Must be signed in admin";
  }
  await connectToDb();
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navigate to the extension page
  await page.goto(
    "https://chrome.google.com/webstore/detail/uw-wave/bjpmedhmknbhefgbakephgbifiiceajm"
  );

  // Wait for the installation count element to appear
  await page.waitForSelector(".e-f-ih");

  // Get the installation count value
  const installationCount = await page.$eval(".e-f-ih", element => {
    const countText = element.textContent?.replace(/[^\d]/g, "");
    return countText ? parseInt(countText, 10) : 0;
  });

  await browser.close();
  res.send(installationCount);
};
