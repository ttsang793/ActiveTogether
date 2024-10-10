import "./BackToTop.css"

export default function BackToTop() {
  return (
    <button id="back-to-top" onClick={() => document.documentElement.scrollTop = 0}>
      <i className="bi bi-arrow-up"></i>
    </button>
  )
}
window.onscroll = () => {
  document.getElementById("back-to-top").style.display = (document.documentElement.scrollTop >= 100) ? "initial" : "none";
}