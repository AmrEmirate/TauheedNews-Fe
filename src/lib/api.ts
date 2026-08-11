const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchApi(endpoint: string, options?: RequestInit) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: 'no-store',
      ...options,
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return null;
  }
}

export async function getHeadlineArticle() {
  return await fetchApi('/articles/headline');
}

export async function getFixedAdviceArticle() {
  return await fetchApi('/articles/fixed-advice');
}

export async function getArticles(params?: { category?: string; status?: string; limit?: number }) {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.status) query.append('status', params.status);
  if (params?.limit) query.append('limit', params.limit.toString());

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return (await fetchApi(`/articles${queryString}`)) || [];
}

export async function getArticleBySlug(slug: string) {
  return await fetchApi(`/articles/${slug}`);
}

export async function getPopularArticles() {
  return (await fetchApi('/articles/popular')) || [];
}

export async function getCategories() {
  return (await fetchApi('/categories')) || [];
}

export async function getCategoryWithArticles(slug: string) {
  return await fetchApi(`/categories/${slug}`);
}

export async function searchArticles(q: string) {
  if (!q.trim()) return [];
  return (await fetchApi(`/search?q=${encodeURIComponent(q)}`)) || [];
}

export async function getKajianList() {
  return (await fetchApi('/kajian')) || [];
}

export async function getMediaList() {
  return (await fetchApi('/media')) || [];
}

export async function createArticle(data: any) {
  return await fetchApi('/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
