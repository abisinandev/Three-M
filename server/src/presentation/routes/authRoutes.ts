import { Router } from 'express'
import { SignupController } from '../controllers/auth/SignupController'
import { UserRepository } from '../../infrastructure/repository/UserRepository'
import { UserSignupUseCase } from '../../application/useCases/auth/userSignupUseCase'

const router = Router()

const userRepository = new UserRepository()
const userSignupUseCase = new UserSignupUseCase(userRepository)
const authController = new SignupController(userSignupUseCase)

router.post('/signup',authController.signup.bind(authController))

export default router