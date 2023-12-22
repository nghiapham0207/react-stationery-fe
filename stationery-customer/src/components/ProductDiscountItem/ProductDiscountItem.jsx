import { useNavigate } from "react-router-dom";
//
// import viteLogo from "/vite.svg";
import { toVND } from "../../utils/helpers";
import BgImageProduct from "../BgImageProduct/BgImageProduct";
import LinkToProduct from "../LinkToProduct/LinkToProduct";
import { routes } from "../../routes";
import { axiosJWT, endpoints } from "../../utils/httpRequest";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selectors";
import { addToCart } from "../../services/cartServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductDiscountItem({ product }) {
	const { product_id, name, discount, image, price, category } = product;

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
		<div className="product__discount__item" onClick={handleClick}>
			<BgImageProduct className="product__discount__item__pic set-bg" img={image}>
				<div className="product__discount__percent">{"-" + discount + "%"}</div>
				<ul className="product__item__pic__hover">
					<li>
						<a href="#" onClick={handleAddToCart}>
							<i className="fa fa-shopping-cart" />
						</a>
					</li>
				</ul>
			</BgImageProduct>
			<div className="product__discount__item__text">
				<span>{category.name}</span>
				<h5>
					<LinkToProduct product_id={product_id} title={name}>
						{name}
					</LinkToProduct>
				</h5>
				<div className="product__item__price">
					{toVND(price)} <span>{toVND(Math.floor(price - (price * discount) / 100))}</span>
				</div>
			</div>
		</div>
	);
}
