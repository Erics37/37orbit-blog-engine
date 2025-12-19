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

export interface AnnualArticle {
  id: number;
  date: string;      // e.g. '2024-01-12'
  title: string;
  excerpt: string;
  content: string;   // HTML string
}

export interface TimelineNodeProps {
  article: AnnualArticle;
  isActive: boolean;
  isExpanded: boolean;
  onExpand: () => void;
}