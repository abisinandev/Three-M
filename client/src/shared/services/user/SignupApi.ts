import axios from 'axios'
import type { SignupType } from '@shared/types/user/SignupTypes'
import { SIGNUP_API } from '@shared/contants'


export const SignupApi = async (data: SignupType)=>{
    const response = await axios.post(SIGNUP_API, data, {
        headers:{'Content-Type':'application/json'},
    })

    console.log('Signup response: ',response)
    return response
}