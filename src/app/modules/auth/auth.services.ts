import { IUser } from '../user/user.interface'
import { User } from '../user/user.model'

// Create new user
const user_signup = async (user_data: IUser): Promise<IUser | null> => {
  if (!user_data?.income) {
    user_data.income = 0
  }
  if (!user_data?.budget) {
    user_data.budget = 0
  }

  const created_user = await User.create(user_data)
  return created_user
}

export const AuthServices = {
  user_signup,
}
