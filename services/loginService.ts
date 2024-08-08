import request from "@/lib/request";
import { tokenResponseData, tokenResponseDataSchema } from '@/lib/schemas/auth'

export type loginDataType = {
    address: string | undefined,
    fid: number | string | undefined,
    signature: string | undefined,
    message: string | undefined,
    nonce: string | undefined
}

class LoginService {
    static async login(loginData: loginDataType): Promise<tokenResponseData> {

        const token = await request({
            config: {
                method: 'post',
                url: 'api/auth/login',
                data: loginData
            },
            responseSchema: tokenResponseDataSchema,
            identifier: 'LoginService.login'
        })
    
        return token
    }
}

export default LoginService