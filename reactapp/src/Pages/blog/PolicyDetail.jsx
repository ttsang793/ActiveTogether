import { Component } from "react";
import "./BlogDetail.css"
import 'react-quill/dist/quill.snow.css';
import PleaseWait from "/src/Shared/PleaseWait";

export default class PolicyDetail extends Component {
  static DisplayName = PolicyDetail.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, article: {} }
  }

  componentDidMount() {
    const url = location.href.substring(location.href.lastIndexOf("/") + 1);
    this.populateArticleData(url);
  }
  
  render() {
    if (!this.state.loading) document.title = this.state.article.title;

    const content = this.state.loading ? <PleaseWait /> : (
      <main className="user-main blog-article">
        <h1 className="flex-grow-1 text-center fw-bold">{this.state.article.title.toUpperCase()}</h1>
        <hr />

        <div className="paragraph">
          {this.renderHTMLContent(this.state.article.content)}
        </div>
      </main>
    )
    return content;
  }

  async populateArticleData(url) {
    try {
      this.setState({ loading: true })
      const response = await fetch(`/policy/get/detail?url=${url}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data, status: ${response.status}`);
      }
      const responseText = await response.json();
      console.log(responseText);
      try {
        this.setState({ article: responseText });
      }
      catch (jsonError) {
        throw new Error("Failed to parse JSON response: " + jsonError.message);
      }

      this.setState({ loading: false })
      document.getElementsByClassName("paragraph")[0].innerHTML = this.state.article.content;
    }
    catch (error) {
      console.error("Error fetching article data:", error);
    }
  }

  renderHTMLContent(htmlString) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: htmlString
        }}
      />
    );
  }
}