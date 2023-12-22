import { NavLink } from "react-router-dom";
//
import Cart from "../Cart/Cart";
import Auth from "../Auth/Auth";
import Language from "../Language/Language";
import { routes } from "../../routes/routes";

export default function HumbergerMenu() {
	return (
		<div className="humberger__menu__wrapper">
			<div className="humberger__menu__logo">
				<a href="#">
					<img src="/img/logo.png" alt="" />
				</a>
			</div>
			<Cart className="humberger__menu__cart" />
			<div className="humberger__menu__widget">
				<Language className="header__top__right__language" />
				<Auth className="header__top__right__auth" />
			</div>
			<div id="mobile-menu-wrap">
				<div className="slicknav_menu">
					<a
						href="#"
						aria-haspopup="true"
						role="button"
						tabIndex={0}
						className="slicknav_btn slicknav_collapsed"
						style={{ outline: "none" }}>
						<span className="slicknav_menutxt">MENU</span>
						<span className="slicknav_icon">
							<span className="slicknav_icon-bar" />
							<span className="slicknav_icon-bar" />
							<span className="slicknav_icon-bar" />
						</span>
					</a>
					<nav
						className="slicknav_nav slicknav_hidden"
						style={{ display: "none" }}
						aria-hidden="true"
						role="menu">
						<ul>
							<li className="active">
								<NavLink
									to={routes.home}
									className={({ isActive }) => {
										return `${isActive ? "active" : ""}`;
									}}>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to={routes.shop}
									className={({ isActive }) => {
										return `${isActive ? "active" : ""}`;
									}}>
									Shop
								</NavLink>
							</li>
							<li className="slicknav_collapsed slicknav_parent">
								<a
									href="#"
									role="menuitem"
									aria-haspopup="true"
									tabIndex={-1}
									className="slicknav_item slicknav_row"
									style={{ outline: "none" }}>
									<span>Pages</span>
									<span className="slicknav_arrow">►</span>
								</a>
								<ul
									className="header__menu__dropdown slicknav_hidden"
									role="menu"
									style={{ display: "none" }}
									aria-hidden="true">
									<li>
										<a href="./shop-details.html" role="menuitem" tabIndex={-1}>
											Shop Details
										</a>
									</li>
									<li>
										<a href="./shoping-cart.html" role="menuitem" tabIndex={-1}>
											Shoping Cart
										</a>
									</li>
									<li>
										<a href="./checkout.html" role="menuitem" tabIndex={-1}>
											Check Out
										</a>
									</li>
									<li>
										<a href="./blog-details.html" role="menuitem" tabIndex={-1}>
											Blog Details
										</a>
									</li>
								</ul>
							</li>
							<li>
								<a href="./blog.html" role="menuitem">
									Blog
								</a>
							</li>
							<li>
								<a href="./contact.html" role="menuitem">
									Contact
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="header__top__right__social">
				<a href="#">
					<i className="fa fa-facebook" />
				</a>
				<a href="#">
					<i className="fa fa-twitter" />
				</a>
				<a href="#">
					<i className="fa fa-linkedin" />
				</a>
				<a href="#">
					<i className="fa fa-pinterest-p" />
				</a>
			</div>
			<div className="humberger__menu__contact">
				<ul>
					<li>
						<i className="fa fa-envelope" /> hello@colorlib.com
					</li>
					<li>Free Shipping for all Order of $99</li>
				</ul>
			</div>
		</div>
	);
}
