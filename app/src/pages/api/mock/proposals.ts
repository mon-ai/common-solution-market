// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mockjs from "mockjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { IProposals } from "../../../common/types/proposals";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IProposals>
) {
  setTimeout(() => {
    res.status(200).json(mockData);
  }, 1000);
}

const mockData = mockjs.mock({
  "proposals|3-15": [
    {
      "id|+1": 1,
      title: "@ctitle",
      description: "@cparagraph",
      "funding|0-500.2": 1,
      "funders|1-100": 1,
      issues: {
        "mergers|0-5": [
          {
            "id|+1": 1,
            title: "@ctitle",
            description: "@cparagraph",
          },
        ],
        "changes|0-5": [
          {
            "id|+1": 1,
            title: "@ctitle",
            description: "@cparagraph",
          },
        ],
      },
      "simulations|0-5": [
        {
          "id|+1": 1,
          title: "@ctitle",
          description: "@cparagraph",
        },
      ],
    },
  ],
});
