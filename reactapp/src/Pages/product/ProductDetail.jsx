import "./ProductDetail.css";
import PleaseWait from "/src/Shared/PleaseWait"
import ProductSuggestion from "/src/Components/product/ProductSuggestion";
import ProductReview from "/src/Components/product/ProductReview";
import AddToCart from "/src/Components/product/AddToCart";
import { DisplayPrice } from "/src/Scripts/Utility.js"
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react'

export default function ProductDetail(props) {
  let { urlName, colorId } = useParams();
  colorId = colorId === undefined ? 0 : colorId;
  let [ product, setProduct ] = useState([]);
  let [ image, setImage ] = useState([]);
  let [ review, setReview ] = useState([]);
  let [ index, setIndex ] = useState(0);
  let [ sku, setSku ] = useState("");
  let [ loading, setLoading ] = useState(true);
  const hasRead = useRef(false);

  useEffect(() => {
    if (hasRead.current) return;

    if (props.username === null) {
      let recentArray = []
      try {
        recentArray = JSON.parse(localStorage.getItem("recent")).urlName
        if (recentArray.length === 5) recentArray = recentArray.slice(0, 4);
      }
      catch {}
      localStorage.setItem("recent", JSON.stringify({ urlName: [urlName, ...recentArray] }));
    }
    populateProductDetail(urlName);

    hasRead.current = true;
  }, []);

  function handleIndexChange(newIndex, total) {
    setIndex(index = newIndex < 0 ? total - 1 : newIndex % total);
    if (total < 3) {
      document.getElementsByClassName("main-small-img")[0].classList.remove("main-small-img");
      document.getElementsByClassName("small-img")[index].classList.add("main-small-img");
    }
  }
  
  function handleOptionChange(e, i = 0, idList = []) {
    if (e.target.classList.contains("color")) {
      handleIndexChange(e.target.id, image.length)
      const newSku = idList[i].sku + sku.substring(5);
      setSku(sku = newSku);
    }
    else {
      const newSku = sku.substring(0,5) + e.target.innerHTML;
      setSku(sku = newSku);
    }
  }

  function renderSize(sizeList) {
    return (
      <div className="my-2">
        Kích thước:&nbsp;
        <div className="select-list">
          {sizeList.map((s, i) =>
            <button className={`select-option size ${(sku.substring(5)) === s ? "selected" : ""}`} key={i} onClick={handleOptionChange}>{s}</button>
          )}
        </div>
      </div>
    );
  }

  function uniqueSku(idList) {
    let tempList = idList;
    idList = [];
    while (true) {
      idList.push(tempList[0]);
      const sku = tempList[0].sku;
      tempList = tempList.filter(t => t.sku !== sku);

      if (tempList.length === 0) return idList;
    }
  }

  function renderColor(colorList, idList) {
    idList = uniqueSku(idList);

    return (
      <div className="my-2">
        Màu sắc:&nbsp;
        <div className="select-list">
          {colorList.map((c, i) =>
            <button className={`select-option color ${sku.substring(0,5) === idList[i].sku ? "selected" : ""}`} id={idList[i].id} key={i}
            onClick={e => handleOptionChange(e, i, idList)}>{c}</button>
          )}
        </div>
      </div>
    );
  }

  function renderProductDetail() {
    document.title = product[0].name;

    let colorList = []
    product.forEach(p => {
      if (!colorList.includes(p.color)) colorList.push(p.color);
    });

    let sizeList = []
    product.forEach(p => {
      if (!sizeList.includes(p.size)) sizeList.push(p.size);
    });

    let idList = []
    product.forEach(p => {
      const index = Number(p.image) - 1;
      if (idList.length === 0 || idList.findIndex(p => p.id === index) === -1) idList.push({id: index, sku: p.sku.substring(0,5)});
    })

    return (
      <main className="user-main">
        <div className="d-flex product-detail c-10">          
          <div className="d-flex product-detail-image me-2">
            <div className="position-relative"> 
              {
                (image.length > 1) ?
                <button onClick={() => handleIndexChange(index - 1, image.length)} className="carousel-prev">&lt;</button> :
                <></>
              }
              <img src={`${image[index].image}`} className="showing" id="showing" />
              {
                (image.length > 1) ?
                <button onClick={() => handleIndexChange(index + 1, image.length)} className="carousel-next">&gt;</button> :
                <></>
              }
            </div>

            
            <div className="d-flex align-item-center mt-2" style={{columnGap: "9px"}}> 
            {
              (image.length >= 3) ? (
                <>
                  <img src={`${image[index % image.length].image}`} className="small-img main-small-img" />

                  <img src={`${image[(index + 1) % image.length].image }`}
                    className="small-img" onClick={() => handleIndexChange(index + 1, image.length)} />
                    
                  <img src={`${image[(index + 2) % image.length].image}`}
                    className="small-img" onClick={() => handleIndexChange(index + 2, image.length)} />
                </>
              )
              : (
                <>
                  <img src={`${image[0].image}`} className="small-img main-small-img" onClick={() => handleIndexChange(0, image.length)} />
                  {image.length === 2 ? <img src={`${image[1].image}`} className="small-img" onClick={() => handleIndexChange(1, 2)} /> : ""}
                </>
              )
            }              
            </div>
          </div>
          
          <div className="product-detail-buying">
            <h1>{product[0].name}</h1>
            <div className="price d-flex align-items-center">
              <div className="current-price">{DisplayPrice(product[0].price)}</div>
              {
                product[0].oldPrice > 0 ? <div className="old-price">{DisplayPrice(product[0].oldPrice)}</div> : <></>
              }
            </div>
            <hr />

            {(sizeList.length > 1) && renderSize(sizeList)}
            {(colorList.length > 1) && renderColor(colorList, idList)}

            {<AddToCart type="text" product={product.find(p => p.sku === sku)} username={props.username} image={image[index].image} />}
          </div>
        </div>

        <div className="product-description" id="product-description">
          <h2>Mô tả sản phẩm</h2>
          <hr />
          <p>{product[0].description}</p>
        </div>

        <ProductReview review={review} sizeList={sizeList} colorList={colorList} idList={idList} sku={product[0].sku} />

        <div className="otherProducts main-margin py-5">
          <ProductSuggestion title="Sản phẩm bán chạy" filter="top" />
        </div>

        <div className="watchedProducts main-margin py-5">
          <ProductSuggestion title="Sản phẩm đã xem" filter="recent" username={props.username} />
        </div>
      </main>
    )
  }

  return loading ? <PleaseWait /> : renderProductDetail(product, image, review);

  async function populateProductDetail(url) {
    const response = await fetch(`/product?urlName=${url}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const productData = await response.json();

    const imageResponse = await fetch(`/product/img?urlName=${url}`);
    if (!imageResponse.ok) throw new Error('Network response was not ok');
    const imageData = await imageResponse.json();

    const reviewResponse = await fetch(`/product/review/get?urlName=${url}`);
    if (!reviewResponse.ok) throw new Error('Network response was not ok');
    const reviewData = await reviewResponse.json();
    
    const skuData = []
    productData.forEach(p => {
      if (skuData.findIndex(s => s.sku.includes(p.sku.substring(0,5))) === -1) skuData.push(p);
    })

    //Set Item
    setProduct(product = productData);
    setSku(sku = skuData[colorId].sku);
    setIndex(index = Number(skuData[colorId].image) - 1);
    setImage(image = imageData);
    setReview(review = reviewData);
    setLoading(loading = false);
  }
}