
import { User } from "../dto/user.dto";
import IUserRepository from "../interface/IUserRepository";


export class InMemoryUserRepository implements IUserRepository {
    private users: User[] = [];
    private nextId: number = 1;


    public async store(user: User): Promise<User> {
        user.id = this.nextId++
        this.users.push(user)

        return user
    }

    public async show(id: number): Promise<User | null> {
        return this.users.find((user: User) => user.id == id) || null
    }

    public async update(id: number, user: User): Promise<User | null> {
        const index = this.users.findIndex((user: User) => user.id == id)
        if (index == -1) {
            return null
        }
        this.users[index] = user;
        return user;
    }

    public async delete(id: any): Promise<boolean> {
        const index = this.users.findIndex((user: User) => user.id === id)

        if (index === -1) {
            return false
        }
        this.users.splice(index, 1)
        return true;
    }

    public async list(): Promise<User[]> {
        return this.users
    }
}
