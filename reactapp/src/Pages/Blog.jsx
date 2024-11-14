import BlogBlock from "/src/Components/BlogBlock";
import { DisplayDate } from "/src/Components/Utility.js";
import { Component } from "react";

export default class Blog extends Component {
  static DisplayName = Blog.name;

  constructor(props) {
    super(props);
    this.state = { article: [] }
  }

  componentDidMount() {
    this.populateArticleData();
  }
  
  render() {
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">TIN TỨC</h1>
        <hr />
        
        {
          this.state.article.map(a =>
            <BlogBlock img={a.thumbnail} title={a.title} smallDesc={a.brief} author={a.writtenAdmin} date={DisplayDate(a.datePublish)} urlName={a.urlName} />
          )
        }
      </main>
    )
  }

  async populateArticleData() {
    fetch('/blog/get').then(response => response.json()).then(data => this.setState({article: data}))
  }
}