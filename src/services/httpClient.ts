import { apiConfig } from "@/src/constants/apiConfig";

type RequestOptions = RequestInit & {
  notFoundReturnsNull?: boolean;
};

export async function requestJson<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { notFoundReturnsNull, ...init } = options;
  const response = await fetch(`${apiConfig.apiUrl}${path}`, init);

  if (response.status === 404 && notFoundReturnsNull) {
    return null as T;
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Error HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}
