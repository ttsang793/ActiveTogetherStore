import "./ProductGrid.css"
import AddToCart from "/src/Components/product/AddToCart"
import { DisplayPrice } from "/src/Scripts/Utility.js"

export default function ProductGrid(props) {
  return (
    <div className="product-grid">
      <a href={`/san-pham/${props.urlName}`} className="w-100 text-center">
        <img src={props.image} alt={props.name} className="product-thumbnail w-100" />
      </a>
      
      <a href={`/san-pham/${props.urlName}`} className="product-name">
        <p>{props.name}</p>
      </a>
      
      {
        (props.oldPrice !== null ? <p className="product-old-price">{DisplayPrice(props.oldPrice)}</p> : <></>)
      }
      <p className="product-price">{DisplayPrice(props.price)}</p>
    </div>
  )
}