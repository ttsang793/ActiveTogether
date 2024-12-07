import "./Footer.css"
import {useState, useEffect, useRef} from 'react';

export default function Footer() {
  let [policies, setPolicies] = useState([]);
  const hasLoad = useRef(false);

  useEffect(() => {
    if (hasLoad.current) return;

    fetch('/policy/get/').then(response => response.json()).then(data => setPolicies(policies = data));

    hasLoad.current = true;
  }, [])

  return (
    <footer>
      <div className="row detail-address">
        <div className="col px-1 left">
          <h1>HỖ TRỢ</h1>
          <ul>
            {
              policies.map(p => <li key={p.urlName}><a href={`/ho-tro/${p.urlName}`}>{p.title}</a></li>)
            }
            <li><a href="">Báo cáo</a></li>
          </ul>
        </div>
        <div className="col px-1">
          <h1>LIÊN HỆ</h1>
          <ul list-style-type="none">
            <li><i className="bi bi-telephone-fill"></i> : 0903 327 327</li>
            <li><i className="bi bi-envelope-fill"></i> : contact@atsport.com</li>
            <li><i className="bi bi-house-door-fill"></i> : 23 Âu Dương Lân, phường Rạch Ông, quận 8, TP. Hồ Chí Minh</li>
            <li>Theo dõi Active Together:&nbsp;
              <i className="bi bi-facebook"></i> &nbsp;
              <i className="bi bi-instagram"></i> &nbsp;
              <i className="bi bi-tiktok"></i>
            </li>
          </ul>
        </div>
      </div>

      <hr className="mt-0 mb-2" />
      <div className="text-center fst-italic">
        &copy; {new Date().getFullYear()} by Active Together
      </div>
    </footer>
  );
}