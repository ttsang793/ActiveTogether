import "./FourOThree.css"

export default function FourOThree() {
  return (
    <div className="four-o-three d-flex flex-column align-items-center justify-content-center">
      <img src="/403.png" alt="Stop" className="stop" />
      <div className="detail text-center my-5">KHÔNG PHẬN SỰ MIỄN VÀO</div>
      <button className="btn btn-danger fs-3" onClick={() => history.back()}>
        QUAY VỀ TRANG TRƯỚC
      </button>
    </div>
  )
}