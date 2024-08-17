import request from "@/lib/request";
import { WhiteListResponseDataSchema, WhitelistDataType } from "@/lib/schemas/whitelist"
import { commonResponseDataSchema } from '@/lib/schemas'
import {type createJoinWhitelistDataType } from '@/types/whitelist' 

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

    static async downloadCsv(project_id: number): Promise<any> {
        const result = await request({
            config: {
                method: 'get',
                url: `/api/whitelist/download_csv/${project_id}`,
            },
            responseSchema: commonResponseDataSchema,
            identifier: 'WhitelistService.downloadCsv'
        })

        return result
    }
}

export default WhitelistService