export function getEnv(name: string, defaultValue?: string): string | undefined {
  const value = process.env[name];
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  return value;
}

export function getRequiredEnv(name: string): string {
  const value = getEnv(name);
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
