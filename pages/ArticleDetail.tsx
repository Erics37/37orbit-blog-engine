
import React, { useEffect, useState } from 'react';
import { strapiService, getMediaURL } from '../services/api';
import { Article } from '../types';

const estimateReadTime = (blocks: any[]) => {
  if (!Array.isArray(blocks)) return 1;

  const text = blocks
    .filter(b => b.type === 'paragraph')
    .map(b => b.children?.map((c: any) => c.text).join('') ?? '')
    .join('');

  const charCount = text.length;

  // 粗略估算：400 字 / 分钟
  const minutes = Math.max(1, Math.round(charCount / 400));

  return minutes;
};

const ArticleDetail: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const hash = window.location.hash;
  const raw = hash.split('/article/')[1] || '';
  const documentId = decodeURIComponent(raw.split('?')[0]).replace(/\/+$/, '');

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);


  useEffect(() => {
    if (!documentId) {
    setError('Invalid article id.');
    setLoading(false);
    return;
    }
    const loadArticle = async () => {
      try {
        const data = await strapiService.getArticleByDocumentId(documentId);
        if (!data) {
          throw new Error('Article not found');
        }
        setArticle(data);
        console.log('ARTICLE FULL DATA', data);
      } catch (err) {
        setError('Transmission failed.');
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [documentId]);

  useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) {
      setProgress(0);
      return;
    }

    const scrolled = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化

    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  if (loading) return <div className="py-40 text-center font-mono animate-pulse">DECRYPTING PACKET...</div>;
  if (error || !article) return <div className="py-40 text-center text-red-400">Article not found in current sector.</div>;
  const readMinutes = estimateReadTime(article.context);
  return (
    <>
    {/* Reading Progress Bar */}
    <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-transparent">
      <div
        className="h-full bg-[#FF791B] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
    <article className="max-w-4xl mx-auto">
      <div className="mb-8 md:mb-10">
        <div className="flex items-center gap-4 mb-6">
          <a href="#/" className="text-xs font-bold text-[#FF791B] hover:underline">← RETURN TO ORBIT</a>
          <div className="h-px bg-white/10 flex-grow"></div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-[#FF791B] rounded-full"></div>
            <span>Published {new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
          <span>•</span>
          <span>{readMinutes} min read</span>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden mb-10 md:mb-12 border border-white/5 shadow-2xl">
        <img 
          src={getMediaURL(article.cover?.[0]?.url)} 
          alt={article.title}
          className="cursor-zoom-in"
          onClick={() => {
            const url = getMediaURL(article.cover?.[0]?.url);
            if (url) setPreviewImage(url);
          }}
        />
      </div>

      {/* Article Content (Strapi v5 Blocks) */}
      <div className="h-px bg-white/5 mb-8"></div>
      <div className="prose prose-invert max-w-none text-gray-300">
        {Array.isArray(article.context) &&
        article.context.map((block: any, i: number) => {
          if (block.type === 'paragraph') {
            return (
              <p key={i}>
                {block.children?.map((c: any) => c.text).join('')}
              </p>
            );
          }
          return null;
        })}
      </div>
    </article>
    {previewImage && (
  <div
    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
    onClick={() => setPreviewImage(null)}
  >
    {/* 以图片为参照的容器 */}
    <div
      className="relative"
      onClick={(e) => e.stopPropagation()} // 防止点到容器就关掉
    >
      {/* 关闭按钮：贴在图片左上角 */}
      <button
        aria-label="Close image preview"
        className="
          absolute
          -top-3
          -left-3
          z-[110]
          w-10
          h-10
          rounded-full
          bg-black/60
          backdrop-blur-sm
          flex
          items-center
          justify-center
          text-2xl
          leading-none
          transition
          hover:bg-black/80
        "
        style={{ color: '#FF791B' }}
        onClick={() => setPreviewImage(null)}
      >
        ×
      </button>

      {/* 放大图片 */}
      <img
        src={previewImage}
        alt="Preview"
        className="max-w-[90vw] max-h-[90vh] object-contain cursor-zoom-out"
      />
    </div>
  </div>
)}

    </>
  );
};

export default ArticleDetail;
