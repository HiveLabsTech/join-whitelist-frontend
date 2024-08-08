import request from "@/lib/request";
import { ChannelsType, channelsSchema } from '@/lib/schemas/channel'

class ChannelService {
    static async getChannelsByName({ q }: { q: string }): Promise<ChannelsType> {
        const result = await request({
            config: {
                method: 'get',
                url: '/channel/search',
                params: {
                    q
                }
            },
            thirdUrl: "https://api.neynar.com/v2/farcaster",
            responseSchema: channelsSchema,
            identifier: 'ChannelService.getChannelsByName'
        })

        return result
    }
}

export default ChannelService