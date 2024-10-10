import "./ItemRow.css"
import { DisplayPrice } from "./Utility.js"

export default function ItemRow(props) {
  return (
    <tr>
      <td><input type="checkbox" name="" id="" /></td>
      <td><img src={props.image} alt={props.title} width="80%" /></td>
      <td>{props.title}</td>
      <td><input type="text" value={props.quantity} className="item-quantity" /></td>
      <td>{DisplayPrice(props.currentPrice)}</td>
      <td>
        <button className="btn btn-danger">Xóa</button>
      </td>
    </tr>
  )
}