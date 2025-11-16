import type { SignupType } from '@shared/types/user/SignupTypes'
import { SIGNUP_API } from '@shared/contants'
import api from "../../../lib/axios";
 

export const SignupApi = async (data: SignupType)=>{
    const response = await api.post(SIGNUP_API, data, {
        headers:{'Content-Type':'application/json'},
    })
    console.log('Signup response: ',response)
    return response
}