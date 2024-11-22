import BlogBlock from "/src/Components/blog/BlogBlock";
import SimplePage from "/src/Components/shared/SimplePage";
import PleaseWait from "/src/Shared/PleaseWait";
import { DisplayDate } from "/src/Scripts/Utility.js";
import { Component } from "react";

export default class Blog extends Component {
  static DisplayName = Blog.name;

  constructor(props) {
    super(props);

    const params = new URLSearchParams(location.search);
    const page = params.get("page") === null ? 1 : Number(params.get("page"));
    this.state = { page, total: 0, loading: true, article: [] }
  }

  reload(page) {
    location.href = location.origin + location.pathname + (page > 1 ? "?page=" + page : "");
  }

  componentDidMount() {
    this.populateArticleData();
  }
  
  render() {    
    return this.state.loading ? <PleaseWait /> :(
      <main className="user-main">
        <h1 className="flex-grow-1 text-center fw-bold">TIN TỨC</h1>
        <hr />
        
        {
          this.state.article.map((a, i) =>
            <BlogBlock key={i} img={a.thumbnail} title={a.title} brief={a.brief} author={a.writtenAdmin} date={DisplayDate(a.datePublish)} urlName={a.urlName} />
          )
        }
        <SimplePage page={this.state.page} total={this.state.total} numPerPage={10} handlePageChange={this.reload} />
      </main>
    )
  }

  async populateArticleData() {
    fetch('/blog/get').then(response => response.json()).then(data => this.setState({
      loading: false, total: data.length * 10,
      article: [...data,...data,...data,...data,...data,...data,...data,...data,...data,...data].splice(10 * (this.state.page - 1), 10 * this.state.page)
    }))
  }
}