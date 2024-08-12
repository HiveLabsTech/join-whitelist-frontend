import { z } from 'zod';
import { leadSchema } from './channel';
import { createResponseDataSchema } from '.'

const userlistSchema = z.array(leadSchema)

export const usersSchema = z.object({
    result: z.object({
        users: userlistSchema,
        next: z.object({
            cursor: z.string()
        })
    })
})

export const userlistResponseSchema = createResponseDataSchema(userlistSchema)

export type UserListResponseType = z.infer<typeof userlistResponseSchema>

export type UserListType = z.infer<typeof userlistSchema>

export type UsersType = z.infer<typeof usersSchema>