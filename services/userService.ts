import request from "@/lib/request";
import { usersSchema, UsersType } from '@/lib/schemas/user'

class UserService {
    static async getUsersByName({ q }: { q: string }): Promise<UsersType> {
        const result = await request({
            config: {
                method: 'get',
                url: '/user/search',
                params: {
                    q,
                    limit: 10,
                }
            },
            thirdUrl: "https://api.neynar.com/v2/farcaster",
            responseSchema: usersSchema,
            identifier: 'UserService.getUsersByName'
        })

        return result
    }
}

export default UserService