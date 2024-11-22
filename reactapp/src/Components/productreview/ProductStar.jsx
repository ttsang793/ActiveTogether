import "./ProductStar.css"

export default function ProductStar({ star }) {
  function renderStar(star) {
    let result = [];

    for (let i=1; i<=5; i++) {
      if (star > 1) result.push(<i className="bi bi-star-fill star-one"></i>);
      else if (star > 0) {
        const style = {
          background: `linear-gradient(to right, var(--mid-light) ${star * 100}%, black ${100 - star * 100}%)`,
          backgroundClip: `text`,
          color: `transparent`
        }
        result.push(<i className="bi bi-star-fill" style={style}></i>);
      }
      else result.push(<i className="bi bi-star-fill"></i>);
      star--;
    }
    
    return result;
  }

  return (
    <div>
      { renderStar(star).map((r, i) =>
        <React.Fragment key={i}>{r}</React.Fragment>
      ) }
    </div>
  )
}