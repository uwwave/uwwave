import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "src/pages/api/auth/[...nextauth]";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

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
  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY,
    },
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA4_PROPERTY_ID}`,
    dimensions: [{ name: "fullPageUrl" }],
    metrics: [{ name: "screenPageViewsPerSession" }],
    dateRanges: [{ startDate: "365daysAgo", endDate: "yesterday" }],
    dimensionFilter: {
      filter: {
        fieldName: "fullPageUrl",
        stringFilter: { matchType: "ENDS_WITH", value: "setup?step=2" },
      },
    },
    metricAggregations: [1],
  });
  res.send(response?.totals?.[0].metricValues?.[0].value ?? 0);
};
