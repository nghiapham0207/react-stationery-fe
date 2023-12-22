import HeroSection from "../../components/HeroSection";
import SectionContainer from "../../components/SectionContainer";
import Breadcrumb from "../../components/Breadcrumb";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosGet, axiosJWT, endpoints } from "../../utils/httpRequest";
import { useEffect, useRef } from "react";
import { toVND } from "../../utils/helpers";
import CartQuantity from "./CartQuantity";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken, selectRefreshToken, selectUser } from "../../redux/selectors";
import { toast } from "react-toastify";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import { initiallizeSlider, productDetailsPicSlider } from "../../owl/slider";

const imgStyle = {
	width: 555,
	height: 575,
};

export default function ShopDetailPage() {
	const { productId } = useParams();
	const quantityRef = useRef();
	const currentUser = useSelector(selectUser);
	const accessToken = useSelector(selectAccessToken);
	const refreshToken = useSelector(selectRefreshToken);
	const dispatch = useDispatch();
	const productState = useQuery({
		queryKey: ["product", productId],
		queryFn: async () => {
			try {
				const res = await axiosGet(endpoints.product + productId);
				return res;
			} catch (error) {
				return Promise.reject(error);
			}
		},
		staleTime: 3 * 60 * 1000,
	});
	let product = null;
	const breadcrumb = [
		{ label: "Home", url: "/" },
		{ label: "Shop", url: "/shop" },
	];
	if (productState.isSuccess && productState.data.success) {
		product = productState.data.data;
		breadcrumb.push({ label: product.name });
	}
	const handleAddToCart = async (e) => {
		e.preventDefault();
		const quantity = parseInt(quantityRef.current.value);
		const jwt = axiosJWT(accessToken, refreshToken, dispatch);
		try {
			const res = await jwt.post(
				endpoints.addToCart,
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
			if (res.data.success) {
				toast.success(res.data.message, {
					autoClose: 1200,
				});
			}
		} catch (error) {
			console.log(error);
			toast.error("can not add to cart!");
			return Promise.reject(error);
		}
	};
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: handleAddToCart,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["carts", currentUser.user_id],
			});
		},
	});
	useEffect(() => {
		initiallizeSlider(productDetailsPicSlider);
	});
	return (
		<>
			<HeroSection className="hero hero-normal" />
			{product !== null ? <Breadcrumb items={breadcrumb} /> : null}
			<SectionContainer className="product-details spad">
				<div className="container">
					{product !== null ? (
						<div className="row">
							<div className="col-lg-6 col-md-6">
								<div className="product__details__pic">
									<div className="product__details__pic__item">
										<img
											style={imgStyle}
											className="product__details__pic__item--large"
											src={product.image}
											alt=""
										/>
									</div>
									<div className="product__details__pic__slider owl-carousel owl-loaded owl-drag">
										<div className="owl-stage-outer">
											<div
												className="owl-stage"
												style={{
													transform: "translate3d(-862px, 0px, 0px)",
													transition: "all 1.2s ease 0s",
													width: 1725,
												}}>
												{product.images.map((image, index) => (
													<div
														key={index}
														className="owl-item"
														style={{ width: "123.75px", marginRight: 20 }}>
														<img
															style={{
																width: "100%",
																height: "105px",
																objectFit: "contain",
																overflow: "hidden",
																borderRadius: 10,
																boxShadow: "0 0 4px 0 var(--primary-color)",
															}}
															onError={(e) => {
																e.target.src = "https://placehold.co/400";
															}}
															data-imgbigurl={image.image}
															src={image.image}
															alt=""
														/>
													</div>
												))}
											</div>
										</div>
										<div className="owl-nav disabled">
											<button type="button" role="presentation" className="owl-prev">
												<span aria-label="Previous">‹</span>
											</button>
											<button type="button" role="presentation" className="owl-next">
												<span aria-label="Next">›</span>
											</button>
										</div>
										<div className="owl-dots disabled">
											<button role="button" className="owl-dot active">
												<span />
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-md-6">
								<div className="product__details__text">
									<h3>{product.name}</h3>
									<div className="product__details__rating">
										<i className="fa fa-star" />
										<i className="fa fa-star" />
										<i className="fa fa-star" />
										<i className="fa fa-star" />
										<i className="fa fa-star-half-o" />
										<span>(18 reviews)</span>
									</div>
									<div className="product__details__price d-flex align-items-center">
										{product.discount > 0 ? (
											<>
												<span>{toVND(product.price)}</span>
												{toVND(
													Math.floor(product.price - (product.price * product.discount) / 100),
												)}
												<div
													className="d-inline-flex rounded-circle bg-danger text-white ml-3 justify-content-center align-items-center"
													style={{ width: 38, height: 38, fontSize: 14 }}>
													{"-" + product.discount + "%"}
												</div>
											</>
										) : (
											<>{toVND(product.price)}</>
										)}
									</div>
									<p>{product.description}</p>
									<div className="product__details__quantity">
										<CartQuantity ref={quantityRef} />
									</div>
									<a
										href="#"
										onClick={(e) => {
											mutation.mutate(e);
										}}
										className="primary-btn">
										ADD TO CARD
									</a>
									<a href="#" className="heart-icon">
										<span className="icon_heart_alt" />
									</a>
									<ul>
										<li>
											<b>Availability</b>{" "}
											<span>{product.quantity - product.sold_quantity + " available"}</span>
										</li>
										<li>
											<b>Shipping</b>{" "}
											<span>
												01 day shipping. <samp>Free pickup today</samp>
											</span>
										</li>
										<li>
											<b>Weight</b> <span>0.5 kg</span>
										</li>
										<li>
											<b>Share on</b>
											<div className="share">
												<a href="#">
													<i className="fa fa-facebook" />
												</a>
												<a href="#">
													<i className="fa fa-twitter" />
												</a>
												<a href="#">
													<i className="fa fa-instagram" />
												</a>
												<a href="#">
													<i className="fa fa-pinterest" />
												</a>
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div className="col-lg-12">
								<div className="product__details__tab">
									<ul className="nav nav-tabs" role="tablist">
										<li className="nav-item">
											<a
												className="nav-link active"
												data-toggle="tab"
												href="#tabs-1"
												role="tab"
												aria-selected="true">
												Description
											</a>
										</li>
										<li className="nav-item">
											<a
												className="nav-link"
												data-toggle="tab"
												href="#tabs-3"
												role="tab"
												aria-selected="false">
												Reviews <span>(1)</span>
											</a>
										</li>
									</ul>
									<div className="tab-content">
										<div className="tab-pane active" id="tabs-1" role="tabpanel">
											<div className="product__details__tab__desc">
												<h6>Products Infomation</h6>
												<p>{product.description}</p>
											</div>
										</div>
										<div className="tab-pane" id="tabs-3" role="tabpanel">
											<div className="product__details__tab__desc">
												<h6>Products Infomation</h6>
												<p>
													Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
													Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.
													Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam
													sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo
													eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat.
													Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent
													sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum
													ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante
													ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
													Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet
													ligula. Proin eget tortor risus.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<p className="text-center">Nothing found!</p>
					)}
				</div>
			</SectionContainer>
			<SectionContainer className="related-product">
				{product !== null ? (
					<RelatedProducts productId={product.product_id} categoryId={product.category_id} />
				) : null}
			</SectionContainer>
		</>
	);
}
