import request from "@/lib/request";
import { WhiteListResponseDataSchema, WhitelistDataType } from "@/lib/schemas/whitelist"
import { commonResponseDataSchema } from '@/lib/schemas'
import { type createJoinWhitelistDataType } from '@/types/whitelist'


let BaseUrl: string | undefined = ""
if (process.env.NODE_ENV === "development") {
    BaseUrl = process.env.NEXT_PUBLIC_DEV_BASEURL ? process.env.NEXT_PUBLIC_DEV_BASEURL : ""
} else {
    BaseUrl = process.env.NEXT_PUBLIC_PRO_BASEURL ? process.env.NEXT_PUBLIC_PRO_BASEURL : ""
}


class WhitelistService {
    static async getAllWhitelist(): Promise<WhitelistDataType> {
        const whitelist = await request({
            config: {
                method: 'get',
                url: '/api/whitelist/getAllWhitelist',

            },
            responseSchema: WhiteListResponseDataSchema,
            identifier: 'WhitelistService.getAllWhitelist'
        })

        return whitelist
    }

    static async createJoinWhitelist(data: createJoinWhitelistDataType): Promise<{
        code: number,
        message: string
    }> {
        const result = await request({
            config: {
                method: 'post',
                url: '/api/whitelist/create',
                data
            },
            responseSchema: commonResponseDataSchema,
            identifier: 'WhitelistService.getAllWhitelist'
        })

        return result
    }
}

export default WhitelistService