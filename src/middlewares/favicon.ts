import * as fs from 'fs';
import * as Koa from 'koa';

export default (path: string): any => {
  const icon = fs.existsSync(path) ? fs.readFileSync(path) : false;
  const maxAge: number = 864000000;
  const cacheControl = `public, max-age=${maxAge / 1000}`;

  return (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {
    if ('/favicon.ico' !== ctx.path) {
      return next();
    }

    if ('GET' !== ctx.method && 'HEAD' !== ctx.method) {
      ctx.status = 'OPTIONS' === ctx.method ? 200 : 405;
      ctx.set('Allow', 'GET, HEAD, OPTIONS');
    } else {
      if (icon) {
        ctx.set('Cache-Control', cacheControl);
        ctx.type = 'image/x-icon';
        ctx.body = icon;
      }
    }
  };
};
