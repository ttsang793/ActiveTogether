import { Component } from "react"

export default class ABlogArticlePreview extends Component {
  static displayName = ABlogArticlePreview.name;

  constructor(props) {
    super(props)
    this.state = { article: "" }
  }

  componentDidMount() {
    const id = new URLSearchParams(location.search).get("id");
    this.populateArticleData(id);
  }

  render() {
    return (
      <main>
        <h1>{this.state.article.title}</h1>
        <p>{this.state.article.brief}</p>
        <div className="content text-justify"></div>
      </main>
    )
  }

  async populateArticleData(id) {
    try {
      const response = await fetch(`/api/blog/get/content?id=${id}`);

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

      // Log updated state after setState
      document.getElementsByClassName("content")[0].innerHTML = this.state.article.content;
    }
    catch (error) {
      // Handle errors (network or other)
      console.error("Error fetching article data:", error);
    }
  }
}