import { User } from "../dto/user.dto";

export default interface IUserRepository {
    store(user: User): Promise<User>
    show(id: number): Promise<User | null>
    update(id: number, user: User): Promise<User | null>
    delete(id: number): Promise<boolean>
    list(): Promise<User[]>;

}