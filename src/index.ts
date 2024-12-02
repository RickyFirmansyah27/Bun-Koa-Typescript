import Koa from 'koa';
import routes from './routes';
import { HttpLogger, Logger } from './helper';

const app = new Koa();
const port = 8000;

app.use(HttpLogger)
app.use(routes.routes()).use(routes.allowedMethods());

app.listen(port, async (): Promise<void> => {
    try {
        Logger.info(`[Koa-Service] Server is running on port ${port}`);
    } catch (error) {
        if (error instanceof Error) {
            Logger.error(
                `Error starting server: Message: ${error.message} | Stack: ${error.stack}`
            );
        } else {
            Logger.error(`Error starting server: ${String(error)}`);
        }
    }
  });
