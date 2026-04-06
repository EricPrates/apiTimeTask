import { User } from "../Models/User";
import { IUser, IUserRepository } from "../types/types";

export const UserRepository: IUserRepository = {
    async findById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    },
    async findUserByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    },
    async createUser(data: IUser): Promise<void> {
        await User.create(data);
    }
}