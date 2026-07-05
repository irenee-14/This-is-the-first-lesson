import { useState, useCallback } from "react";
import { apiFetch } from "@/lib/apiClient";

interface ApiState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useApi<T = unknown>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const request = useCallback(
    async (method: string, url: string, body?: unknown) => {
      setState({ data: null, error: null, loading: true });

      try {
        const data = await apiFetch<T>(url, {
          method,
          body: body !== undefined ? JSON.stringify(body) : undefined,
        });

        setState({ data, error: null, loading: false });
        return data;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "요청에 실패했습니다.";
        setState({ data: null, error: message, loading: false });
        throw err;
      }
    },
    []
  );

  const get = useCallback((url: string) => request("GET", url), [request]);
  const post = useCallback(
    (url: string, body?: unknown) => request("POST", url, body),
    [request]
  );
  const patch = useCallback(
    (url: string, body?: unknown) => request("PATCH", url, body),
    [request]
  );
  const del = useCallback((url: string) => request("DELETE", url), [request]);

  return { ...state, get, post, patch, del };
}
