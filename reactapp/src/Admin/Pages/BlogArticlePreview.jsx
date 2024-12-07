import { useState, useEffect, useRef } from 'react';
import "./BlogArticlePreview.css"
import PleaseWait from '/src/Shared/PleaseWait';

export default function ABlogArticlePreview() {
  let [article, setArticle] = useState({});
  const hasLoad = useRef(false);

  useEffect(() => {
    if (hasLoad.current) return;
  
    setArticle(article = JSON.parse(localStorage.getItem("article-load")));

    setTimeout(() => {
      localStorage.removeItem("article-load");
      document.title = article.title;
    }, 500);
    hasLoad.current = true;
  }, []);  

  return (!hasLoad.current) ? <PleaseWait /> : (
    <main className="admin-main blog-article">
      <h1 className="flex-grow-1 text-center fw-bold">{article.title.toUpperCase()}</h1>
      <hr />

      <p className="brief">{article.brief}</p>
      <div className="paragraph">
        {renderHTMLContent(article.content)}
      </div>
    </main>
  )

  function renderHTMLContent(htmlString) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: htmlString
        }}
      />
    );
  }
}