import { z } from 'zod';
import { createResponseDataSchema } from '.';

const whiteItemSchema = z.object({
    channel_id: z.string().optional(),
    channel_name: z.string().optional(),
    create_time: z.number(),
    creator_display_name: z.string(),
    creator_fid: z.number(),
    creator_user_name: z.string(),
    end_time: z.number(),
    follow_display_name: z.string().optional(),
    follow_fid: z.number(),
    follow_user_name: z.string().optional(),
    hash: z.string().optional(),
    id: z.number(),
    img_url: z.string().optional(),
    link:  z.string().optional(),
    project_name: z.string(),
    status: z.number(),
    address: z.string(),
    isOwn: z.number().optional()
})

const whiteListSchema = z.array(whiteItemSchema)

export type WhiteItemDataType = z.infer<typeof whiteItemSchema>

export const WhiteListResponseDataSchema = createResponseDataSchema(whiteListSchema)

export type WhitelistDataType = z.infer<typeof WhiteListResponseDataSchema>