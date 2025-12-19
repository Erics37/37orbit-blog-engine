import type { Article } from '../types';

export type AnnualArticle = {
  id: number;
  date: string;     // 年度总结专用
  title: string;
  excerpt: string;
  content: string;  // HTML 字符串
};

export const annual2025: AnnualArticle[] = [
  {
    id: 1,
    date: '2025-01-12',
    title: 'The Beginning',
    excerpt: 'Everything still felt undefined.',
    content: `
      <p>那段时间并没有明确的目标。</p>

      <img 
        src="/annual/2025/01-beginning.jpg"
        alt="January beginning"
      />

      <p>
        回头看才发现，
        这是整条时间轴真正的起点。
      </p>
    `,
  },

  {
    id: 2,
    date: '2025-03-18',
    title: 'Momentum Appears',
    excerpt: 'Things began to move without being pushed.',
    content: `
      <p>
        某些事情开始自行对齐。
      </p>

      <p>
        我没有刻意推动，
        只是减少了不必要的干预。
      </p>
    `,
  },
];
