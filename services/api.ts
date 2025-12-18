// src/services/api.ts

const API_URL = import.meta.env.VITE_STRAPI_API_URL as string;

if (!API_URL) {
  throw new Error('VITE_STRAPI_API_URL is not defined');
}
/**
 * Convert Strapi media relative URL to absolute URL
 */
export const getMediaURL = (url?: string | null): string => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};

interface StrapiResponse<T> {
  data: T[];
}

/**
 * Core Strapi service
 * NOTE: no Node APIs, no process.env, no top-level side effects
 */
export const strapiService = {
  async getArticles() {
  const res = await fetch(
    `${API_URL}/api/articles?populate=*&sort=publishedAt:desc`
  );

  // ❗ 只把真正的网络错误当异常
  if (!res.ok) {
    if (res.status === 404 || res.status === 403) {
      return []; // 当作“暂时没有内容”
    }
    throw new Error(`HTTP ${res.status}`);
  }

  const json = await res.json();
  return json.data ?? [];
},

  async getArticleByDocumentId(documentId: string) {
    const res = await fetch(
      `${API_URL}/api/articles?filters[documentId][$eq]=${encodeURIComponent(
        documentId
      )}&populate=*`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.status}`);
    }

    const json: StrapiResponse<any> = await res.json();
    return json.data[0] ?? null;
  },
};
