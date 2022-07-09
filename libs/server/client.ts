import { PrismaClient } from '@prisma/client';

declare global {
  var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient({ log: ['query'] });
// db 쿼리를 확인할 수 있음(쿼리 크기 확인)

if (process.env.NODE_ENV === 'development') global.client = client;

export default client;
