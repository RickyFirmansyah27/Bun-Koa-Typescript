import Elysia from 'elysia';
import { HttpLogger, Logger, serverless } from './helper';
import { indexRoutes } from './routes';


const app = new Elysia();
const port = 8000;

// Middleware
app.use(HttpLogger);

// Registering routes
app.use(indexRoutes);

// Starting the server
const server = serverless(app);

server.listen(port, () => {
  Logger.info(`[Elysia-Service] Server is running on port ${port}`);
});
