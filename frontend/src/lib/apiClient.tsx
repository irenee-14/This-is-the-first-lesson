// lib/apiClient.ts
import { useUserStore } from "@/stores/useUserStore";

const BASE_URL = "/api/v1";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const { userId } = useUserStore.getState();

  const res = await fetch(BASE_URL + path, {
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId ?? "",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(`API Error ${res.status}: ${message}`);
  }

  return res.json() as Promise<T>;
}
