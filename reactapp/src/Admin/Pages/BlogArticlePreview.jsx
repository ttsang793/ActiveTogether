import { useEffect } from 'react';
import "./BlogArticlePreview.css"

export default function ABlogArticlePreview() {
  const article = JSON.parse(localStorage.getItem("article-load"));

  useEffect(() => {
    localStorage.removeItem("article-load");
  }, [article]);

  document.title = article.title;

  return (
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