import * as Koa from 'koa';

export default async function(ctx: Koa.Context, next: () => Promise<any>): Promise<any> {
  const start: number = Date.now();
  await next();
  const ms: number = Date.now() - start;
  global.logger.info(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`);
}
