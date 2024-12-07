import PleaseWait from "/src/Shared/PleaseWait";
import { useState, useEffect, useRef } from 'react';
import { DisplayPrice } from '/src/Scripts/Utility';
import { Pie, PieChart, ResponsiveContainer, Legend, Cell, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts"
import "./Statistic.css"

export default function Statistic() {
  const [loading, setLoading] = useState(true);
  let [dateStart, setDateStart] = useState(new Date(2024,0,1).toLocaleDateString('en-CA'));
  let [dateEnd, setDateEnd] = useState(new Date().toLocaleDateString('en-CA'));
  const handleDateStart = e => setDateStart(dateStart = e.target.value);
  const handleDateEnd = e => setDateEnd(dateEnd = e.target.value);

  const [product, setProduct] = useState([]);
  const [brand, setBrand] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const hasRun = useRef(false);
  const color = ['#4d1e00', '#843400', '#d25900', '#ff9245', '#faae78', '#fff0e5'];

  useEffect(() => {
    if (hasRun.current) return;
    FillStatistic();
    hasRun.current = true;
  }, [])

  function handleProduct(e) {
    const id = e.target.id;
    if (id == "view-all") {
      document.getElementById("top-product").classList.add("disabled");
      document.getElementById("all-product").classList.remove("disabled");
    }
    else {
      document.getElementById("all-product").classList.add("disabled");
      document.getElementById("top-product").classList.remove("disabled");
    }
  }

  return loading ? <PleaseWait /> : (
    <main>
      <h1 className="flex-grow-1 text-center fw-bold">TRANG CHỦ</h1>
      <hr />

      <div className="d-flex c-10 mb-3 align-items-center">
        <label htmlFor="time-filter">Khoảng thời gian:</label>
        <input type="date" className="px-2" value={dateStart} onChange={handleDateStart} /> -
        <input type="date" className="px-2" value={dateEnd} onChange={handleDateEnd} />
        <button className="small-at-btn" onClick={() => FillStatistic(dateStart, dateEnd)}>Thống kê</button>
      </div>

      <div className="row">
        <div className="col-6">
          <div className="statistic-box">
            <h2 className="statistic-detail py-2 px-3 fw-bold text-center">DOANH THU</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenue} margin={{ top: 5, left: 20, right: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line isAnimationActive={false} type="monotone" dataKey="revenue" name="Lợi nhuận" stroke="#008000" />
                <Line isAnimationActive={false} type="monotone" dataKey="importCost" name="Chi phí nhập kho" stroke="#843400" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="statistic-box">
            <h2 className="statistic-detail py-2 px-3 fw-bold text-center">THỊ PHẦN THƯƠNG HIỆU</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={brand} isAnimationActive={false} dataKey="total" nameKey="name" cx="50%" cy="50%" outerRadius="75%" label>
                  { brand.map((b, i) => <Cell key={`cell-${i}`} fill={color[i]} />) }
                  <Tooltip />
                </Pie>
              </PieChart>
              <Legend verticalAlign="bottom" height={36}/>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-6">
          <div id="top-product">
            <div className="statistic-box">
              <h2 className="statistic-detail py-2 px-3 fw-bold text-center">TOP 10 SẢN PHẨM BÁN CHẠY</h2>
              <div className="py-2 text-end">
                <a className="view-all pointer fst-italic" id="view-all" onClick={handleProduct}>Xem tất cả...</a>
              </div>
              <div className="statistic-product-detail">
              {
                product.slice(0,10).map((p, i) => 
                <div className="d-flex align-items-center my-2" key={i+1}>
                  <div className={`me-2 rank ${i == 0 ? "gold" : (i == 1 ? "silver" : (i == 2 ? "bronze" : ""))}`}>{i + 1}</div>
                  <div className={`${i == 0 ? "fw-bold" : (i < 3 ? "fst-italic" : "")}`}>{p.name} - {p.total}</div>
                </div>
              )}
              </div>
            </div>
            
            <div className="statistic-box">
              <h2 className="statistic-detail py-2 px-3 fw-bold text-center">TOP 5 SẢN PHẨM DOANH THU THẤP</h2>
              <div className="statistic-product-detail">
              {
                product.slice(product.length - 5, product.length).reverse().map((p, i) =>       
                <div className="d-flex align-items-center my-2" key={i+1}>
                  <div className="me-2 rank">{i + 1}</div>
                  <div>{p.name} - {p.total}</div>
                </div>
              )}
              </div>
            </div>
          </div>

          <div className="disabled" id="all-product">
            <div className="statistic-box">
              <h2 className="statistic-detail py-2 px-3 fw-bold text-center">DOANH THU CÁC SẢN PHẨM</h2>
              <div className="py-2 text-end">
                <a className="view-all pointer fst-italic" id="view-top-10" onClick={handleProduct}>Xem top 10 sản phẩm bán chạy...</a>
              </div>
              <div className="statistic-product-detail">
              {
                product.map((p, i) => 
                <div className="d-flex align-items-center my-2" key={i+1}>
                  <div className={`me-2 rank ${i == 0 ? "gold" : (i == 1 ? "silver" : (i == 2 ? "bronze" : ""))}`}>{i + 1}</div>
                  <div className={`${i == 0 ? "fw-bold" : (i < 3 ? "fst-italic" : "")}`}>{p.name} - {p.total}</div>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )

  /* 0 la thang, 1 la tuan, 2 la ngay */
  async function FillStatistic(dateStart = "2024-01-01", dateEnd = "") {
    const condition = (dateEnd === "") ? `dateStart=${dateStart}` : `dateStart=${dateStart}&dateEnd=${dateEnd}`

    fetch(`/api/statistic/product?${condition}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ dateStart, dateEnd })
    }).then(response => response.json()).then(data => setProduct(data)).catch(() => {});

    fetch(`/api/statistic/brand?${condition}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ dateStart, dateEnd })
    }).then(response => response.json()).then(data => setBrand(data)).catch(() => {});

    fetch(`/api/statistic/revenue?${condition}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ dateStart, dateEnd })
    }).then(response => response.json()).then(data => { setLoading(false); setRevenue(data) }).catch(() => setLoading(false));
  }
}