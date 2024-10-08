import { Context } from 'elysia';
import { BaseResponse, Logger } from '../helper';

// Define the User interface
interface User {
    id: number;
    name: string;
    email: string;
}

// Sample in-memory users array to store users
const users: User[] = [];

// Helper function for creating a response
const sendResponse = (ctx: Context, message: string, status: string, data: any) => {
    ctx.response = 200; // Set the HTTP status code
    ctx.body = {
        message,
        status,
        data,
    };
};

// Controller Class
export class UserController {
    static async getUser(ctx: Context) {
        const contextLogger = 'UserController';
        try {
            Logger.info(`${contextLogger} | getUser`, users);
            return ctx.response = users;
        } catch (error) {
            ctx.response = 500; // Internal Server Error
            ctx.body = { error: 'Internal Server Error' };
        }
    }

    static async createUser(ctx: Context) {
        const contextLogger = 'UserController';
        try {
            const payload: User = ctx.body as User; // Cast to User interface
            payload.id = users.length + 1;
            users.push(payload);
            Logger.info(`${contextLogger} | createUser`, users);
            return ctx.response = users;
        } catch (error) {
            ctx.response = 500; // Internal Server Error
            ctx.body = { error: 'Internal Server Error' };
        }
    }
}

// Export an instance of UserController to use in the Elysia server
export default UserController;
