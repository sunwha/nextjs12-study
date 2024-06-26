import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import withApiSession from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await client.user.findUnique({
    where: { id: req.session.user.id },
    select: {
      name: true,
      email: true,
    },
  });
  res.status(200).json({ ok: true, profile });
}

export default withApiSession(
  withHandler({
    method: "GET",
    handler,
  })
);
