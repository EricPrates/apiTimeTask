import { User } from "../Models/User";

export const UserRepository = {
    async findById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    },
}