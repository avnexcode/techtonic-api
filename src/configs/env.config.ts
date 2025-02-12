import { envSchema } from './env.schema';
import { fromZodError } from 'zod-validation-error';

export const validate = (config: Record<string, unknown>) => {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    const validationError = fromZodError(result.error);
    throw new Error(validationError.message);
  }

  return result.data;
};
