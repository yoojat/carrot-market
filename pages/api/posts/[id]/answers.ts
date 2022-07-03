import { withApiSession } from '@libs/server/withSession';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;

  const newAnswer = await client?.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: +id.toString(),
        },
      },
      answer,
    },
  });
  res.json({
    ok: true,
    answer: newAnswer,
  });
}

export default withApiSession(
  withHandler({
    methods: ['POST'],
    handler,
  })
);
