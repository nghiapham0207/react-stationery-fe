import { useNavigate } from "react-router-dom";
import { toVND } from "../../utils/helpers";
import BgImageProduct from "../BgImageProduct";
import LinkToProduct from "../LinkToProduct/LinkToProduct";
import { routes } from "../../routes";
import { addToCart } from "../../services/cartServices";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selectors";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductItem({ product }) {
	const { product_id, name, image, price } = product;

	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const currentUser = useSelector(selectUser);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: addToCart,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["carts", currentUser.user_id],
			});
		},
	});

	const handleClick = () => {
		navigate(routes.shop + "/" + product_id);
	};

	const handleAddToCart = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		mutation.mutate({ product_id, accessToken, refreshToken, dispatch });
	};

	return (
		<div className="product__item" onClick={handleClick}>
			<BgImageProduct className="product__item__pic set-bg" img={image}>
				<ul className="product__item__pic__hover">
					<li>
						<a href="#" onClick={handleAddToCart}>
							<i className="fa fa-shopping-cart" />
						</a>
					</li>
				</ul>
			</BgImageProduct>
			<div className="product__item__text">
				<h6>
					<LinkToProduct product_id={product_id} title={name}>
						{name}
					</LinkToProduct>
				</h6>
				<h5>{toVND(price)}</h5>
			</div>
		</div>
	);
}
