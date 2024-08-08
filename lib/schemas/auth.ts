import { z } from 'zod';
import { createResponseDataSchema } from '.';

const tokenDataSchema = z.object({
    message: z.string()
});

export const tokenResponseDataSchema = createResponseDataSchema(tokenDataSchema);

export type tokenResponseData = z.infer<typeof tokenResponseDataSchema>;