import * as z from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    APP_URL: z.string().optional().default('http://localhost:3000'),
    BACKEND_API_URL: z.string().optional().default(''),
  });

  const envVars = {
    API_URL: process.env.NEXT_PUBLIC_API_URL || '',
    APP_URL: process.env.NEXT_PUBLIC_URL || '',
    BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL || '',
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n')}
  `,
    );
  }

  return parsedEnv.data ?? {};
};

export const env = createEnv();
