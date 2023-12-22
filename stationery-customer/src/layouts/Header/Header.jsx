import { Link, NavLink } from "react-router-dom";
import { routes } from "../../routes/routes";
import Cart from "../Cart";
import Auth from "../Auth/Auth";
import Language from "../Language/Language";
import UserMenu from "./UserMenu/UserMenu";

export default function Header() {
	const handleOpenMenu = () => {
		$(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
		$(".humberger__menu__overlay").addClass("active");
		$("body").addClass("over_hid");
	};
	return (
		<header className="header shadow-sm mb-4">
			<div className="header__top">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="header__top__left">
								<ul>
									<li>
										<i className="fa fa-envelope" /> hello@colorlib.com
									</li>
									<li>Free Shipping for all Order of $99</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="header__top__right">
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
								<Language className="header__top__right__language" />
								<Auth className="header__top__right__auth" />
								<UserMenu />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-lg-3">
						<div className="header__logo">
							<a href="">
								<img src="/img/logo.png" alt="" />
							</a>
						</div>
					</div>
					<div className="col-lg-6">
						<nav className="header__menu">
							<ul>
								<li>
									<NavLink
										to={routes.home}
										className={({ isActive }) => {
											return `${isActive ? "active" : ""}`;
										}}>
										Home
									</NavLink>
								</li>
								<li className="active">
									<NavLink
										to={routes.shop}
										className={({ isActive }) => {
											return `${isActive ? "active" : ""}`;
										}}>
										Shop
									</NavLink>
								</li>
								<li>
									<Link to={routes.contact}>Contact</Link>
								</li>
							</ul>
						</nav>
					</div>
					<div className="col-lg-3">
						<Cart className="header__cart" />
					</div>
				</div>
				<div className="humberger__open" onClick={handleOpenMenu}>
					<i className="fa fa-bars" />
				</div>
			</div>
		</header>
	);
}
