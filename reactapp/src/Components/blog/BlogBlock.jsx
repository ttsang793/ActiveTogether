import "./BlogBlock.css"
import emptyThumbnail from '/src/images/blog/default.jpg';
import defaultAvatar from '/src/images/avatar/default.jpg';

export default function BlogBlock(props) {
  return (
    <div className="blog-block">
      <div>
        <img className="blog-block-img" src={props.img} onError={e => e.target.src = emptyThumbnail} alt={props.title} />
      </div>

      <div className="blog-block-detail">
        <h2 className="blog-block-title fw-bold">{props.title}</h2>
        <div className="mb-2">
          <div className="blog-block-author">
            <img src={props.avatar} onError={e => e.target.src = defaultAvatar} alt={props.author} /> {props.author} ({props.date})
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