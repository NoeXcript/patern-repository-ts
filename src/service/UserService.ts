import { User } from "../dto/user.dto";
import IUserRepository from "../interface/IUserRepository";

export class UserService {

    constructor(private userRepository: IUserRepository) { }
    async createUser(name: string, email: string): Promise<User> {
        const user: User = { id: 0, name, email }
        return await this.userRepository.store(user)
    }

    async getUser(id: any): Promise<User | null> {
        return await this.userRepository.show(id)
    }

    async updateUser(id: number, name: string, email: string): Promise<User | null> {
        const user: User = { id: 0, name, email }

        return await this.userRepository.update(id, user)
    }

    async deleteUser(id: number): Promise<boolean> {
        return await this.userRepository.delete(id)
    }

    async  listUsers():Promise<User[]>{
        return await this.userRepository.list()
    }
}