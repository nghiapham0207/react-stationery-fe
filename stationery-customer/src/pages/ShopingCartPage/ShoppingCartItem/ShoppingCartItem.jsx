import { toVND } from "../../../utils/helpers";
import CartQuantity from "../../ShopDetailPage/CartQuantity/CartQuantity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	selectAccessToken,
	selectRefreshToken,
	selectUser,
} from "../../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { axiosJWT, endpoints } from "../../../utils/httpRequest";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";

export default function ShoppingCartItem({ cart, isEditable = true }) {
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const currentUser = useSelector(selectUser);

	// const [quantityState, setQuantityState] = useState(quantity);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const { product, quantity } = cart;
	const originPrice = product.price;
	const finalPrice =
		originPrice -
		(product.discount > 0
			? Math.floor((originPrice * product.discount) / 100)
			: 0);
	// handlers
	const queryClient = useQueryClient();

	// update one
	const handleUpdate = ({ productId, quantity }) => {
		const jwt = axiosJWT(accessToken, refreshToken, dispatch);
		return jwt.patch(
			endpoints.updateCart,
			{
				productId,
				quantity,
			},
			{
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			},
		);
	};
	const mutation = useMutation({
		mutationFn: handleUpdate,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["carts", currentUser.user_id],
			});
		},
	});
	// delete one
	const handleDelete = ({ productId }) => {
		const jwt = axiosJWT(accessToken, refreshToken, dispatch);
		return jwt.delete(endpoints.deleteCart + productId, {
			headers: {
				Authorization: "Bearer " + accessToken,
			},
		});
	};
	const deleteCartMutation = useMutation({
		mutationFn: handleDelete,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["carts", currentUser.user_id],
			});
		},
	});

	const handleChangeQuantity = (value) => {
		const val = parseInt(value);
		// setQuantityState(val);
		if (!isNaN(val)) {
			mutation.mutate({ productId: product.product_id, quantity: val });
		}
	};
	const handleClickProductName = () => {
		navigate(routes.shop + "/" + product.product_id);
	};
	return (
		<tr>
			<td className="shoping__cart__item">
				<img src={product.image} alt="" />
				<h5 title={product.name} onClick={handleClickProductName}>
					{product.name}
				</h5>
			</td>
			<td className="shoping__cart__price">
				{product.discount > 0 ? <span>{toVND(originPrice)}</span> : null}
				<div>{toVND(product.discount > 0 ? finalPrice : originPrice)}</div>
			</td>
			<td className="shoping__cart__quantity">
				{isEditable ? (
					<CartQuantity
						defaultValue={quantity}
						onChange={handleChangeQuantity}
					/>
				) : (
					quantity
				)}
			</td>
			<td className="shoping__cart__total">{toVND(finalPrice * quantity)}</td>
			<td className="shoping__cart__item__close">
				{isEditable && (
					<span
						className="icon_close"
						onClick={() => {
							deleteCartMutation.mutate({ productId: product.product_id });
						}}
					/>
				)}
			</td>
		</tr>
	);
}
