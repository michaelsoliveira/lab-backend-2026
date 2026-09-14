import { Request, Response } from 'express';
import { UserService } from '@/services/user.service';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const { page, limit, q } = req.query as {
                page?: number;
                limit?: number;
                q?: string;
            }
            const users = await this.userService.getAllUsers({
                page: Number(page) || 1,
                limit: Number(limit) || 10,
                q: q || '',
            });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error });
        }
    }

    public getUserById = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.params.id;
            const user = await this.userService.getUserById(userId);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error });
        }
    }

    public createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userData = req.body;
            const newUser = await this.userService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    }

    public updateUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.params.id;
            const userData = req.body;
            const updatedUser = await this.userService.updateUser(userId, userData);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    }

    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = req.params.id;
            const deletedUser = await this.userService.deleteUser(userId);
            if (deletedUser) {
                res.status(200).json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }
}