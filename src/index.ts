import dotenv from 'dotenv';
import Elysia from 'elysia';
import boom from 'express-boom'; // Not used in Elysia, consider using Elysia's built-in error handling
import { HttpLogger, Logger } from './helper';
import { UserController } from './controller/user-controller';

dotenv.config();

const app = new Elysia();
const port = 8000;

// Middleware
// app.use(HttpLogger);
// app.use(app.json()); // Elysia has built-in JSON parsing middleware
// app.use(app.urlencoded({ extended: true })); // URL-encoded body parsing

// Registering routes
app.get('/api/v1/user', UserController.getUser); 
app.post('/api/v1/user', UserController.createUser);

// Starting the server
app.listen(port, async () => {
    try {
        Logger.info(`[Bun-Service] Server is running on port ${port}`);
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
