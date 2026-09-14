import { z } from 'zod';

const UserSchema = z.object({
    id: z.string().optional(),
    email: z.string().email(),
    name: z.string()
        .min(2, "O nome deve conter no mínimo 2 caracteres")
        .max(100, "O nome deve conter no máximo 100 caracteres"),
    age: z.number().min(0, "A idade deve ser um número positivo").optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});

export type User = z.infer<typeof UserSchema>;

export class UserService {
    public async getAllUsers(params: { 
        page?: number; 
        limit?: number; 
        where?: Partial<User>;
        orderBy?: { [key: string]: 'asc' | 'desc' };
    }): Promise<any> {
        const { page = 1, limit = 10 } = params;
        const skip = (page - 1) * limit;
        const where = params.where ? {
            OR: Object.entries(params.where).map(([key, value]) => ({
                [key]: {
                    contains: value,
                    mode: Prisma.QueryMode.insensitive,
                },
            })),    
        } : {};

        const users = await prisma.user.findMany({
            where,
            skip,
            take: limit,
        });
        return users;   
    }
}
