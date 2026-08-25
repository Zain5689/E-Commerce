const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('accessToken')
    : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `HTTP error ${response.status}`);
  }

  return data;
}

export const api = {
  get: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
};

// ─── API functions ──────────────────────────────────────────────────────────

export const productsApi = {
  getAll: (params?: Record<string, string | number | undefined>) => {
    const qs = params
      ? '?' + Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== '')
          .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
          .join('&')
      : '';
    return api.get<{ success: boolean; data: { items: any[]; meta: any } }>(`/products${qs}`);
  },

  getFlashDeals: (limit = 6) =>
    api.get<{ success: boolean; data: any[] }>(`/products/flash-deals?limit=${limit}`),

  getFeatured: (limit = 8) =>
    api.get<{ success: boolean; data: any[] }>(`/products/featured?limit=${limit}`),

  getById: (id: string) =>
    api.get<{ success: boolean; data: any }>(`/products/${id}`),

  autocomplete: (q: string) =>
    api.get<{ success: boolean; data: any[] }>(`/products/autocomplete?q=${encodeURIComponent(q)}`),

  addReview: (id: string, review: object) =>
    api.post<{ success: boolean; data: any }>(`/products/${id}/reviews`, review),
};

export const categoriesApi = {
  getAll: () =>
    api.get<{ success: boolean; data: any[] }>('/categories'),
};

export const brandsApi = {
  getAll: () =>
    api.get<{ success: boolean; data: any[] }>('/brands'),
};

export const authApi = {
  register: (data: { email: string; password: string; name: string; phone?: string }) =>
    api.post<{ success: boolean; data: any }>('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post<{ success: boolean; data: any }>('/auth/login', data),

  me: () =>
    api.get<{ success: boolean; data: any }>('/auth/me'),

  updateProfile: (data: { name?: string; phone?: string }) =>
    api.put<{ success: boolean; data: any }>('/auth/profile', data),

  logout: () =>
    api.post<{ success: boolean }>('/auth/logout'),
};

export const ordersApi = {
  create: (data: object) =>
    api.post<{ success: boolean; data: any }>('/orders', data),

  getMyOrders: () =>
    api.get<{ success: boolean; data: any[] }>('/orders/my-orders'),

  getMyStats: () =>
    api.get<{ success: boolean; data: any }>('/orders/my-stats'),

  getById: (id: string) =>
    api.get<{ success: boolean; data: any }>(`/orders/${id}`),
};

export const addressesApi = {
  getAll: () =>
    api.get<{ success: boolean; data: any[] }>('/addresses'),

  create: (data: object) =>
    api.post<{ success: boolean; data: any }>('/addresses', data),

  update: (id: string, data: object) =>
    api.put<{ success: boolean; data: any }>(`/addresses/${id}`, data),

  delete: (id: string) =>
    api.delete<{ success: boolean }>(`/addresses/${id}`),

  setDefault: (id: string) =>
    api.patch<{ success: boolean; data: any }>(`/addresses/${id}/default`),
};

export const couponsApi = {
  validate: (code: string, subtotal?: number) =>
    api.post<{ success: boolean; data: any }>('/coupons/validate', { code, subtotal }),
};

export const shippingApi = {
  getGovernorates: () =>
    api.get<{ success: boolean; data: any }>('/shipping/governorates'),
};

export const homeApi = {
  getHomeData: () =>
    api.get<{ success: boolean; data: any }>('/home'),
};
