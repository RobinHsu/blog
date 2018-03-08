import * as Koa from 'koa';
import * as send from 'koa-send';

export default function(path: string, root: string): any {
  path = path.replace(/^\/+/, '');

  return (ctx: Koa.Context, next: () => Promise<any>): Promise<any> => {
    // 只有dev环境允许node输出文件
    if (global.blogConfig.dev && (ctx.method === 'HEAD' || ctx.method === 'GET')) {
      let reqPathArrya: any[] = ctx.path.slice(1).split('/');

      if (path.length === 0 || path === reqPathArrya[0]) {
        if (path.length !== 0) {
          reqPathArrya = reqPathArrya.slice(1);
        }

        return send(ctx, reqPathArrya.join('/') || '/', {
          root
        }).then((done) => {
          if (!done) {
            return next();
          }
        });
      }
    }

    return next();
  };
}
