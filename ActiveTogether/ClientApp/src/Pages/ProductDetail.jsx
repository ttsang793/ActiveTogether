import "./ProductDetail.css";
import ProductSuggestion from "/src/Components/ProductSuggestion";
import AddToCart from "/src/Components/AddToCart";
import { DisplayPrice } from "/src/Components/Utility.js"

function RenderLuaChon(option, id, title) {
  return (
    <div className="my-2">
      <label htmlFor={id}>{title}:&nbsp;</label>
      <select id={id} defaultValue={option[0]} className="pe-2">
        { option.map((o, i) => <option value={o} key={i}>{o}</option>) }
      </select>
    </div>
  );
}

export default function ProductDetail(props) {
  return (
    <main>
      <div className="d-flex product-detail">
        <div className="d-flex flex-column">
          <img src={props.images[0]} alt={props.title} className="showing" id="showing" />
          <div className="small-images d-flex mt-2">
            { props.images.map((img, i) => <img src={img} alt={props.title + " " + i} key={i} className="small-img" onClick={e => document.getElementById("showing").src = e.target.src } />) }
          </div>
        </div>

        <div className="flex-grow-1">
          <h1>{props.title}</h1>
          <div className="price d-flex align-items-center">
            <div className="current-price">{DisplayPrice(props.currentPrice)}</div>
            <div className="old-price">{DisplayPrice(props.oldPrice)}</div>
          </div>
          <hr />
          { (props.size != null) ? RenderLuaChon(props.size, "kichThuoc", "Kích thước") : "" }
          { (props.color != null) ? RenderLuaChon(props.color, "mauSac", "Màu sắc") : "" }
          <AddToCart type="text" />
        </div>
      </div>

      <div className="product-description" id="product-description">
        <h2>Mô tả sản phẩm</h2>
        <hr />
        <p>
        Lorem ipsum odor amet, consectetuer adipiscing elit. Class natoque pharetra scelerisque potenti hac per. Nunc lacinia fringilla
        hac dictumst magna integer. Porta dictum finibus penatibus fringilla, commodo auctor fusce adipiscing. Euismod gravida erat nisl
        iaculis nullam. Odio purus etiam eleifend quisque duis montes odio consequat. Gravida purus aptent nam nunc sociosqu placerat.
        Neque integer accumsan sed, euismod auctor sollicitudin porta eget ex. Donec elementum rhoncus auctor venenatis eu montes.
        Bibendum aliquet egestas felis tellus posuere vivamus proin. Ultricies posuere donec vitae placerat varius porttitor. Litora
        penatibus tempor ante congue blandit cras tempus lacus. Luctus cubilia libero proin; suspendisse consequat ad. Curabitur pulvinar
        sagittis at facilisi augue? Fringilla iaculis ultricies nisi rhoncus amet arcu diam conubia. Nascetur tempor nostra condimentum
        donec tincidunt, vulputate donec convallis. Montes semper purus a rhoncus nisi consequat. Aenean auctor vitae sapien luctus;
        vestibulum natoque. Dictum magnis at, tellus sapien lectus porta auctor arcu. Risus dui vulputate nibh semper dapibus tincidunt.
        Platea convallis consequat morbi suscipit est facilisi bibendum. Per sit nisi facilisi nibh dolor quis. Tortor himenaeos laoreet
        elit hac commodo ligula porttitor iaculis. Habitant ut commodo pharetra id sed. Per pellentesque vitae pulvinar mus vestibulum
        tortor senectus at dolor. Luctus dignissim pulvinar at aliquam consectetur commodo semper. Euismod ipsum cursus nisi penatibus
        sagittis neque lacus nec. Litora himenaeos sit enim accumsan mattis quisque. Eu inceptos eleifend sodales aliquet leo; mi accumsan
        commodo? Egestas tortor suscipit lacus est feugiat nulla commodo. Velit urna platea blandit orci habitant hendrerit iaculis.
        Bibendum rutrum elit; mi blandit sodales amet. Felis placerat natoque congue potenti lacus torquent massa. Mus non consectetur
        ultricies praesent faucibus per cubilia adipiscing.
        </p>
      </div>

      <div className="otherProducts">
        <ProductSuggestion title="Sản phẩm liên quan" />
      </div>

      <div className="watchedProducts">
        <ProductSuggestion title="Sản phẩm đã xem" />
      </div>
    </main>
  )
}