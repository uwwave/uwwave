import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "src/pages/api/auth/[...nextauth]";
import chromium from "chrome-aws-lambda";

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
    console.log(err);
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

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  // Navigate to the extension page
  await page.goto(
    "https://chrome.google.com/webstore/detail/uw-wave/bjpmedhmknbhefgbakephgbifiiceajm"
  );

  // Wait for the installation count element to appear
  await page.waitForSelector(".e-f-ih");

  // Get the installation count value
  const installationCount = await page.$eval(".e-f-ih", (element: any) => {
    const countText = element.textContent?.replace(/[^\d]/g, "");
    return countText ? parseInt(countText, 10) : 0;
  });

  await browser.close();
  res.send(installationCount);
};
