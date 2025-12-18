
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderRoute = () => {
    if (route.startsWith('#/article/')) {
      const slug = route.replace('#/article/', '');
      return <ArticleDetail slug={slug} />;
    }
    
    switch (route) {
      case '#/':
      default:
        return <Home />;
    }
  };

  return (
    <Layout>
      {renderRoute()}
    </Layout>
  );
};

export default App;
