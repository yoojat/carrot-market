import { NextApiRequest, NextApiResponse } from 'next';

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = 'GET' | 'POST' | 'DELETE';

interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  methods,
  isPrivate = true,
  handler,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    // request의 method와 api의 method방식이 다르면 실행 종료
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }

    // isPrivate함수일 경우 로그인 되어있지 않으면 실행되지 않도록 함
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: 'Plz log in' });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
