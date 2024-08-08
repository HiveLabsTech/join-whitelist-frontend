import { z, ZodTypeAny } from 'zod';

export function createResponseDataSchema<T extends ZodTypeAny>(dataSchema: T) {
    return z.object({
        code: z.number(),
        message: dataSchema
    });
}

export const commonResponseDataSchema = createResponseDataSchema(z.string())


