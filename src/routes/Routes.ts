import express from 'express'
import { UserRoute } from '../app/modules/user/user.routes'
import { CowRoute } from '../app/modules/cow/cow.routes'
import { OrderRoute } from '../app/modules/orders/order.routes'
import { AuthRoute } from '../app/modules/auth/auth.route'
// import { UserRoute } from '../app/modules/users/user.routes'

const router = express.Router()

const all_routes = [
  { path: '/auth', router: AuthRoute },
  { path: '/users', router: UserRoute },
  { path: '/cows', router: CowRoute },
  { path: '/orders', router: OrderRoute },
]

all_routes.map(item => router.use(item.path, item.router))

export default router
