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

export class UserController {
    static async getUser(ctx: Context) {
        const contextLogger = 'UserController';
        try {
            Logger.info(`${contextLogger} | getUser`, users);
            return BaseResponse(ctx, 'Successfully feching users', 'success', users);
        } catch (error) {
            return BaseResponse(ctx, 'error', 'internalServerError', null);
        }
    }

    static async createUser(ctx: Context) {
        const contextLogger = 'UserController';
        try {
            const payload: User = ctx.body as User;
            payload.id = users.length + 1;
            users.push(payload);
            Logger.info(`${contextLogger} | createUser`, users);
            return BaseResponse(ctx, 'User created successfully', 'created', users);
        } catch (error) {
            return BaseResponse(ctx, 'error', 'internalServerError', null);
        }
    }
}

export default UserController;
