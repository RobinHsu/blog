import * as Koa from 'koa';
import * as path from 'path';
import './common/bootstrap/global';
import favicon from './middlewares/favicon';
import handleRender from './middlewares/handleRender';
import log from './middlewares/log';
import serve from './middlewares/static';

const app = new Koa();

app.use(log);
app.use(favicon(path.join(global.blogConfig.ROOT_PATH, './www/favicon.ico')));
app.use(serve('static', path.join(global.blogConfig.ROOT_PATH, './www/static')));

app.use(handleRender);

export default app;
