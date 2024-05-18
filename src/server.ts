
import express, { Response, Request } from 'express'
import { InMemoryUserRepository } from './repository/InMemoryUserRepository'
import { UserService } from './service/UserService'
const app = express(),
    port = 3000,
    router = express.Router()

app.use(express.json())
app.use('/api/v1', router)


const userRepository = new InMemoryUserRepository()
const userService = new UserService(userRepository)


router.post('/users', async (req: Request, res: Response) => {
    const { name, email }: { name: string, email: string } = req.body


    const user = await userService.createUser(name, email)
    res.status(201).json({
        object: user,
        message: 'Created with sucess'
    })
})

router.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await userService.getUser(parseInt(id, 10))

    if (user) {
        res.status(200).json({
            object: user,
            message: null
        })
    } else {
        res.status(404).json({
            object: null,
            message: 'Item not found'
        })
    }
    return user;
})

router.put('/users/:id', async (req: Request, res: Response) => {
    const { name, email } = req.body,
        { id } = req.params;

    const user = await userService.updateUser(parseInt(id, 10), name, email)
    if (user) {
        res.status(200).json({
            object: user,
            message: null
        })
    } else {
        res.status(404).json({
            object: null,
            message: 'Item not found'
        })
    }
})

router.delete('/users/:id', async (req: Request, res: Response) => {
    const success = await userService.deleteUser(parseInt(req.params.id, 10))

    if (success) {
        res.status(204).json({
            message: 'Item removed',
            object: null
        })
    } else {
        res.status(404).json({
            object: null,
            message: 'Item not found'
        })
    }
})

router.get('/users', async (req: Request, res: Response) => {
    const users = await userService.listUsers()
    res.status(200).json({
        object: users,
        message: null
    })
})


app.get('/', async (req: Request, res: Response) => {
    res.status(200).json({ message: 'hello world' })
})


app.listen(port, () => console.log(`http://localhost:${port}`))