import request from "@/lib/request";
import { usersSchema, UsersType, UserListResponseType, userlistResponseSchema} from '@/lib/schemas/user'

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

    static async getUserListByIds(ids:number) : Promise<UserListResponseType>{
        const result = await request({
            config: {
                method: 'get',
                url: `/api/public/getUserList/${ids}`,
            },
            responseSchema: userlistResponseSchema,
            identifier: 'UserService.getUserListByIds'
        })

        return result
    }
}

export default UserService