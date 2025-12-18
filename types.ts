// src/types.ts

export interface Media {
  url: string;
  alternativeText?: string;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  publishedAt: string;
  cover?: Media[];
}
