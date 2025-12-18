
import React, { useEffect, useState } from 'react';
import { strapiService, getMediaURL } from '../services/api';
import { Article } from '../types';

const ArticleDetail: React.FC = () => {
  const hash = window.location.hash;
  const raw = hash.split('/article/')[1] || '';
  const documentId = decodeURIComponent(raw.split('?')[0]).replace(/\/+$/, '');

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div className="py-40 text-center font-mono animate-pulse">DECRYPTING PACKET...</div>;
  if (error || !article) return <div className="py-40 text-center text-red-400">Article not found in current sector.</div>;

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-12">
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
          <span>5 min read</span>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden mb-16 border border-white/5 shadow-2xl">
        <img 
        src={getMediaURL(article.cover?.[0]?.url)} 
        alt={article.title} 
        />
      </div>

      {/* Article Content (Strapi v5 Blocks) */}
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
      <div className="mt-20 pt-12 border-t border-white/5 flex items-center justify-between">
         <div className="flex gap-4">
            <button className="p-3 bg-white/5 rounded-full hover:bg-[#FF791B]/20 transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </button>
            <button className="p-3 bg-white/5 rounded-full hover:bg-[#FF791B]/20 transition-colors">
               <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </button>
         </div>
         <span className="text-xs font-mono text-gray-600">ID: {article.documentId}</span>
      </div>
    </article>
  );
};

export default ArticleDetail;
