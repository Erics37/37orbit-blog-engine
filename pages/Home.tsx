
import React, { useEffect, useState } from 'react';
import { strapiService } from '../services/api';
import { Article } from '../types';
import ArticleCard from '../components/ArticleCard';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await strapiService.getArticles();
        setArticles(data);
      } catch (err) {
        setError('Connection to deep space lost. Check your Strapi endpoint.');
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <div className="w-12 h-12 border-4 border-[#FF791B]/20 border-t-[#FF791B] rounded-full animate-spin"></div>
        <p className="text-gray-500 animate-pulse font-mono text-sm tracking-widest">ESTABLISHING ORBIT...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl text-center max-w-2xl mx-auto my-20">
        <h2 className="text-red-500 font-bold text-xl mb-2">Signal Blocked</h2>
        <p className="text-gray-400">{error}</p>
        <div className="mt-6 text-xs text-gray-600 font-mono">Ensure Strapi v5 is running at http://localhost:1337 and permissions are Public</div>
      </div>
    );
  }

  return (
    <div>
      <section className="mb-20">
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
          S属性大爆发<br/>
          <span className="text-[#FF791B]">SLEEP.</span><br/>
          
        </h1>
        <p className="max-w-xl text-lg text-gray-400 leading-relaxed border-l-2 border-[#FF791B] pl-8">
          LoveLive | Aqours 🍊🎹🐬♦️⛵️😈💮✨🍭 <br/>
          非专业摄像 | 舞萌·音击·中二 | 乌龟 | 1.5L自吸发动机<br/> 
          回复TD退订 
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-gray-600">No signals detected yet. Deploy content in Strapi to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
