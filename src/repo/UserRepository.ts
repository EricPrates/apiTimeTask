import { User } from '../Models/User';
import { IUserRepository } from "../types/function.types";
import { CreateUserDTO } from "../types/user.types";


export const UserRepository: IUserRepository = {
    async findById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    },
    async findUserByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    },
    async createUser(data: CreateUserDTO): Promise<User> {
        const user = await User.create(data);
        return user;
    }
}
  