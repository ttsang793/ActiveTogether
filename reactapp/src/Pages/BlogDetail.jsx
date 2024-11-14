import { Component } from "react";
import "./BlogDetail.css"

export default class BlogDetail extends Component {
  static DisplayName = BlogDetail.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, article: {} }
  }

  componentDidMount() {
    const url = location.href.substring(location.href.lastIndexOf("/") + 1);
    this.populateArticleData(url);
  }
  
  render() {
    const content = this.state.loading ? <p>Please wait...</p> : (
      <main className="blog-article">
        <h1 className="flex-grow-1 text-center fw-bold">{this.state.article.title.toUpperCase()}</h1>
        <hr />

        <p><i>{this.state.article.brief}</i></p>
        <div className="paragraph"></div>
      </main>
    )
    return content;
  }

  async populateArticleData(url) {
    try {
      this.setState({ loading: true })
      const response = await fetch(`/blog/get/detail?urlName=${url}`);

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`Failed to fetch data, status: ${response.status}`);
      }

      // Log the response body as text to see what is returned
      const responseText = await response.json(); // Get response as text first

      // Check if the response is JSON, and parse it if valid
      try {
        // Update state with article data once fetched
        this.setState({ article: responseText });
      }
      catch (jsonError) {
        throw new Error("Failed to parse JSON response: " + jsonError.message);
      }

      this.setState({ loading: false })
      // Log updated state after setState
      document.getElementsByClassName("paragraph")[0].innerHTML = this.state.article.content;
    }
    catch (error) {
      // Handle errors (network or other)
      console.error("Error fetching article data:", error);
    }
  }
}