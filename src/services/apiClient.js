const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function request(path, options = {}) {
  const base = API_BASE_URL.replace(/\/$/, "");
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "");
    const err = new Error(`Request failed: ${response.status} ${response.statusText}`);
    err.status = response.status;
    err.body = errorBody;
    throw err;
  }

  if (response.status === 204) return null;
  return response.json();
}

export const apiClient = {
  get: (path, params = {}) => {
    const search = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
    );
    const query = search.toString();
    const url = query ? `${path}?${query}` : path;
    return request(url, { method: "GET" });
  },
  post: (path, body = {}) => request(path, { method: "POST", body: JSON.stringify(body) }),
};

export { API_BASE_URL };
