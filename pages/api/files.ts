import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // 실제 코드 에서는 아래와 같이 사용
  // const response = await (
  //   await fetch(
  //     `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v1/direct_upload`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${process.env.CF_TOKEN}`,
  //       },
  //     }
  //   )
  // ).json();

  //temp code
  const response = {
    result: {
      id: '2cdc28f0-017a-49c4-9ed7-87056c83901',
      uploadURL:
        'https://upload.imagedelivery.net/2cdc28f0-017a-49c4-9ed7-87056c83901',
    },
    result_info: null,
    success: true,
    errors: [],
    messages: [],
  };

  console.log(response);
  res.json({
    ok: true,
    ...response.result,
  });
}

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
  })
);
