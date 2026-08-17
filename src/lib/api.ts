export function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    // Server-side in Next.js Server Components
    if (process.env.INTERNAL_API_URL) {
      return process.env.INTERNAL_API_URL;
    }
    if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.startsWith('http')) {
      return process.env.NEXT_PUBLIC_API_URL;
    }
    return 'https://api.tauheednews.com/api';
  }
  // Client-side in browser
  return process.env.NEXT_PUBLIC_API_URL || '/api-backend';
}


export async function fetchApi(endpoint: string, options?: RequestInit) {
  try {
    const baseUrl = getApiBaseUrl();
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${baseUrl}${cleanEndpoint}`;
    const res = await fetch(url, {
      cache: 'no-store',
      ...options,
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return null;
  }
}


export async function getHeadlineArticle(lang?: string) {
  const query = lang && lang !== 'id' ? `?lang=${lang}` : '';
  return await fetchApi(`/articles/headline${query}`);
}

export async function getFixedAdviceArticle(lang?: string) {
  const query = lang && lang !== 'id' ? `?lang=${lang}` : '';
  return await fetchApi(`/articles/fixed-advice${query}`);
}

export async function getArticles(params?: { category?: string; status?: string; limit?: number; lang?: string }) {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.status) query.append('status', params.status);
  if (params?.limit) query.append('limit', params.limit.toString());
  if (params?.lang && params.lang !== 'id') query.append('lang', params.lang);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return (await fetchApi(`/articles${queryString}`)) || [];
}

export async function getArticleBySlug(slug: string, lang?: string) {
  const query = lang && lang !== 'id' ? `?lang=${lang}` : '';
  return await fetchApi(`/articles/${slug}${query}`);
}

export async function getPopularArticles(lang?: string) {
  const query = lang && lang !== 'id' ? `?lang=${lang}` : '';
  return (await fetchApi(`/articles/popular${query}`)) || [];
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

/**
 * Trigger translation for all untranslated articles
 */
export async function translateAllArticles() {
  return await fetchApi('/translate/all', {
    method: 'POST',
  });
}

/**
 * Get translation status
 */
export async function getTranslationStatus() {
  return await fetchApi('/translate/status');
}
