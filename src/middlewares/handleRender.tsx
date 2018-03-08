import * as Koa from 'koa';
import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import * as jsConfig from '../../runtime/webpack-assets.json';
import App from '../views/App';

export default async function(ctx: Koa.Context, next: () => Promise<any>): Promise<any> {
  await next();

  const html: string = renderToString(
    <StaticRouter location={ctx.url} context={{}}>
      <App/>
    </StaticRouter>
  );

  ctx.body = renderFullPage(html);
}

function renderFullPage(html: string): string {
  global.logger.debug(jsConfig);

  return `
<!doctype html>
<html>
<head>
  <title>Robin's blog</title>
  <link rel="stylesheet" type="text/css" href="${(jsConfig as any).main.css}"/>
</head>
<body>
  <div id="root" class="container">${html}</div>
  <script src="${(jsConfig as any)['vendors~main'].js}"></script>
  <script src="${(jsConfig as any).main.js}"></script>
</body>
</html>
  `;
}
