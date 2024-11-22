import "./BlogBlock.css"

export default function BlogBlock(props) {
  return (
    <div className="blog-block">
      <div>
        <img className="blog-block-img" src={props.img} alt={props.title} />
      </div>

      <div className="blog-block-detail">
        <h2 className="blog-block-title fw-bold">{props.title}</h2>
        <div className="mb-2">
          <div className="blog-block-author">
            <img src="/src/images/avatar.jpg" alt={props.author} /> {props.author} ({props.date})
          </div>
        </div>
        <div className="blog-block-brief mb-2 fst-italic">{props.brief}</div>
        <a href={`/tin-tuc/${props.urlName}`}>
          <button className="at-btn">Xem thêm</button>
        </a>
      </div>
    </div>
  )
}