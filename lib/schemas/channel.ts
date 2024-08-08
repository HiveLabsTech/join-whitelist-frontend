import { z } from 'zod';

export const leadSchema = z.object({
    object: z.string(),
    fid: z.number(),
    custody_address: z.string(),
    username: z.string(),
    display_name: z.string(),
    pfp_url: z.string(),
    profile: z.object({
        bio: z.object({
            text: z.string()
        })
    }),
    follower_count: z.number(),
    following_count: z.number(),
    verifications: z.array(z.string()),
    verified_addresses: z.object({
        eth_addresses: z.array(z.string()),
        sol_addresses: z.array(z.string()),
    }),
    active_status: z.string(),
    power_badge: z.boolean()
})

const channelItemSchema = z.object({
    id: z.string(),
    url: z.string(),
    name: z.string(),
    description: z.string(),
    follower_count: z.number(),
    object: z.string(),
    image_url: z.string(),
    created_at: z.number(),
    parent_url: z.string(),
    lead: leadSchema,
    host: z.any(),
    moderator: z.any()
})

const channelListSchema = z.array(channelItemSchema)

export const channelsSchema = z.object({
    next: z.object({
        cursor: z.string()
    }),
    channels: channelListSchema
})

export type ChannelListType = z.infer<typeof channelListSchema>

export type ChannelsType = z.infer<typeof channelsSchema>
 
