import { toVND } from "../../utils/helpers";
import LinkToProduct from "../LinkToProduct/LinkToProduct";

export default function TopProductItem({ product }) {
	const { product_id, name, price, image } = product;
	return (
		<LinkToProduct product_id={product_id} className="latest-product__item">
			<div className="latest-product__item__pic">
				<img src={image} alt="" />
			</div>
			<div className="latest-product__item__text">
				<h6>{name}</h6>
				<span>{toVND(price)}</span>
			</div>
		</LinkToProduct>
	);
}
