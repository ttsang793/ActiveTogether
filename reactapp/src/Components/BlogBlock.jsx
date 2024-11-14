import "./BlogBlock.css"

export default function BlogBlock(props) {
  return (
    <div className="d-flex blog-block">
      <img className="blog-block-img" src={props.img} alt="" />
      <div>
        <h2 className="blog-block-title fw-bold pb-2">{props.title}</h2>
        <div className="mb-2 pb-2">
          <a className="blog-block-author" href="">
            <img src="/src/img/avatar.jpg" alt={props.author} />&nbsp;<span>{props.author}</span>
          </a>
          &nbsp;({props.date})
        </div>
        <div className="blog-block-small-desc mb-2 pb-2 fst-italic">{props.smallDesc}</div>
        <a href={`/tin-tuc/${props.urlName}`}>
          <button className="at-btn">Xem thêm</button>
        </a>
      </div>
    </div>
  )
}